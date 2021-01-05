---
id: tsConfig
title: ts配置技巧
hide_title: true
sidebar_label: 配置技巧
---

### 1. 减少项目体积

[microsoft/tslib 包含ts所有运行时的helper](https://github.com/microsoft/tslib)

`Typescript`编译的时候，和 `Babel` 一样的问题：在把 `ES6` 语法转换成 `ES5` 语法时需要注入辅助函数， 为了不让同样的辅助函数重复的出现在多个文件中，可以开启 `TypeScript` 编译器的 `importHelpers` 选项，修改 `tsconfig.json` 文件如下:

```json
"compilerOptions": {
  "importHelpers" : true
}
```

:::important
原理和`babel-plugin-transform-runtime`非常类似：

- 没有设置`--importHelpers`的情况下:

```typescript
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
exports.x = {};
exports.y = __assign({}, exports.x);
```

- 设置了`--importHelpers`的情况下:

```typescript
var tslib_1 = require("tslib");
exports.x = {};
exports.y = tslib_1.__assign({}, exports.x);
```

:::

### 添加 bind call apply校验

默认配置是不会校验`apply`,`call`,`bind`的参数:

```typescript
function test(a: number) {}
test.call(null, '1') // 你传入了一个 string，但并不报错
```

:::tip
`3.2` 版本后，你可以通过开启[strictBindCallApply](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-2.html#strictbindcallapply)来使`BindCallApply`“更安全”。这是它的[实现](https://github.com/Microsoft/TypeScript/pull/27028)
:::
