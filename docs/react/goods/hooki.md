---
id: reactHook
title: react Hook
hide_title: true
sidebar_label: reactHook
---

## 1. useState

### 1 注意事项

:::warning 多次渲染问题

- `setState`设置和之前状态相同的值，`React`有可能还会渲染当前组件。[官方说明](https://zh-hans.reactjs.org/docs/hooks-reference.html#bailing-out-of-a-state-update)

  ```jsx live
  function Component (){
    const [state, setState] = useState('foo')
    const onClick = () => setState('foo')
    console.log(state) // 打开控制台查看
    return <button onClick={onClick}> Change </button>
  }
  ```

  1. 在按下按钮之前，console仅打印null
  2. 第一次按下按钮进行console打印foo
  3. 第二次按钮是按下console打印foo
  4. 第三次及以后console不打印任何内容

  :::tip 结论

  - `setState`设置相同的值，`render`会执行两次，后续不再执行
  - 设置相同的值，并不会触发子组件的`render`，而且不会触发副作用`useEffect`，渲染性能不是问题
  - 如果函数式组件内部有复杂的逻辑计算就会存在计算性能开销
  - 如果`useState`的初始值是复杂的逻辑计算，可以传入函数来返回初始值，这样多次`render`也只会执行一次

    ```jsx
    const [state, setState] = useState(() => {
      const initialState = someExpensiveComputation(props);
      return initialState;
    });
    ```

  - 函数体内的复杂计算可以通过[usememo](https://reactjs.org/docs/hooks-reference.html#usememo)来优化

  :::

:::

## 2. useEffect

### 1. 基本用法

:::important 模仿class生命周期
"模仿生命周期，`useEffect`第二个参数传个空数组，无依赖，只执行一次，相当于`didmount`。如果要区分生命周期，不传第二个参数，每次都会跑，相当于`didupdate`。加个`mount`标记一下，里面用`if`判断一下，即可以达到模拟生命周期的效果"

- mounted: 第二个参数传递空数组，相当于无依赖，那么只会在初次挂载的时候执行一次

```jsx
useEffect(() => {
  console.log('只执行mounted一次')
}, [])
```

- update: 只需要把第一次排除掉即可

:::

## 参考

### [1. useState实现原理 - imweb](https://imweb.io/topic/5c7d58b0baf81d795209497e)
### [2. 一篇看懂 React Hooks](https://zhuanlan.zhihu.com/p/50597236)
### [3. 理解函数式组件以及hook - 完全指南](https://overreacted.io/zh-hans/a-complete-guide-to-useeffect/)
