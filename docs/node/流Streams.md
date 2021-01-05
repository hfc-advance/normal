---
id: nodeStreams
title: Streams(流)
hide_title: true
sidebar_label: Streams(流)
---

## 1. 数据消耗模式

可以在两种模式下消耗可读流中的数据：`暂停模式（paused mode）`和流动模式`（flowing mode）`

:::info 判断流的状态
- 可读流对象`readable`中有一个维护状态的对象，`readable._readableState`, 这里简称为`state`。 其中有一个标记，`state.flowing`, 可用来判断流的模式。
- 一共有三种模式：
  - `true`: 流动模式
  - `false`: 暂停模式
  - `null`: 初始状态

```javascript
const rs = fs.createReadStream('package.json')
rs._readableState.flowing // null => 初始状态
```

:::

### 1.1 初始模式

从初始模式中读取数据，是为其附加一个`可读事件监听器(readable)`，然后，在一个循环中，我们读取所有的数据，直到内部`buffer`被清空。

```javascript
process.stdin
  .on('readable', () => {
    let chunk;
    while ((chunk = process.stdin.read()) !== null) {
      console.log(
        `Chunk read: (${chunk.length}) "${chunk.toString()}"`
      );
    }
  })
  .on('end', () => process.stdout.write('End of stream'));
```

:::tip 👆 释义

- 数据是从可读的侦听器中读取的，只要有新的数据，就会调用这个侦听器。当内部缓冲区中没有更多数据可用时，`read()`方法返回`null`；在这种情况下，我们不得不等待另一个可读的事件被触发，告诉我们可以再次读取或者等待表示`Streams`读取过程结束的`end`事件触发。

- 控制台中键入一些字符，然后按`Enter`键查看回显到标准输出中的数据。

- `readable`是一个可读事件监听器

```javascript
const rs = fs.createReadStream('package-lock.json')

rs.on('readable', () => {
  console.log(rs.read().toString())
})
```

:::

:::important 干货

- `read()`方法是一个同步操作，它从可读`Streams`的内部`Buffers`区中提取数据块。使用这种方法，数据随时可以直接从`Streams`中按需提取。

- 在以二进制模式工作的可读的`Stream`中，我们可以通过在`Stream`上调用`setEncoding(encoding)`来读取字符串而不是`Buffer`对象，并提供有效的编码格式（例如`utf8`）。

  ```javascript
  const rs = fs.createReadStream('package-lock.json')
  rs.setEncoding('utf8')
  ```

- 使用`Buffer.toString()`也可以转换成字符串

  ```javascript
  const rs = fs.createReadStream('package-lock.json')
  rs.setEncoding('utf8')
  rs.on('readable', () => {
    console.log(rs.read().toString())
  })
  ```

- 在`shell`中使用管道运算符`|`，它将程序的标准输出重定向到另一个程序的标准输入。用来连接多个程序。

  ```shell
  cat package-lock.json | node readStdin
  ```

:::

### 1.2 流动模式

:::info 如何进入流动模式
一般创建流后，有两种方式可以使流进入`流动模式`：

- 监听`data`事件
- 通过`pipe`方法将数据导向另一个可写流
:::

- `data`事件

  先看一下`Readable`是如何处理`data`事件的监听的：

  ```javascript
  Readable.prototype.on = function (ev, fn) {
    var res = Stream.prototype.on.call(this, ev, fn)
    if (ev === 'data' && false !== this._readableState.flowing) {
      this.resume()
    }
  }
  ```

  :::tip 👆 释义

  - 在将`fn`加入事件队列后，如果是`data`事件而且流处于非暂停模式，则会调用`this.resume()`，开始流动模式。
  - `resume()`方法先将`state.flowing`设为true， 然后会在下一个`tick`中执行`flow`，试图将缓存读空：

    ```javascript
    if (state.flowing) do {
      var chunk = stream.read()
    } while (null !== chunk && state.flowing)
    ```

  :::

  例如，我们之前创建的`readStdin`应用程序将使用流动模式：

  ```javascript
  process.stdin
    .on('data', chunk => {
      console.log('New data available');
      console.log(
        `Chunk read: (${chunk.length}) "${chunk.toString()}"`
      );
    })
    .on('end', () => process.stdout.write('End of stream'));
  ```

## 参考

### [1. Node.js Stream - 进阶篇](https://tech.meituan.com/2016/07/15/stream-internals.html)

### [2. 《Node.js设计模式》使用流进行编码](https://zhuanlan.zhihu.com/p/32532984?utm_source=wechat_session&utm_medium=social&utm_oi=692679874405502976&utm_content=sec)

### [3. 你不知道的Node.js性能优化，读了之后水平直线上升](https://zhuanlan.zhihu.com/p/51847546?utm_source=wechat_session&utm_medium=social&utm_oi=692679874405502976&utm_content=sec)
