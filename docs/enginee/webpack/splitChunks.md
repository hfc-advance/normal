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

:::warning

1. 一个项目中`module`是固定不变的，也就是这个应用的所有的模块文件。不会因为提取公共模块或者`splitChunks`切割模块而导致`module`变化。
2. 一个项目中`chunk`也是不变的，不会因为提取公共模块或者`splitChunks`切割模块而导致`chunk`变化。
:::

### 编译过程

![splitChunks_cacheGroups_prosess](/img/splitChunks_cacheGroups_presess.gif)

:::important

- 切割是基于编写的文件的也就是[module](#module)。
- `module`会按照`cacheGroup`的优先级先进入到`cacheGroup.test`校验。
  - `true`：等待所有`cacheGroup.test`校验完毕，进入到`cacheGroup.chuns`校验
  - `false`：退出当前`cacheGroup`，也就是这个`module`不参与到这个`group`的切割。
- `module`进入到`cacheGroup.chunks`校验。
  - `true`：等待所有`cacheGroup.chunks`校验完毕，进入到`cacheGroup.name`校验
  - `false`：退出当前`cacheGroup`，也就是这个`module`不参与到这个`group`的切割。
  - `注意事项`：只有当前`module`属于`chunk`才会进入到`chunks`校验，不属于`chunk`，那就是`module`所在的`chunk`之前校验的返回值来决定是否退出当前`cacheGroup`。这种情况下如果`chunks`是方法，也就是说不会进入到这个方法内。

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
    - `index.js`是`entry`，这个文件会进入到`cacheGroup.chunks`里面校验。`app.vue`这个`module`不属于`chunk`，但是会根据前面`index.js`这个`chunk`的校验值来决定是否进入到`cacheGroup.name`中进行下一步。
:::
