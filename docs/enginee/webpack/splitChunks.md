---
id: webpackOftenPkg
title: splitChunks
hide_title: true
sidebar_label: splitChunks
---

## 理解 module chunk bundle

![webpack-module_chunk_bundle](/img/webpack-module_chunk_bundle.jpeg)

### module

:::success module
`module`: 也就是开发编写的项目文件，每个文件都是一个`module`。包括依赖项以及依赖项里面的每个依赖项。

  ```javascript title="index.js"
  import Vue from 'vue'
  import App from './app.vue'
  import router from './router.js'
  import store from './store.js'

  const vue = new Vue({
    router,
    store,
    render: (h) => h(App)
  })
  ```

  - `index.js`，`node_modules/vue/dist/vue.esm.js`，`app.vue`，`router.js`，`store.js` 等都是 `module`
  - 以及`babel polyfill`注入的文件等都是`module`
  - 以及`app.vue router.js store.js`等文件里面的依赖项都是`module`
:::

### chunk

:::success chunk
`chunk`: `webpack`用来分析依赖的入口，产生`chunk`，有两种形式：
  - 入口文件`entry`
  - 才用异步方式导入的文件`import()`

  ```javascript
  import Vue from 'vue'
  import App from './app.vue'
  import router from './router.js'
  import store from './store.js'

  import(/* webpackChunkName: "demo1" */'./demo1')
    .then(console.log)
  const vue = new Vue({
    router,
    store,
    render: (h) => h(App)
  })
  ```

    - `chunks`有两个：`index`， `demo1`

:::

### bundle

:::success bundle
`bundle`: 也就是经过`webpack`编译过后生成的最终文件。
:::
