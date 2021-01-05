---
id: nodeES6
title: node如何处理ES6
hide_title: true
sidebar_label: node如何处理ES6
---

## 文件区分

Node.js 要求 ES6 模块采用.mjs后缀文件名。也就是说，只要脚本文件里面使用import或者export命令，那么就必须采用.mjs后缀名。Node.js 遇到.mjs文件，就认为它是 ES6 模块，默认启用严格模式，不必在每个模块文件顶部指定"use strict"。

如果不希望将后缀名改成.mjs，可以在项目的package.json文件中，指定type字段为module。

```json
{
  "type": "module"
}
```

一旦设置了以后，该目录里面的 JS 脚本，就被解释用 ES6 模块。

```shell
node index.js
```

如果这时还要使用 CommonJS 模块，那么需要将 CommonJS 脚本的后缀名都改成.cjs。如果没有type字段，或者type字段为commonjs，则.js脚本会被解释成 CommonJS 模块。

:::success 总结
.mjs文件总是以 ES6 模块加载，.cjs文件总是以 CommonJS 模块加载，.js文件的加载取决于package.json里面type字段的设置。
:::

## CommonJS 模块加载 ES6 模块

CommonJS 的require()命令不能加载 ES6 模块，会报错，只能使用import()这个方法加载。

```javascript
(async () => {
  await import('./my-app.mjs');
})();
```

require()不支持 ES6 模块的一个原因是，它是同步加载，而 ES6 模块内部可以使用顶层await命令，导致无法被同步加载。

## ES6 模块加载 CommonJS 模块

ES6 模块的import命令可以加载 CommonJS 模块，但是只能整体加载，不能只加载单一的输出项。

```javascript
// 正确
import packageMain from 'commonjs-package';

// 报错
import { method } from 'commonjs-package';
```
