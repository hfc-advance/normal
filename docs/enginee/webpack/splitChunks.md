---
id: webpackOftenPkg
title: splitChunks
hide_title: true
sidebar_label: splitChunks
---

### chunks

- `async`: 默认值
- `initial`
- `all`
- `function (chunk)`

![webpack_load](/img/webpack_load.001.jpeg)

:::important

- `initial`表示`”直接引入的模块“`。
  - 首先模块自己是被`静态语法导入`
  - 而且模块的父级，以及父级的父级也是被`静态语法导入`。
  - 上图中：`initial`模式包含了：`main.js，demo1.js`，虽然`demo2_3.js`是被`demo2.js`静态语法导入的，但是父级`demo2.js`是异步的，所以后面所有的自己都是异步的。

- `async`标识`”异步加载的模块“`。
  - 模块自己是被`异步加载的方式导入的`
  - 或者父级，或者父级的父级存在`异步加载的方式导入的`。

- `all`包含了`async`和`initial`。表示所有类型的问题。

- `function (chunk)`返回`true`值的模块会被包含进去
:::
