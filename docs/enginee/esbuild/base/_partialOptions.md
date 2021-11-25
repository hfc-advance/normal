## option

配置项

### bundle

> 启用这个配置意味着将所有的依赖项(`node_modules`,`本地文件`)都打包到一个文件中。

```shell
esbuild main.ts --bundle
```

:::danger

- 当有多个入口文件的时候，启用`bundle`并不会将多个入口文件打包到一起，而是输出多个捆绑包，不能达到串联的目的

  ```shell
  esbuild main.ts app.ts --bundle --outdir=dist
  ```

  ```javascript title="多个入口多个输出文件"
  .
  ├── dist
  │   └── main.js
  │   └── app.js
  ```

:::
