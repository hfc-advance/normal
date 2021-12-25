## useEffect

:::danger 心智模型

1. 每一次渲染都有它自己的…所有，包括 prop、state、effect。
2. useEffect 应该以目的的角度去思考，而不是过程(第一次渲染或者什么时机)：React 本质上根据现在的 prop 和 state 同步 DOM，我们应该以同样的角度去思考 useEffect：useEffect 使你能够根据 props 和 state 同步 DOM 之外的东西。

```javascript
function Greeting({name}) {
  useEffect(() => {
    document.title = 'Hello, ' + name
  }, [name])
  return <h1 className='Greeting'>Hello, {name}</h1>
}
```

保证浏览器的标题始终和 name 同步，而不是思考第一次渲染的时候设置浏览器标题

:::

```javascript title="基本用法"
useEffect(function effectEvent() {
  ...
  return function clearEffect() {
    ...
  }
}, [dependProp1, dependProp2])
```

### useEffect 执行过程

1. 绘制 UI 到屏幕
2. 执行副作用函数 effectEvent
3. 执行清除副作用的函数 clearEffect (清除上一次的渲染的副作用，第一次渲染不会执行)
