---
id: nodeMultipleProgressUse
title: 使用：多进程/线程
hide_title: true
sidebar_label: 使用：多进程/线程
---

import Fork from './multiple-progress/\_partial-fork.md'

## 开启多进程的方式

> `Node.js` 内部通过两个库创建子进程：`child_process` 和 `cluster`

## child_process

`child_process` 模块提供了四个创建子进程的函数：`spawn` 、`execFile` 、`exec` 、`fork`

### fork

<Fork />

## 进程之间通信方式

> 试想有以下两个独立的进程，它们通过执行两个 `js` 文件创建，那么如何在它们之间传递信息呢？

### 信号

> 信号是一种通信机制，程序运行时会接受并处理一系列信号，并且可以发送信号。

#### 发送信号

可以通过 `kill` 指令向指定进程发送信号，如下例子表示向 `pid` 为 `3000` 的进程发送 `USR2` 信号（用户自定义信号）

```shell
// shell指令，可以直接在命令行中输入
$ kill -USR2 3000
```

#### 接收信号

定义 `process` 在指定信号事件时，执行处理函数即可接收并处理信号。

```javascript
process.on('SIGUSR2', () => {
  console.log("接收到了信号USR2");
}
```

:::danger
在收到未定义处理函数的信号时进程会直接退出
:::

完整列子：

```javascript title="接收信号"
console.log('PID', process.pid) // 58666

setInterval(() => {
  console.log('PROCESS 1 is alive')
}, 5000)

process.on('SIGUSR2', () => {
  console.log('收到了USR2信号')
})
```

```javascript title="发送信号"
const ChildProcess = require('child_process')

console.log('PID', process.pid)

setInterval(() => {
  console.log('PROCESS 2 is alive')
}, 5000)

ChildProcess.exec('kill -USR2 58666')
```

### 套接字(socket)

> 通过在接受方和发送方之间建立 socket 连接实现全双工通信，例如在两者间建立 TCP 连接：

```javascript
// Server
const net = require('net')

let server = net.createServer(client => {
  client.on('data', msg => {
    console.log('ONCE', String(msg))
    client.write('server send message')
  })
})
server.listen(8087)

// Client
const net = require('net')
const client = new net.Socket()
client.connect('8087', '127.0.0.1')
client.on('data', data => console.log(String(data)))
client.write('client send message')
```

### 命名管道

> 命名管道可以在不相关的进程之间和不同的计算机之间使用，建立命名管道时给他指定一个名字，任何进程都可以使用名字将其打开，根据给定权限进行通信。

```shell title="第一步：创建命名管道/tmp/nfifo"
mkfifo /tmp/nfifo
```

```javascript title="读写文件"
// Server
const fs = require('fs')
fs.writeFile('/tmp/tmpipe', 'info to send', (data, err) => console.log(data, err))

// Client
const fs = require('fs')
fs.readFile('/tmp/tmpipe', (err, data) => {
  console.log(err, String(data))
})
```

:::danger
与读取一般的文件不同，读取一般的文件会直接返回结果，而读取 fifo 则会等待，在 fifo 有数据写入时返回结果，然后开启 server，server 向 fifo 中写入信息，client 将收到信息
:::

### 原生通信方式：父子进程之间

> `Node.js` 创建进程时便实现了其进程间通信，但这种方式只能够用于父子进程之间的通信

原生的 `Node.js` 在 `windows` 中使用命名管道实现，在 `* nix` 系统采用 `unix domain socket（套接字）`实现，它们都可以实现全双工通信，`Node.js` 对这些底层实现进行了封装，表现在应用层上的进程间通信，只有简单的 `message` 事件和 `send ()` 方法，例如父子进程发送消息：

```javascript
// 主进程 process.js
const fork = require('child_process').fork
const worker = fork('./child_process.js')
worker.send('start')
worker.on('message', msg => {
  console.log(`SERVER RECEIVED: ${msg}`)
})

// 子进程 child_process.js
process.on('message', msg => {
  console.log('CLIENT RECEIVED', msg)
  process.send('done')
})
```

### 通信方式：兄弟进程之间

Node.js 创建进程时便实现了其进程间通信，但这种方式只能够用于父子进程之间的通信，而不能在兄弟进程之间通信，若要利用原生的方式实现兄弟进程之间的通信，则需要借助它们公共的父进程，发送消息的子进程将消息发送给父进程，然后父进程收到消息时将消息转发给接收消息的进程。但是使用这种方式进行进程间的通信经过父进程的转发效率低下，所以我们可以根据 Node.js 原生的进程间通信方式实现兄弟进程的通信：在 windows 上使用命名管道，在 \* nix 上使用 unix 域套接字，该方法与上文套接字通信类似，只是这里不是监听一个端口，而是使用一个文件。

```javascript
// Server
const net = require('net')
let server = net.createServer(() => {
  console.log('Server start')
})
server.on('connection', client => {
  client.on('data', msg => {
    console.log(String(msg))
    client.write('server send message')
  })
})
server.listen('/tmp/unix.sock')

// Client
const net = require('net')
const client = new net.Socket()
client.connect('/tmp/unix.sock')
client.on('data', data => console.log(String(data)))
client.write('client send message')
```

启动 server 后会在指定路径创建文件，用于 ipc 通信。

## 开启多线程

> 而线程则是 CPU 调度的最小单位，使用多线程能够充分利用 CPU 的多核特性，在每一个核心中执行一个线程，多线程并行执行，提高 CPU 的利用率，适合用于计算密集型任务。

在 `Node.js` 中，内置了用于实现多线程的模块 `worker_threads` ，该模块提供了如下方法 / 变量：

- `isMainThread`：当线程不运行在 Worker 线程中时，为 true。

- `Worker 类`：代表独立的 javascript 执行线程：

- `parentPort`：用于父子线程之间的信息传输：

![thread-api-useful](../../../static/img/thread_api_useful.png)

```javascript
// 子线程 -> 父线程
// 子线程中
const { parentPort } = require('worker_threads');
parentPort.postMessage(`msg`);
// 父线程中
const { Worker } = require('worker_threads');
const worker = new Worker('filepath');
worker.on('message', (msg) => { console.log(msg) });

// 父线程 -> 子线程
// 父线程中
const { Worker } = require('worker_threads');
const worker = new Worker('filepath');
worker.postMessage(`msg`);
// 子线程中
const { parentPort } = require('worker_threads');
parentPort.on('message', (msg) =>console.log(msg));
```

## 参考

- [Node.js 多进程/线程 —— 日志系统架构优化实践](https://mp.weixin.qq.com/s/s3DeAxrEbVmqtCHGP9lstg)
- [线程和进程的区别是什么？](https://www.zhihu.com/question/25532384)
