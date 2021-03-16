---
id: reactElementObject
title: react元素对象
hide_title: true
sidebar_label: 用对象描述react元素
---

当我们在写 `jsx` 的时候：

```jsx
<marquee bgcolor="#ffa7c4">hi</marquee>
```

其实，就是自动调用了：

```javascript
React.createElement(
  /* type */ 'marquee',
  /* props */ { bgcolor: '#ffa7c4' },
  /* children */ 'hi'
)
````

`React.createElement` 会返回一个 `对象`，也就是 `React元素`：

```javascript {9}
{
  type: 'marquee',
  props: {
    bgcolor: '#ffa7c4',
    children: 'hi',
  },
  key: null,
  ref: null,
  $$typeof: Symbol.for('react.element'), // 🧐是谁
}
```

:::important $$typeof
`$$typeof` 是为了防止 `XSS` 攻击：因为JSON不支持 Symbol 类型。所以即使服务器存在用JSON作为文本返回安全漏洞，JSON 里也不包含 Symbol.for('react.element')。React 会检测 element.$$typeof，如果元素丢失或者无效，会拒绝处理该元素。

特意用 Symbol.for() 的好处是 Symbols 通用于 iframes 和 workers 等环境中。因此无论在多奇怪的条件下，这方案也不会影响到应用不同部分传递可信的元素。同样，即使页面上有很多个 React 副本，它们也 「接受」 有效的 $$typeof 值。

要在 React 元素中渲染任意 HTML，你不得不写 `dangerouslySetInnerHTML={{ __html: message.text }}`。
::::

```jsx
function Parent() {
  const reactElement = {
    type: 'marquee',
    props: {
      bgcolor: '#ffa7c4',
      children: 'hi'
    },
    key: null,
    ref: null,
    $$typeof: Symbol.for('react.element')
  }

  return (
    <>
      {reactElement}
      <div dangerouslySetInnerHTML={{ __html: '<h1>Hello</h1>' }} />
    </>
  )
}
```

## 参考

[为什么React元素有一个$$typeof属性？](https://overreacted.io/zh-hans/why-do-react-elements-have-typeof-property/)
