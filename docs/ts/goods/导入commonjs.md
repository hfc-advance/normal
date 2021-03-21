---
id: tsSupportCommonJs
title: ts-commonjs支持
hide_title: true
sidebar_label: esmodule的形式导入commonjs
---

比如 `react` 是以 `commonjs` 形式导出的，当在 `ts` 中：

```jsx
import React from 'react'
```

会抛出错误 `Module '"react"' has no default export.`

必须这样写才行：

```jsx
import * as React from 'react'
```

TS 是允许你这么写的，但是需要在 tsconfig.json 中配置两个字段

```json
{
  "allowSyntheticDefaultImports": true,
  "esModuleInterop": true
}
```

先说下 allowSyntheticDefaultImports，这个字段实际只起到检查的作用，不会对编译后的代码有任何影响。

而 esModuleInterop 就不一样，实际上开启这个字段的时候，默认也是会开启 allowSyntheticDefaultImports，并且对于编译后的代码也做了兼容。还要注意的是这个字段只有当把代码编译成 commonJS 的时候才会起作用。

## 参考

1. [由 allowSyntheticDefaultImports 引起的思考](https://blog.leodots.me/post/40-think-about-allowSyntheticDefaultImports.html)
