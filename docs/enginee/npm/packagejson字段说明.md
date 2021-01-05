---
id: packagejsonKeys
title: package.json详解
hide_title: true
sidebar_label: package.json详解
---

## 1. dependencies

项目运行所依赖的模块

```json
{
  "dependencies": {
    "vue": "2.6.10",
  }
}
```

:::important
作为`npm`包中如果存在`dependencies`，那么引入该`package`的项目同时将导入`package`里面的项目运行依赖。

举例来说：如果`vue`中包含了项目依赖，那么使用`vue`的项目也将导入这些**依赖**
:::

## 1. config

`config`可以用来添加命令行的环境变量

下面是一个`package.json`文件。

```json
{
  "name" : "foo",
  "config" : { "port" : "8080" },
  "scripts" : { "start" : "node server.js" }
}
```

可以通过`npm_package_config`拿到环境变量。

```javascript
process.env.npm_package_config_port //8080
```

## 3. engines

`engines`字段说明了该模块运行的平台，比如`Node`的某个版本或者浏览器。

```json
{
  "engines": {
    "node" : ">=0.10.3 <0.12",
    "npm" : "~1.0.20"
  }
}
```
