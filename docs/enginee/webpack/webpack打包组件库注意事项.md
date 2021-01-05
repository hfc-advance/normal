---
id: webpackComponentNotice
title: webpack打包资源包注意事项
hide_title: true
sidebar_label: 打包package注意事项
---

## 1. 处理package里面的异步资源

比如`js,css,img`等资源，`webpack`编译的时候并不会以依赖的形式导入，而是以`内联`或者`解析成路径的形式`

以打包一个图片为例，源码如下:

```javascript
import Image from '@/assets/img/logo.png
```

经过`webpack`打包如下:

```javascript {5,6,14,15}
(function webpackUniversalModuleDefinition (root, factory) {
  if (typeof exports === 'object' && typeof module === 'object') { module.exports = factory() } else if (typeof define === 'function' && define.amd) { define('material', [], factory) } else if (typeof exports === 'object') { exports.material = factory() } else { root.material = factory() }
})(window, function () {
  return  (function (modules) {
    // webpack output定义的publicPath
     	__webpack_require__.p = ''
     	// Load entry module and return exports
     	return __webpack_require__(__webpack_require__.s = 'tjUo')
     })
  /************************************************************************/
   ({
    /***/ 'T/0B':
    /***/ function (module, exports, __webpack_require__) {
      // 直接返回静态路径
      module.exports = __webpack_require__.p + 'static/img/logo.8238db1.png'
      /***/ }
     })
})
```

经过`rollop`打包如下:

```javascript {6,7}
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = global || self, global.snow = factory());
}(this, (function () { 'use strict';
  // 通过依赖的形式返回资源
	const img = require('./logo.png');

	return img;

})));

```

> 如上两种打包图片资源为例，`webpack`打包出来的资源是以静态路径的形式加载的，`rollup`则是以依赖的形式加载的.静态路径的资源再被别的项目引用的时候，就分析不到这个图片的依赖，那么打包出来的资源也就不包含这个图片导致失败。

如果就要使用`webpack`可以采用以下解决方案:

### 静态依赖上传到`oss`，修改打包的`output.publicPath`

### 使用`rollup`打包

## 2. loader配置正则的时候一定要严格

比如`/\.js/`，如果项目有种`json`文件，那么`babel-loader`也会处理`json`文件所以应该是:

```json
{
  "test": "/\.js$/"
}
```
