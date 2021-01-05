---
id: nodeDebug
title: node调试技巧
hide_title: true
sidebar_label: 调试
---

### chrome调试

- 运行`node --inspect-brk index.js`

- 打开`chrome`浏览`chrome://inspect`

![chrome:inspect](/img/chrome_inspect.png)

- 打开`Target`下面的`inspect`链接开启调试模式
- 如需调试具体位置，需要设置代码指定位置为`debugger`
