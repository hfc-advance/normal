---
id: typescriptTsConfigJSON
title: tsconfig.json
hide_title: true
sidebar_label: tsconfig.json
---

## 配置说明

### target

> 代码编译的 ECMAScript 目标版本，枚举值有：`es3`, `es5`, `es6`, `es2015`, `es2016`, `es2017`, `es2018`, `es2019`, `es2020`, `es2021`, `esnext`

当编译 ts 代码时，可以把 ts 转为 ES5 或更早的 js 代码。所以需要选择一个编译的目标版本。vue-cli3 的 typescript 模板，设置为“ESNext”，因为现代大部分应用项目都会使用 Webpack（Parcel 也很棒）进行打包，Webpack 会把你的代码转换成在所有浏览器中可运行的代码。

```json
{
  "compilerOptions": {
    "target": "es5",
    // target: es5默认的lib值
    "lib": ["DOM", "ES5", "ScriptHost"]
  }
}
```

:::danger 注意事项
`target`除了影响编译之后的代码，在没有设置`lib`配置项的时候，会默认设置`lib`的值
:::

### lib

> 为了在 ts 代码中使用 ES6 中的类，比如 Array.form、Set、Reflect 等，需要设置 lib 选项，在编译过程中把这些标准库引入。这样在编译过程中，如果遇到属于这些标准库的 class 或 api 时，ts 编译器不会报错。

:::danger 注意事项
`lib`只是配置一些编译器需要能够识别的语法，保证`ts编译器`不会报错，不会影响转译后的代码。

所以当源代码需要`polyfill`，还需要开发者自己手动引入
:::

### isolatedModules
