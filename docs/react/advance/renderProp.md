---
id: reactRenderProp
title: react render prop
hide_title: true
sidebar_label: render prop
---

## 简介

> 如果说React的核心是State => UI, 普通的组件是UI重用，那么render props就是为了State重用而应运而生的。

指一种在 `React` 组件之间使用一个 `值为函数的 prop` 共享代码的简单技术

```tsx {9,17-19}
interface IItemProp {
  children: (num: number) => JSX.Element;
}

function Item(prop: IItemProp) {
  const [num, setNum] = React.useState(1)
  return (
    <div>
      { prop.children(num) }
    </div>
  )
}

ReactDom.render(
  <Item>
    {(num: number) => {
      return <div>{num}</div>
    }}
  </Item>,
  document.querySelector('#app')
)
```

:::important

- 类似于 `控制反转`，数据由父组件提供，但是又不直接嵌套在父组件内部，达到了解耦的目的。
- 一切能用 `高阶组件` 实现的逻辑，都能用 `render prop` 来解决。
:::

## 参考

- [[译] 使用 Render props 吧！](https://juejin.cn/post/6844903521343504398)
