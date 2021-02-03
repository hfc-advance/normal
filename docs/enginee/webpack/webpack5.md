---
id: webpack5Changelog
title: webpack5-changelog
hide_title: true
sidebar_label: webpack5-changelog
---

### chunkIds: named

- 开发模式下默认启用`chunkIds: 'named'`，将生成相对于`context`的路径的文件名称。

```
├── dist
│   ├── main.2d2e17.bundle.js
│   ├── runtime.5b83b2.bundle.js
│   └── src_a_js.aa6820.bundle.js
```

:::important
- 因此，你不再需要使用 `import(/* webpackChunkName: "name" */ "module")` 进行调试。但如果要控制生产环境的文件名，这还是有用的。
- 手动设置`import(/* webpackChunkName: "name" */ "module")`优先级最高，因此在生产环境如果要使用易于理解的名称，还是有用的。
:::

### import.meta

- `import.meta.webpackHot` 是 `module.hot` 的别名，在严格的 `ESM` 中也可用

- `import.meta.webpack` 是 `webpack` 的主要版本，数字表示: `5`

- `import.meta.url` 是当前文件的绝对地址。

```shell
file:///path/to/your/project/src/index.js
```

### 新的 Asset Module

`webpack5`对资产模块做了原生支持，可以不再使用`loader`来处理。[Asset Module](/docs/enginee/webpack/webpackAssetModule)

### 原生 web worker 支持

将 `Asset Module` 的 `new URL`，`webpack` 将输出 `worker`文件，并自动为 `webWorker`创建一个新的入口点。

```javascript
new Worker(new URL("./worker.js", import.meta.url))
```
