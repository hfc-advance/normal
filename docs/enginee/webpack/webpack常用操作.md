---
id: webpackOftenFunctional
title: webpack 常用操作
hide_title: true
sidebar_label: webpack 常用操作
---

### 1. 生成一个新的静态资源

:::success 收获

- 从编译器(`compiler`)中访问 `webpack`，而不是通过安装导入的方式，可以确保使用相同版本的 `webpack`

  ```javascript
  const webpack = compiler.webpack
  ```

:::

### 2. 判断是否使用了某个插件

```javascript {3}
function hasExtractTextPlugin(compiler) {
  const plugins = compiler.options.plugins;
  return plugins.find(plugin=>plugin.__proto__.constructor === ExtractTextPlugin) != null;
}
```
