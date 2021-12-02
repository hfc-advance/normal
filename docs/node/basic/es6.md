---
id: nodeESM
title: node-esm 规范
hide_title: true
sidebar_label: 使用esm规范
---

## 确定模块系统

1. 在任何情况下以`.mjs`结尾的文件，一定是`ES Module`规范
2. 在任何情况下以`.cjs`结尾的文件，一定是`CommmonJS`规范
3. 最靠近的`package.json`文件的`type`字段为`module`的时候是`ES Module`规范，别的情况下默认都是`CommonJS`规范

  ```json
  {
    "name": "@anijs/prettier",
    "type": "module",
    "exports": "./index.js"
  }
  ```

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

## 注意事项

> 了解了[require原理](/docs/node/basic/nodeRequireSourceCode)，知道加载的过程中包裹一层函数，注入了一些变量，因为`ES Module`加载机制和`CommonJS`加载机制不一样，所以这些变量在非`CommonJS`场景下就不能使用：

```javascript
(function (exports, require, module, __filename, __dirname) {
  // 模块源码
})
```

### 没有 require、exports 或 module.exports

在大多数情况下，可以使用 `ES` 模块 `import` 加载 `CommonJS` 模块，也可以通过`createRequire`去构造`require`和`require.resolve`：

```javascript
import { createRequire } from 'module'

const require = createRequire(import.meta.url)
```

### 没有 __filename 和 __dirname

可以通过[import.meta.url](http://nodejs.cn/api/esm.html#importmetaurl)来构造一个：

```javascript
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const _dirname = typeof __dirname !== 'undefined'
  ? __dirname
  : dirname(fileURLToPath(import.meta.url))
```

### 不能 import json 文件

- 通过读写文件模拟实现：

```javascript
import { readFile } from 'fs/promises';
const json = JSON.parse(await readFile(new URL('./dat.json', import.meta.url)));
```

- 通过构造的`require`来加载

```javascript
import { createRequire } from 'module'

const require = createRequire(import.meta.url)

require('../package.json')
```
