## forwardRef

> react 组件默认只能接受 prop，也就是所有的属性都会合并成一个 prop 对象，forwardRef 方法可以将一个定义成可以接受 ref 参数的组件

```javascript title="默认组件"
function Button(props) {
  return (
    <div>
      {props.prop1}
      {props.prop3}
    </div>
  )
}

;<Button prop1={1} prop3={3} />
```

```javascript title="forwardRef组件"
const FancyButton = forwardRef(function Button(props, ref) {
  return (
    // 父组件可以拿到子组件
    // highlight-next-line
    <div ref={ref}>
      {props.prop1}
      {props.prop3}
    </div>
  )
})

<FancyButton ref={parentRef} />
```
