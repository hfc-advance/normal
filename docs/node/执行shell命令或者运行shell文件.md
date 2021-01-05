---
id: nodeRunShell
title: node运行shell
hide_title: true
sidebar_label: 运行shell
---

### 非数据流的形式输出

```javascript
const {exec} = require（'child_process'）
exec（'ls | grep js'，（err，stdout，stderr）=> {
  if（err）{
    //发生某些错误
    console.error（err）
  } else {
   // *整个* stdout和stderr（缓冲）
   console.log（`stdout：$ {stdout}`
   console.log（`stderr：$ {stderr}`
  }
}
```

### 以数据流的形式输出

```javascript
const { spawn } = require('child_process');
const child = spawn('ls', );
child.stdout.on('data', (chunk) => {
  // data from the standard output is here as buffers
});
child.stderr.pipe(dest);
child.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});
```

### 运行`shell`或者`bash`文件

```javascript
const exec = require('child_process').exec, child;
const myShellScript = exec('sh doSomething.sh /myDir');

myShellScript.stdout.on('data', (data)=>{
    console.log(data)
});
myShellScript.stderr.on('data', (data)=>{
    console.error(data);
});
```

<div class="success">

运行`shell`的原理是执行命令，那么可以推理`node`也是可以运行`python`文件以及`python`命令。

</div>

### 运行`py`文件

```javascript
const spawn = require("child_process").spawn
const process = spawn('python',["./hello.py",
                            req.query.firstname,
                            req.query.lastname])
process.stdout.on('data', function(data) {
    console.log(data.toString())
})
```

## 参考

- [How to run shell script file or command using Nodejs?](https://medium.com/stackfame/how-to-run-shell-script-file-or-command-using-nodejs-b9f2455cb6b7)
