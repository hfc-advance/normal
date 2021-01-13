---
id: webpackOftenPkg1
title: 常用的webpack插件
hide_title: true
sidebar_label: 常用插件
---

### [1. progress-bar-webpack-plugin](https://github.com/clessg/progress-bar-webpack-plugin)

以进度条的方式显示编译进度

```javascript
var ProgressBarPlugin = require('progress-bar-webpack-plugin');
...
plugins: [
  new ProgressBarPlugin()
]
```

![progress-bar](/img/webpack-pr-bar.gif)

### [2. webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer)

分析资源包的大小以及依赖

```javascript
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  plugins: [
    new BundleAnalyzerPlugin()
  ]
}
```

![analyse](/img/webpack-analyse.png)

### [3. duplicate-package-checker-webpack-plugin](https://github.com/darrenscerri/duplicate-package-checker-webpack-plugin)

打包了相同的包会给出提示，比如两个不同版本的`vue`

```javascript
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin')

module.exports = {
  plugins: [new DuplicatePackageCheckerPlugin()]
}
```

![analyse](/img/screenshot.png)

### [4. filemanager-webpack-plugin 在webpack构建前后，复制，移动归档，删除文件或目录](https://github.com/gregnb/filemanager-webpack-plugin)

在`webpack`构建前后，复制，移动，归档，删除文件或目录。

```javascript
const FileManagerPlugin = require('filemanager-webpack-plugin');

module.exports = {
  ...
  ...
  plugins: [
    new FileManagerPlugin({
      onEnd: [
        {
          copy: [
            { source: "./dist/bundle.js", destination: "./newfile.js" }
          ]
        },
        {
          delete: [
            "./dist/bundle.js"
          ]
        }
      ]
    })
  ],
  ...
}
```

### [5. webpack-virtual-modules将模块写入内存中](https://github.com/sysgears/webpack-virtual-modules)

可以将模块写入内存中，在业务中导入使用。

```javascript
var VirtualModulesPlugin = require('webpack-virtual-modules');

var virtualModules = new VirtualModulesPlugin({
  'node_modules/module-foo.js': 'module.exports = { foo: "foo" };',
  'node_modules/module-bar.js': 'module.exports = { bar: "bar" };'
});

module.exports = {
  // ...
  plugins: [
    virtualModules
  ]
};

var moduleFoo = require('module-foo');
// You can now use moduleFoo
console.log(moduleFoo.foo);
```
