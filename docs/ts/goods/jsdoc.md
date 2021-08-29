---
id: tsJsDoc
title: jsDoc 类型提示
hide_title: true
sidebar_label: jsDoc 类型提示
---


## 简介

虽然现在大多数项目都直接是使用 `ts` 来写的，但是大多数的 `cli` 以及 `node` 程序是用 `js` 编写，这个时候 `jsdoc` 就起到了大作用。
可以参考 [webpack 源码](https://github.com/webpack/webpack/blob/main/lib/Compiler.js) 里面就用到了大量的 `jsdoc`。

## 常用语法

### 1、自定义类型 @typedef

- 基础使用

  ```javascript
  /** @typedef { Array<string> } MenuList */

  /**
   * @param { MenuList } list
   */
  function everyItem(list) {}
  ```

- 使用 `npm包` 类型

  ```javascript
  /** @typedef {import('webpack/lib/Compiler')} Compiler */

  class AssetsPlugin {
    /**
     * @param { Compiler } compiler
     */
    apply(compiler) {
    }
  }
  ```

- 使用 `本地文件` 类型

  ```javascript
  /** @typedef {import("./Module")} Module */
  ```

### 2、申明类型 @type

- 变量使用

  ```javascript
  /** @type { Array<{ name: string; age: number }> } */
  var list = [{ name: 'xiaocui', age: 28 }]
  ```

- 内联变量使用

  ```javascript
  compiler.hooks.normalModuleFactory.tap(pluginName, (/** @type {NormalModuleFactory} */ factofy) => {
    factofy.hooks.beforeResolve.tap(pluginName, (resolveData) => {
      if (resolveData.request === './a') return false
    })
  })
  ```

### 3、声明回调函数 @callback

```javascript
/**
 * @param {int} x - An integer.
 * @param {int} y - An integer.
 * @param {function} callback - A callback to run whose signature is (sum), where
 */
function addStuff(x, y, callback) {
  callback(x+y);
}
```

如上面所示，`callback` 没有办法申明具体的类型，这个时候就需要通过 `@callback` 来解决：

```javascript {11}
/**
 * @callback Callback
 * @param {number} num options object
 * @returns {number}
 */


/**
 * @param {int} x - An integer.
 * @param {int} y - An integer.
 * @param { Callback } callback - A callback to run whose signature is (sum), where
 */
function addStuff(x, y, callback) {
  callback(x+y);
}

```

### 4、声明泛型 @template

```javascript {13}
/**
 * @template T
 * @callback Callback
 * @param {Error=} err
 * @param {T=} stats
 * @returns {void}
 */


/**
 * @callback WebpackFunctionMulti
 * @param {ReadonlyArray<WebpackOptions> & MultiCompilerOptions} options options objects
 * @param {Callback<MultiStats>=} callback callback
 * @returns {MultiCompiler} the multi compiler object
 */
```
