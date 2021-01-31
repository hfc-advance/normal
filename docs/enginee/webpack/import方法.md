---
id: webpackImportantMethod
title: import()
hide_title: true
sidebar_label: import()
---

### import(动态表达式)

`import()`可以接收一个动态表达式

```javascript
// 想象我们有一个从 cookies 或其他存储中获取语言的方法
const language = detectVisitorLanguage();
import(`./locale/${language}.json`).then(module => {
  // do something with the translations
});
```

:::warning

- 不能使用完全动态的方式，必须包含一些路径信息，如`import(foo)`是不可以的，但是```import(`./locale/${language}.json`)```是可以的。
  - 当使用动态表达式的时候，`webpack`会把可能的模块都打包生成每一个可能的`chunk`，最后代码运行阶段，确定了表达式的值，就只加载这个文件
  - 如果是完全动态的，那么`webpack`是无法分析的，必须包含一些路径信息。
  - 如```import(`./locale/${language}.json`)```，会把`locale`目录下所有的`json`文件都打包出每个对应的文件，供未来的结果加载。

- 例子：

  ```
  .
  ├── components
      ├── a.js
      ├── b.js
  ├── index.js
  ```

  ```javascript title="index.js"
  function test() {
    return 'a'
  }

  import(`./components/${test()}.js`).then((res) => {
    console.log(res)
  })
  ```

  最终会打包出来`a,b`两个`bundle`，供使用，但是最终只会加载`a bundle`。
:::
