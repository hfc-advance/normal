---
id: tsNeverType
title: ts-never
hide_title: true
sidebar_label: never
---

`never` 表示无法到达的地方，也是最具体的类型，因为没有哪个集合比空集合更小了。用来告知编译器某处代码永远不会执行,从而获得编译器提示, 以避免程序员在一个永远不会(或不应该)执行的地方编写代码.

## 作用

### never 过滤字段

在 A[KEYOF] 时, never 可以用于过滤掉字段。在抽取公共部分时会用到。

```typescript
type TObj = {
  a: 1,
  b: 2,
  c: never
}

type objKeys = keyof TObj // a,b,c
type objValues = TObj[objKeys] // 1, 2，这里的never移除了
```

### 收窄类型，捕获未知错误

```typescript
interface Foo {
  type: 'foo'
}
interface Bar {
  type: 'bar'
}
type All = Foo | Bar

function handleValue(val: All) {
  switch (val.type) {
    case 'foo':
      // 这里 val 被收窄为 Foo
      break
    case 'bar':
      // val 在这里是 Bar
      break
    default:
      // val 在这里是 never
      const exhaustiveCheck: never = val
      break
  }
}
```

default 里面我们把被收窄为 never 的 val 赋值给一个显式声明为 never 的变量。如果一切逻辑正确，那么这里应该能够编译通过。但是假如后来有一天你的同事改了 All 的类型：

```typescript
type All = Foo | Bar | Baz
```

然而他忘记了在 handleValue 里面加上针对 Baz 的处理逻辑，这个时候在 default branch 里面 val 会被收窄为 Baz，导致无法赋值给 never，产生一个编译错误。
