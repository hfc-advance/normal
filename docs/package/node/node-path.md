---
id: nodeModulePath
title: node:path
hide_title: true
sidebar_label: node:path
---

## API

### path.join()

> 会正确使用系统路径分隔符来`连接路径`，Unix 系统是`”/“`，Windows 系统是`”\“`

```javascript
path.join('src', 'lib', 'index.ts')

// src/lib/index.ts
```

:::info
除了连接路径，也会格式化路径，如果当前路径包含不正常路径分隔符会被格式化成当前系统的路径分隔符：

```javascript
path.join('src', 'lib', '\\index.ts')
// src/lib/index.ts
```

:::

### path.resolve()

> 将相对路径转换成`绝对路径`，如果根据参数无法得到绝对路径，那就是以当前文件为基准，获得绝对路径

```javascript
path.resolve('src', 'lib', 'index.ts')
// 等同于：
path.resolve(__dirname, 'src', 'lib', 'index.ts')
```

### path.relative()

> 一个文件相对于另外一个文件的相对路径

```javascript
// 第二个路径相对于第一个路径的相对位置
path.relative('/data/orandea/test/aaa', '/data/orandea/impl/bbb')
```

:::info
两个路径都应该是绝对路径，如果传入的不是绝对路径，会以当前文件为基准格式化成绝对路径，再进行路径判断：

```javascript
path.relative('src', 'lib')
// 相当于
path.relative(path.resolve(__dirname, 'src'), path.resolve(__dirname, 'lib'))
// 结果：../lib
```

:::

### path.parse()

> 获取路径的各部分信息：

```javascript
path.parse(path.resolve('src/index.ts'))
/* {
  root: '/',
  dir: '/Users/cuihaifeng/Documents/个人/github/load-config/src',
  base: 'index.ts',
  ext: '.ts',
  name: 'index'
} */
```

## 全局变量

### \_\_dirname

> 当前文件所在的目录

```javascript
console.log(__dirname)
// /Users/cuihaifeng/Documents/个人/github/load-config
```

### \_\_filename

> 当前文件的完整路径

```javascript
console.log(__filename)
// /Users/cuihaifeng/Documents/个人/github/load-config/index.js
```
