---
id: babelMacros
title: babel macros
hide_title: true
sidebar_label: macros 宏
---

## 宏的释义

> 宏(Macro), 是一种批处理的称谓，它根据一系列的预定义规则转换一定的文本模式。解释器或编译器在遇到宏时会自动进行这一模式转换，这个转换过程被称为“宏展开(Macro Expansion)”。对于编译语言，宏展开在编译时发生，进行宏展开的工具常被称为宏展开器。

简单释义：

> 宏是用来生成代码的代码，他有能力进行一些句法解析和代码转换。

## 优点

- `Macro` 不需要配置 `.babelrc`。(比如`create-react-app`脚手架不推荐自己配置构建脚本的工具就只能使用 `macros`)
- 由隐式转换为了显式。

  ```js title="plugin的形式"
  // .babelrc
  {
    "plugins": ["preval"]
  }

  // 隐式调用
  const greeting = preval`
    const fs = require('fs')
    module.exports = fs.readFileSync(require.resolve('./greeting.txt'), 'utf8')
  `
  ```

  ```js title="macros的形式
  // 首先你要显式导入
  import preval from 'preval.macro'

  // 显示调用
  const greeting = preval`
    const fs = require('fs')
    module.exports = fs.readFileSync(require.resolve('./greeting.txt'), 'utf8')
  `
  ```

## 常用插件

- [files.macro 生成指定目录的文件名数组](https://github.com/ridermansb/files.macro)

  ```js
  import files from "files.macro";

  const allImages = files("./assets/images");
  const allImages = [ 'avatar.png', 'catalog.png' ]
  ```

- [codegen.macro 生成运行时代码](https://github.com/kentcdodds/codegen.macro)

  ```js
  import codegen from 'codegen.macro'

  codegen`module.exports = ['a', 'b', 'c'].map(l => 'export const ' + l + ' = ' + JSON.stringify(l)).join(';')`

        ↓ ↓ ↓ ↓ ↓ ↓

  export const a = "a";
  export const b = "b";
  export const c = "c";
  ```

比如，有些 `js` 代码在多个项目中公用：直接生成 `模板内容`

  ```js
  import codegen from 'codegen.macro'

  codegen`module.exports = require('@kentcdodds/react-workshop-app/codegen')({
    options: {concurrentMode: true}
  })`
  ```

## 推荐

### [1. awesome-babel-macros](https://github.com/jgierer12/awesome-babel-macros)
