---
id: nodeEntryPoint
title: entry-point
hide_title: true
sidebar_label: entry-point
---

import PackageJSONImports from './entry-points/\_partial-imports.md'

## package.json 包入口字段定义

> 在`node`环境中，只能够通过`main`和`exports`这两个字段来设置包的入口文件。

### exports support Node.js v12.22

> `package.json exports`在`Node.js v12.22`版本中稳定

```json
{
  "name": "@anijs/prettier",
  "main": "./index.js",
  "exports": {
    ".": "./dist/index.js"
  }
}
```

### exports > main

> `exports`的优先级大于`main`的优先级。

```json
{
  "name": "@anijs/prettier",
  "main": "./index.js",
  "exports": {
    ".": "./dist/index.js"
  }
}
```

上面的代码，在支持`exports`的`Node.js 版本`环境，任意情况都是采用`exports`，不区分当前是采用`ESM`还是`CommonJS`

### 条件导出

> [条件导出](http://nodejs.cn/api/packages.html#conditional-exports)：不同规范`ESM,CommonJS`不同导出，首先`main`字段是无法实现的也就是任意规范下都只会加载`main`定义的入口，`exports`可以通过关键字来配置导出：

- `import` - 当包通过 `import` 或 `import()`，或者通过 `ECMAScript` 模块加载器的任何顶层导入或解析操作加载时匹配
- `require` - 当包通过 `require()` 加载时匹配

```json
{
  "main": "./main-require.cjs",
  "exports": {
    "import": "./main-module.js",
    "require": "./main-require.cjs"
  },
  "type": "module"
}
```

定义包子路径的条件导出：

```json
{
  "main": "./main.js",
  "exports": {
    ".": "./main.js",
    "./feature": {
      "import": "./feature-node.js",
      "require": "./feature.js"
    }
  }
}
```

## exports

> `exports` 字段提供了 `main` 的替代方案，支持包导出和条件导出。 当存在时，限制可以从包中加载哪些子模块，达到封装的目的，可防止包的消费者使用任何未定义的入口点。

### 路径定义规范

- `exports` 中定义的所有路径必须是以 `./` 开头的相对文件 `URL`。
- `.`定义包的入口文件：

  ```json
  {
    "name": "@anijs/prettier",
    "exports": {
      ".": "./index.js"
    }
  }
  ```

- `*`导出一整个文件夹：

  ```json
  {
    "name": "@anijs/prettier",
    "exports": {
      "./lib": "./lib/index.js",
      "./lib/*": "./lib/*.js"
    }
  }
  ```

### 自引用

> `自引用` - 通过包的名称来引用模块

```json
{
  "name": "@anijs/prettier",
  "exports": {
    ".": "./main.mjs"
  }
}
```

然后该包中的任何模块都可以引用包本身中的导出：

```javascript
import { dothing } from '@anijs/prettier'
```

:::danger
自引用功能只有在支持`exports`而且配置了`exports`的情况才能使用
:::

## imports

<PackageJSONImports />

## 参考

- [Node.js:packages](http://nodejs.cn/api/packages.html#modules-packages)
