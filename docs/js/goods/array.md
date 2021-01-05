---
id: jsArray
title: Array知识
hide_title: true
sidebar_label: Array
---

## 数组串行异步

### 1. 使用纯循环

```typescript
(async () => {
  const data = [1, 2, 3]
  let result = 0
  for (let i = 0; i < data.length; i++) {
    const currentData = await new Promise(resolve => {
      setTimeout(() => {
        resolve(data[i])
      }, 500)
    })
    result += <number>currentData
  }
  console.log(result)
})()
```

### 2. 使用 reduce

```typescript
(async () => {
  const data = [1, 2, 3]
  const result = await (<any>data.reduce)(async (preValue, current) => {
    console.log(preValue)
    // 后面的处理要等待前面完成
    const accum = await preValue
    const next = await apiCall(accum, current)
    return next
  }, 0)
  console.log(result) // 6

  async function apiCall (a, b) {
    return new Promise((resolve) => {
      setTimeout(() => { resolve(a + b) }, 300)
    })
  }
})()
```

:::tip
利用`reduce`的`preValue`每次都是上一次`callback`的返回值的特性：

- 第一次： `0`
- 第二次: `Promise {<pending>}`
- 第三次: `Promise {<pending>}`
:::
