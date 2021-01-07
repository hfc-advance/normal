---
id: jsProxy
title: Proxy
hide_title: true
sidebar_label: Proxy
---

## set

### set() 方法应当返回一个布尔值。

- 返回 `true` 代表属性设置成功。
- 在严格模式下，如果 `set()` 方法返回 `false`，那么会抛出一个 `TypeError` 异常。

```typescript {9}
let p = new Proxy(data, {
  get(target, key) {
    return target[key]
  },

  set(target, key, value) {
    target[key] = value

    return true
  }
});
```

### set() 多次执行

当代理的对象是一个`数组`类型的时候，`set handler`会执行多次。

```typescript
let p = new Proxy([1,2,3], {
  get(target, key, receiver) {
    console.log('get value:', key)
    return target[key]
  },
  set(target, key, value, receiver) {
    console.log('set value:', key, value)
    target[key] = value
    return true
  }
})

p.push(1)

// get value: push
// get value: length
// set value: 3 1
// set value: length 4
```

当执行`push`动作的时候，除了添加了新的数据，同时也设置了`array.length`属性的值，所以会执行多次。

:::important
可以通过`判断 key 是否为 target 自身属性，以及设置val是否跟target[key]相等`来判断是否操作了关联属性。
  - `length` 是`target`的自身属性
  - 当设置`length`的值的时候，再通过`target.length`获取的就是新增之后的长度和要设置的`length`的值是相等的
:::

## proxy 只能代理一层

```typescript {18,19}
const data = { item: { id: 1 }, arr: [1] }

const proxy = new Proxy(data, {
  get (target, key) {
    const value = target[key]
    console.log('[get]', key, value)
    return value
  },

  set (target, key, value) {
    console.log('[set]', key, value)

    target[key] = value
    return true
  }
})

proxy.item.id = 6 // [get] item {id: 1}
proxy.arr.push(6) // [get] arr [1]
```

:::success

- 深层对象操作不会被拦截
  - 会触发外层对象的`get`操作，因为在访问深层对象过程中，是要先查询外层的索引
  - 对象内部的深度侦测，是需要开发者自己实现的
:::

## 参考

### [Vue3 中的数据侦测](https://juejin.cn/post/6844903957807169549)
