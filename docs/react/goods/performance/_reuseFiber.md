## 避免子组件渲染

### 复用 Fiber

```javascript title="1、用变量保存JSX"
const txtElement = <div>title</div>
```

```jsx title="2、通过children渲染，不挂载Component"
function Son() {
  return <div>Son</div>
}
function Parent(props) {
  const [count, setCount] = React.useState(0)

  return (
    <div
      onClick={() => {
        setCount(count + 1)
      }}>
      点击 {count}
      {/* 通过children渲染而不是直接挂载Son组件 */}
      // highlight-next-line
      {props.children}
    </div>
  )
}

;<Parent>
  <Son />
</Parent>
```
