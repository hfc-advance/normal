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

```javascript title="设置空的依赖：代表不需要同步任何prop和state，所以始终只会执行一次"
useEffect(() => {}, [])
```

```javascript title="没有设置依赖：默认代表依赖所有的prop和state，所以每次渲染都会执行"
useEffect(() => {})
```

### useEffect 执行过程

1. 绘制 UI 到屏幕
2. 执行先前一次渲染的清除副作用的函数 clearEffect (清除上一次的渲染的副作用，第一次渲染不会执行)

:::tip
假设第一次渲染的时候 props 是{id: 10}，第二次渲染的时候是{id: 20}

- React 渲染{id: 20}的 UI。
- 浏览器绘制。我们在屏幕上看到{id: 20}的 UI。
- React 清除{id: 10}的 effect。
- React 运行{id: 20}的 effect。

:::

3. 执行副作用函数 effectEvent

### 移除 useEffect 的依赖

```javascript title="1、让useEffect自给自足"
useEffect(() => {
  const timer = setInterval(() => {
    setCount(count + 1)
  }, 1000)
}, [count])

// 利用useState访问旧的state，达到不直接依赖state的目的
useEffect(() => {
  const timer = setInterval(() => {
    setCount(count => count + 1)
  }, 1000)
}, [])
```

```javascript title="2、虽然reducer函数每次都在渲染时重新生成，但是state参数的值始终是执行时最新的"
function Counter({step}) {
  const [count, dispatch] = useReducer(reducer, 0)

  // 内联reducer函数
  function reducer(state, action) {
    if (action.type === 'tick') {
      // 同时依赖state和prop
      // highlight-next-line
      return state + step
    } else {
      throw new Error()
    }
  }

  useEffect(() => {
    const id = setInterval(() => {
      dispatch({type: 'tick'})
    }, 1000)
    return () => clearInterval(id)
  }, [dispatch])

  return <h1>{count}</h1>
}
```
