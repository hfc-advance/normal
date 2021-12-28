## 避免子组件渲染

### 常量保存 JSX

```javascript
const txtElement = <div>title</div>
```

### useMemo 包裹组件

```javascript title="保证Son组件不是重新调用createElement重新生成的，那么所有Son组件的prop===oldProp"
function Parent(props) {
  const [count, setCount] = React.useState(0)
  // highlight-next-line
  const memorizedSon = useMemo(() => <Son title={props.title} />, [protps.title])
  return <div>{memorizedSon}</div>
}
```

### 通过 prop 传递 children jsx 直接渲染

```jsx title="✅：Parent组件的状态发生变化，Son组件不会重新渲染"
function Parent(props) {
  return (
    <div>
      // highlight-next-line
      {props.children}
    </div>
  )
}

function Top() {
  return (
    <Parent>
      <Son />
    </Parent>
  )
}
```

```jsx title="❎：Parent组件刷新，Son也会重新渲染"
function Parent(props) {
  return (
    <div>
      // highlight-next-line
      <Son />
    </div>
  )
}
```

### key 的选择

列表是静态的，没有筛选和过滤功能，不会`调整列表顺序`的时候，使用`index`标识会更有助于列表渲染

```html
<!-- 第一页的列表项虚拟 DOM -->
<li key="a">dataA</li>
<li key="b">dataB</li>
<li key="c">dataC</li>

<!-- 切换到第二页后的虚拟 DOM -->
<li key="d">dataD</li>
<li key="e">dataE</li>
<li key="f">dataF</li>
```

:::danger
切换到第二页后，由于所有 `<li>` 的 key 值不同，所以 Diff 算法会将第一页的所有 DOM 节点标记为删除，然后将第二页的所有 DOM 节点标记为新增。整个更新过程需要三次 DOM 删除、三次 DOM 创建。如果不使用 key，Diff 算法只会将三个 `<li>` 节点标记为更新，执行三次 DOM 更新
:::

### 按需更新

自定义 Hook 暴露多个状态，而调用方只关心某一个状态，那么其他状态改变就不应该触发组件重新 Render。

```javascript
function useLazyRender() {
  const dependenciesRef = useRef({info: false, count: true})

  return useMemo(() => {
    return Object.defineProperties(
      {},
      {
        info: {
          get: function () {
            // 收集组件依赖
            // highlight-next-line
            dependenciesRef.current.info = true
            return dataRef.current.info
          },
          enumerable: true
        },
        count: {
          get: function () {
            // 收集组件依赖
            // highlight-next-line
            dependenciesRef.current.count = true
            return dataRef.current.count
          },
          enumerable: true
        }
      }
    )
  }, [])
}
```

:::danger
按需更新主要通过两步来实现：[`查看示例`](https://codesandbox.io/s/hooks-anxugengxin-tinzp?file=/src/hooks.js:685-693)

1. 根据调用方使用的数据进行依赖收集，Demo 中使用 Object.defineProperties 实现。
2. 只在依赖发生改变时才触发组件更新。

:::

### 直接修改 DOM 样式

在涉及到样式需要同步的时候，可以采用非 state 同步的形式：

```javascript
function List() {
  const domRef = useRef(null)

  function clickEvent() {
    // 不通过state同步class和style，避免函数式组件重新执行
    // highlight-next-line
    domRef.current.style.transorm = `translate(100%)`
  }
  return <div ref={ref} onClick={clickEvent}></div>
}
```
