---
id: jsPromise
title: Promise知识
hide_title: true
sidebar_label: Promise
---

## 1. 数组串行异步

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

## 2. 并行运行，提取收个成功的值

这个方法适合的场景：

- 有多条路可以走，其中任意一条路走通即可，其中有一些路失败也没关系
- 为了加速得到结果，并发地走多条路，避免瀑布式尝试

```typescript
const promise1 = new Promise((resolve) => {
  setTimeout(() => {
    resolve(1)
  }, 1000)
})

const promise2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(new Error('fail'))
  }, 500)
})

const currentPromise1 = promise1.then(
  value => Promise.reject(value),
  err => Promise.resolve(err)
)
const currentPromise2 = promise2.then(
  value => Promise.reject(value),
  err => Promise.resolve(err)
)

Promise.all([currentPromise1, currentPromise2])
  .catch(err => {
    console.log(err)
  })
```

:::tip
- `Promise.race`取值的，最先有改变状态的`Promise`，有可能是`rejected`状态。
- `Promise.all`是要等待所有的`Promise`都成功才会`resolve`,如果出现`rejected`那么也会结束

我们可以利用`Promise.all`的机制，把所有的`Promise`取反，`resolve`状态改成`rejected`状态，`rejected`状态改成`resolve`状态，那么只要出现`rejected`状态，`Promise.all`就会结束。
:::
