---
id: typescriptTsConfigJSON
title: tsconfig.json
hide_title: true
sidebar_label: tsconfig.json
---

import Link from '@docusaurus/Link'

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

> 确保每个文件都是能单独编译的，不依赖上下文，配置项不会改变编译过后的代码行为，只是会在检测到文件不能单独编译的时候会发出警告

:::danger
使用`babel`编译器的时候，一定要开启这个功能，可以帮忙检测风险代码
:::

能达到以下几点作用：

1. 检测文件不能单独编译的代码：<Link to="/docs/enginee/typescript/typescriptImportTypes#案例分析">案例分析</Link>
2. 要求每个文件必须是模块也就是必须包含`import/export`

```javascript
// isolatedModules校验不通过，会报错
function fn() {
  doThing()
}
```

```javascript
// isolatedModules校验通过
function fn() {
  doThing()
}

export {}
```

3. 限制使用`环境常量枚举`引用，也就是申明的全局的常用枚举

```typescript
declare const enum Numbers {
  One
}

// 使用类型✅
const num: Numbers = 1
// 使用枚举引用❎
const num = Numbers.One
```

:::danger

- 枚举比较特殊，本身具备运行时代码
  - 正常的枚举会被编译成对象

    ```typescript title="input.ts"
    enum Numbers {
      One,
      Two
    }
    const num = Numbers.One
    ```

    ```typescript title="output.js"
    "use strict";
    var Numbers;
    (function (Numbers) {
        Numbers[Numbers["One"] = 0] = "One";
        Numbers[Numbers["Two"] = 1] = "Two";
    })(Numbers || (Numbers = {}));
    const num = Numbers.One;
    ```

  - 常量枚举，在使用枚举引用的地方，会被直接编译成实际值.(因为常量枚举意味着数据类型是不会变的，比较简单)

    ```typescript title="input.ts"
    const enum Numbers {
      One,
      Two
    }
    const num = Numbers.One
    ```

    ```typescript title="output.js"
    "use strict";
    const num = 0 /* One */;
    ```

- 因为想像`babel`等编译器没有上下文的概念，那么申明的`全局常量枚举`，`babel`是无法识别到引用的值，那么就没办法用实际值替换常量枚举引用，导致报错

:::
