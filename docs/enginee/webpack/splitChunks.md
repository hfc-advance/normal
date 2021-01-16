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

### cacheGroup.test

`function (module, chunk) => boolean; RegExp; string`

控制这个`group`选择的`module`。

:::warning

- `RegExp`匹配的是`module.resource`也就是源文件的路径。
- `string`匹配的是`chunk.name`，如果存在这个`chunk`，那么就是这个`chunk`下的所有`bundle`。
:::

### cacheGroup.chunks

`all | initial | async | function (chunk)`

控制这个`group`选择的`chunk`，也就是命中的`chunk`下的所有`module`。

:::warning

- 这个配置项是基于`chunk`并不是基于`module`的，如果这个`module`不属于`chunk`，那就是这个`module`所在的`chunk`的校验值。
- 相当于是`cacheGroup.test`的`string`匹配模式。
- 当前`module`的`chunk`如果不符合这个`chunks`，那么也是直接退出这个`cacheGroup`
:::

### cacheGroup.name

`boolean = false | function (module, chunks, cacheGroupKey) => string | string`

用于控制切割块的名字。

:::success 不同的`module`当`name`相同的时候，都会打包到一起

- `boolean`
  - 只有`false`没有`true`的选项，因为`false`表示不设置名字也就是和`chunk`保持同样的名字，这样就是不切割`module`，全部打包到`chunk`中去。
  - 设置`true`没有任何语义，但是也会起作用，效果和`false`一样。
  - 也就是只要是`Boolean`类型的值，效果都一致：就是不切割模块，打包到`chunk`中。

- `function (module, chunks, cacheGroupKey) => string`：当`name`的值为`function`类型的时候，认为方法的返回值只有两种类型`undefined | string`。
  - `false`: 当返回值是`false`的时候，会当成`undefined`，也就是没有设置`name`，那么这个时候：
    - 按照资源`id`来设置打包资源的文件名称如：`1.js`
    - 虽然没有设置名字但是资源还是会打包到一个文件如`1.js`
  - `true`: 当返回值是`true`的时候，会当成字符串`"true"`来处理。
    - 打包资源的文件名称：`true.js`
    - 资源还是会打包到一个文件`true.js`
  - `string`: 可以根据`module`的路径以及所属`chunk`的名称来返回不同的名字，这样就会切割出多个`bundle`。

    ```javascript
    {
      commons: {
        test: /[\\/]node_modules[\\/]/,
        // cacheGroupKey here is `commons` as the key of the cacheGroup
        name(module, chunks, cacheGroupKey) {
          const moduleFileName = module.identifier().split('/').reduceRight(item => item);
          const allChunksNames = chunks.map((item) => item.name).join('~');
          return `${cacheGroupKey}-${allChunksNames}-${moduleFileName}`;
        }
      }
    }
    ```

- `string`: 所有的`module`都会打包到这个包中。
:::

### cacheGroup.minSize

约定”生成块“的最小大小。单位`byte; 1kb = 1024byte`

:::warning
当切割出来的块，没有达到这个最小大小，那么将不会被切割出来。
:::

### cacheGroup.maxSize

`webpack`尝试将大于`maxSize`大小的`chunk`，进一步的切割，切割出来的部分不能小于`minSize`。

:::warning `maxSize`的优先级比较低

- 当`chunk`即使大于`maxSize`，但是已经不能切割了，比如这个`chunk`内部的代码全部是内联的，并没有`module`，那就没有办法切割了。
- 当`chunk`能够进一步的切割，但是里面的`module`都大于`minSize`，那么也不会进一步的切割。
- 优先级：`minSize` > `maxSize` > `maxInitialRequest/maxAsyncRequests`
:::
