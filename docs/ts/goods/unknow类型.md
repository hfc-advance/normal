---
id: tsUnknownType
title: ts-unknown
hide_title: true
sidebar_label: unknown
---

unknown 类型，它是 any 类型对应的安全类型。

:::warning
在对 unknown 类型的值执行大多数操作之前，我们必须进行某种形式的检查。而在对 any 类型的值执行操作之前，我们不必进行任何检查。

```javascript
const a: unknown = '123'
a.substr(1) // error

if (typeof a === 'string') {
  a.substr(1) // ok
}
```

:::

## 类型保护

要想操作 `unknown` 类型数据，必须缩小 unknown 类型范围，缩小范围呢，就是通过[类型保护](docs/ts/goods/tsGoods1#5-类型保护)的方式。

```javascript
function stringifyForLogging(value: unknown): string {
  if (typeof value === "function") {
    const functionName = value.name || "(anonymous)";
    return `[function ${functionName}]`;
  }

  if (value instanceof Date) {
    return value.toISOString();
  }

  return String(value);
}
```

## 场景

### 从 localStorage 中读取JSON

因为我们不知道在反序列化持久化的 JSON 字符串后我们会得到什么类型的值。我们将使用 unknown 作为反序列化值的类型。那么在使用返回值之前必须进行某种形式的类型检查。
