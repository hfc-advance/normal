---
id: reactNextJsOftenFunctional
title: next.js 常用功能
hide_title: true
sidebar_label: 常用功能
---

## dynamic imports 动态导入

```javascript title="基本用法"
import dynamic from 'next/dynamic'
const DynamicComponent = dynamic(() => import('../components/hello'))

function Home() {
  return (
    <div>
      <DynamicComponent />
    </div>
  )
}
```

```javascript title="显示加载Loading"
import dynamic from 'next/dynamic'
const DynamicComponent = dynamic(() => import('../components/hello'), {
  // highlight-next-line
  loading: () => <p>...</p>
})
```

```javascript title="关闭ssr渲染此组件"
import dynamic from 'next/dynamic'
const DynamicComponent = dynamic(() => import('../components/hello'), {
  // highlight-next-line
  loading: () => <p>...</p>
})
```

:::danger
默认是支持`ssr`模式，两者的区别就是：在 ssr 模式下，在服务器上渲染组件的时候，如果直接需要异步加载的组件，那么会直接以外链的形式挂载到 html 中，如果关闭 ssr 模式，那么会由 js 去加载
:::
