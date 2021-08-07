---
id: webpackTapable
title: tapable
hide_title: true
sidebar_label: tapable
---

## 简介

- `tapable` 控制一系列注册事件之间的执行流机制，可以理解为高阶版的 `event`.
- 分为 `同步` 和 `异步`，然后 `异步` 里面又分为 `串行` 和 `并行`，当然 `同步` 的只能是 `串行`.

## sync 同步类型

### 1. SyncHook 钩子

- 按照注册的先后顺序执行
- 只能通过 `tap` 注册，`call` 触发事件

```tsx
import { SyncHook } from 'tapable'

const syncHook = new SyncHook<Array<string>>(['name', 'age', 'height'])

syncHook.tap('plugin1', (name, age, height) => {
  console.log('plugin1', name, age, height)
})

syncHook.tap('plugin2', (name, age, height) => {
  console.log('plugin2', name, age, height)
})

syncHook.call('1', '2', '3')
```

执行结果如下所示：

![SyncHooks](../../../static/img/synchooks.png)

### 2. SyncBailHook 钩子

- `bail：[beɪl] 保释`
- 按照注册的先后顺序执行，前面如果有一个返回值不为空，则跳过剩余的事件。

```tsx {9}
import { SyncBailHook } from 'tapable'
const syncHook = new SyncBailHook(['name'])

syncHook.tap('plugin1', (name) => {
  console.log('plugin1', name)
})
syncHook.tap('plugin2', (name) => {
  console.log('plugin2', name)
  return 'name'
})
syncHook.tap('plugin3', (name) => {
  console.log('plugin3', name)
})

syncHook.call('hfc')
```

第二个注册事件因为返回了不为 `undefined` 的值，所以后面的事件不会继续执行，运行结果如下所示：

![SyncBailHook](../../../static/img/syncbailhook.png)

### 3. SyncWaterfall 钩子

- `waterfall：[ˈwɔːtəfɔːl] 瀑布`
- 串行执行，上一个事件的返回值，会传递给下一个事件

```tsx
import { SyncWaterfallHook } from 'tapable'
const syncHook = new SyncWaterfallHook(['name'])

syncHook.tap('plugin1', (name) => {
  console.log('plugin1', name)
  return 1
})
syncHook.tap('plugin2', (name) => {
  console.log('plugin2', name)
  return 2
})

syncHook.tap('plugin3', (name) => {
  console.log('plugin3', name)
})

syncHook.call('hfc')
````

运行结果如下入所示：

![SyncWaterfallHook](../../../static/img/syncwaterfallhook.png)

### 4. SyncLoopHook 钩子

- 事件只要有返回值，就会一直循环该事件

```tsx
```
