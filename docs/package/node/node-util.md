---
id: nodeModuleUtil
title: node:util
hide_title: true
sidebar_label: node:util
---

## 常用工具 API

### 类型判断

> 在 Node.js 中，内部其实是有一组用来判断变量类型的 api 的。而且功能异常丰富，除了基础类型的判断，还支持判断 Promise 对象、Date 对象、各种 ArrayBuffer

```javascript
const types = require('util/types')

import types from 'util/types'
```

```javascript
const types = require('util/types')

types.isDate(new Date()) // true
types.isPromise(new Promise(() => {})) // true
types.isArrayBuffer(new ArrayBuffer(16)) // true
```

### 判断数据是否相等

> `===` 通常只会判断这两个变量是否指向同一内存地址。如果想判断对象的键对应的所有值是否相等，可以通过`util.isDeepStrictEqual()`来判断。

```javascript
const util = require('util')

const val1 = { name: 'shenfq' }
const val2 = { name: 'shenfq' }
console.log('val1 === val2', val1 === val2) // false
console.log('isDeepStrictEqual', util.isDeepStrictEqual(val1, val2)) // true

const arr1 = [1, 3, 5]
const arr2 = [1, 3, 5]
console.log('arr1 === arr2', arr1 === arr2) // false
console.log('isDeepStrictEqual', util.isDeepStrictEqual(arr1, arr2)) // true
```

### 异步函数改造 primise

>  Node 10 发布的时候，原生模块都新增了一个 .promises 属性，该属性下的所有 API 都 Promise 风格的

```javascript
const fs = require('fs').promises
fs.readFile('./2021-11-11.log', { encoding: 'utf-8' })
  .then(text => console.log(text)) 
 .catch(error => console.error(error))
```
