## useState

```javascript
const [state, setState] = useState(initialState)
```

```javascript title="1、访问旧的state"
setState(preState => {
  return newState
})
```

```javascript title="2、惰性初始化state"
// 重新渲染每次getState都会执行
const [state, setState] = useState(getState())

// 只会在第一次渲染组件的时候执行getState
const [state, setState] = useState(() => getState())
```

:::danger

1、组件重新渲染 setState 的引用始终不会变化，始终是同一个函数，所以 setState 传递给子组件不会引发重新渲染
:::
