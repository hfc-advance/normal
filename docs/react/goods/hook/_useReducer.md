## useReducer

```javascript
const initialState = {count: 0}

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1}
    case 'decrement':
      return {count: state.count - 1}
    default:
      throw new Error()
  }
}

const [state, dispatch] = useReducer(reducer, initialState)
```

```javascript title="惰性初始化state：调用initMethod(initialState) 返回初始化数据"
const [state, dispatch] = useReducer(reducer, initialState, initMethod)
```
