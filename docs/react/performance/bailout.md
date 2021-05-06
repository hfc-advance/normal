---
id: reactBailout
title: react bailout
hide_title: true
sidebar_label: bailout
---

## 简介

在 `React` 中，每当触发更新（比如调用 `this.setState`、 `useState` ），会为组件创建对应的 `fiber` 节点。

> 你可以使用 `DOM` 元素来访问它: `query('#container')._reactRootContainer._internalRoot.current`

- 两种方式创建 `fiber` 节点：

### 1. render

经过 `diff` 算法后生成一个新 `fiber` 节点。组件的 `render`（比如 `ClassComponent` 的 `render` 方法调用、`FunctionComponent` 的执行）就发生在这一步。

### 2. bailout

即复用前一次更新该组件对应的 `fiber` 节点作为本次更新的 `fiber` 节点。

## 例子说明

对于如下 `Demo` ，点击 `Parent` 组件的 `div` ，触发更新，`Son` 组件每次都会执行

```jsx live
function App () {
  function Son() {
    console.log('child render!');
    return <div>Son</div>;
  }


  function Parent() {
    const [count, setCount] = React.useState(0);

    return (
      <div onClick={() => {setCount(count + 1)}}>
        点击 {count}
        <Son />
      </div>
    );
  }

  return <Parent />
}
```

但是如果我们是下面这种形式，每次点击都不在触发 `Son` 的执行。

```jsx live
function App () {
  function Son() {
    console.log('child render!');
    return <div>Son</div>;
  }


  function Parent(props) {
    const [count, setCount] = React.useState(0);

    return (
      <div onClick={() => {setCount(count + 1)}}>
        点击 {count}
        {props.children}
      </div>
    );
  }

  return (
    <Parent>
      <Son />
    </Parent>
  )
}
```

:::success
点击 `Parent` 组件的 `div` 子组件，触发更新，但是 `child render!` 并不会打印。
这是因为 `Son` 组件会进入 `bailout` 逻辑。
:::

## bailout的条件

### 1. oldProps === newProps

这里是 `全等比较`，包含引用相等。

我们知道组件render会返回JSX，JSX是React.createElement的语法糖。

所以render的返回结果实际上是React.createElement的执行结果，即一个包含props属性的对象。

即使本次更新与上次更新props中每一项参数都没有变化，但是本次更新是React.createElement的执行结果，是一个全新的props引用，所以oldProps !== newProps。

:::warning 如何保证 oldProps === newProps

- 通过变量保存 `React.createElement` 的执行结果

  ```tsx {6,13} title="创建临时变量"
  function Son() {
    console.log('child render!');
    return <div>Son</div>;
  }
  const MemoSon = <Son />
  function Parent() {
    const [count, setCount] = React.useState(0);

    return (
      <div onClick={() => {setCount(count + 1)}}>
        点击 {count}
        <MemoSon />
      </div>
    );
  }
  ```

  ```tsx {11} title="通过children渲染"
  function Son() {
    console.log('child render!');
    return <div>Son</div>;
  }
  function Parent(props) {
    const [count, setCount] = React.useState(0);

    return (
      <div onClick={() => {setCount(count + 1)}}>
        点击 {count}
        {props.children}
      </div>
    );
  }

  <Parent>
    <Son />
  </Parent>
  ```

  `children` 实际就是 `jsx`，也就是 `React.createElement` 的执行结果，每次都是同一个引用
:::

### ~~2. context value 没有变化~~

这个判断条件是留给已废弃的 `context` 使用的，可以忽略。

### 3. workInProgress.type === current.type

更新前后 `fiber.type` 不变，比如 `div` 没变为 `p` 。

### 4. !includesSomeLane(renderLanes, updateLanes)

`includesSomeLane(renderLanes, updateLanes)` 这句代码是为了判断当前节点上的更新任务的优先级是否包含在了此次更新 的优先级之中。如果当前节点的更新优先级大于等于此次更新的优先级，则 `includesSomeLane(renderLanes, updateLanes)` 会返回 `true`。

```jsx {3}
import React from 'react'
function Son() {
  const [count, setCount] = React.useState(1)
  return <div onClick={() => setCount(2)}>{count}</div>;
}

const memoizedSon = <Son />

export default class App extends React.Component {
  render() {
    return memoizedSon
  }
}
```

上面的例子当点击 `div` 时会触发一轮更新， `App` 会进入 `bailout` 逻辑，且 `includesSomeLane(renderLanes, workInProgress.childLanes)` 为 `true` 所以会继续处理子节点 `Son`。而 `Son` 节点对应的更新优先级是等于此次更新的优先级的，所以 `Son` 不会走 `bailout`。

## 参考

- [从Context源码实现谈React性能优化](https://mp.weixin.qq.com/s?__biz=MzkzMjIxNTcyMA==&mid=2247485292&idx=1&sn=822bfd7aafb151652c3102acaa6c8ba1&chksm=c25e69abf529e0bdac15cd21567aac53de693ab5159839f345e62d323a29069dc251888535ad&cur_album_id=1783121402896678912&scene=189#rd)
- [React组件到底什么时候render啊](https://mp.weixin.qq.com/s?__biz=MzkzMjIxNTcyMA==&mid=2247485264&idx=1&sn=57dcf2fa177e0ae92a754176452139f5&chksm=c25e6997f529e081c2b27fec875a9b23ee6b24b7657e6f9bbc54ee72e6ea5a8e16947f916b66&token=296021054&lang=zh_CN#rd)
- [React 源码解析之协调过程（一）](https://www.qiyuandi.com/zhanzhang/zonghe/12611.html)
