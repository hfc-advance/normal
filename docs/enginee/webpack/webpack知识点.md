---
id: webpackFood
title: webpack知识点
hide_title: true
sidebar_label: 知识点
---

## 多模块编译

`MultiCompiler`模块允许 `webpack` 在单个 `compiler` 中运行多个配置。 如果 `webpack` 的 `NodeJS` `API` 中的 `options` 参数，是一个由 `options` 构成的数组，则 `webpack` 会对其应用单个 `compiler`，并在所有 `compiler` 执行结束时，调用 `callback` 方法

```javascript {12}
var webpack = require('webpack');

var config1 = {
  entry: './index1.js',
  output: {filename: 'bundle1.js'}
}
var config2 = {
  entry: './index2.js',
  output: {filename:'bundle2.js'}
}

webpack([config1, config2], (err, stats) => {
  process.stdout.write(stats.toString() + "\n");
})
```

## Compiler

通过`node api`来编译

```javascript
const webpack = require("webpack");

webpack(webpackConfig, (err, stats) => {
  if (err || stats.hasErrors()) {
    // 在这里处理错误
  }
  // 处理完成
})
```

### 拿到compiler

如果你不向 `webpack` 执行函数传入回调函数，就会得到一个 `webpack` `Compiler` 实例。你可以通过它手动触发 `webpack` 执行器，或者是让它执行构建并监听变更。和 [CLI API](https://webpack.docschina.org/api/cli/)  很类似。`Compiler` 实例提供了以下方法：

- `run(callback)`
- `watch(watchOptions, handler)`

```javascript
const webpack = require("webpack");

const compiler = webpack({
  // 配置对象
});

compiler.run((err, stats) => {
  // ...
});
```

### [hooks](https://webpack.js.org/api/compiler-hooks/#hooks)

生命周期钩子函数，是由 compiler 暴露，可以通过如下方式访问:

```javascript
compiler.hooks.someHook.tap(/* ... */)
```

例如`afterPlugins`(**设置完初始插件之后**)

```javascript
compiler.hooks.afterPlugins.tap(() => {
  ...
})
```

## 热更新问题

### 1. 代理或者替换 host 情况下解决热更新问题

需要配置[sockHost](https://webpack.js.org/configuration/dev-server/#devserversockhost)来解决

```json {5,14}
{
  "devServer": {
    "host": "0.0.0.0",
    "port": 8080,
    "disableHostCheck": true,
    "hot": true,
    "overlay": {
      "warnings": true,
      "errors": true
    },
    "contentBase": "dist",
    "quiet": true,
    "hotOnly": true,
    "sockHost": "v2.zhaogang.com"
  }
}
```

:::tip
`disableHostCheck`是为了解决配置`host`情况下校验问题
:::

## 高级配置项

### 1. performance 控制 webpack 如何通知资源(asset)和入口起点超过指定文件限制

当文件大小超出设置的资源包大小的时候，给出警告，或者编译错误，[webpack performance](https://webpack.docschina.org/configuration/performance/)

```javascript
module.exports = {
  peformance: {
    hints: 'error',
    maxAssetSize: 300 * 1026,
    maxEntrypointSize: 300 * 1026
  }
}
```
