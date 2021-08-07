---
id: jsExportReference
title: export导出引用问题
hide_title: true
sidebar_label: export引用问题
---

## 说明

- 不同形式的导入，决定了导入的是 `引用` 还是 `值`。
- 当导入的是 `引用` 的时候，在模块内的值发生变化，导入进来的值也会发生变化。

## 命名导出

```javascript
// module.js
export let thing = 'initial'

setTimeout(() => {
  thing = 'changed'
}, 500)
```

- 1. `import { thing } from './module.js'`

```javascript
import { thing } from './module.js'

console.log(thing) // initial
setTimeout(() => {
  console.log(thing) // changed
}, 1000)
```
