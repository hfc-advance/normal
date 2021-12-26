## useReducer

:::danger

- dispatch 每次渲染都不会变化，始终是一个引用，当 prop 传递的时候，不会触发渲染

:::

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

### 结合 useContext 传递 dispatch

```jsx
const TodosDispatch = React.createContext(null);
function useDispatch() {
  const dispatch = React.useContext(TodosDispatch)
  return dispatch
}

function TodosApp() {
  const [todos, dispatch] = useReducer(todosReducer);

  return (
    // 传递dispatch
    // highlight-next-line
    <TodosDispatch.Provider value={dispatch}>
      <DeepTree todos={todos} />
    </TodosDispatch.Provider>
  );
}

function DeepTree() {
  // 子组件调用父级的dispatch
  // highlight-next-line
  const dispatch = useDispatch()

  return ...
}
```

### context 高级封装

> 所有关于同一个 context 的操作都放到一个文件

```javascript
import React from 'react'

const CurrencyContext = React.createContext(null)

// 1. 暴露提取数据的hook
const useCurrency = () => React.useContext(CurrencyContext)

// 2. 高阶组件包裹一下，通过prop提取数据
const withCurrency = Component => props => {
  const currency = useCurrency()

  return <Component {...props} currency={currency} />
}

// 3. 直接暴露Provider
const CurrencyProvider = ({value, children}) => {
  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>
}
// 4. 关联的常量数据
const CURRENCIES = {
  Euro: {
    code: 'EUR',
    label: 'Euro',
    conversionRate: 1 // base conversion rate
  },
  Usd: {
    code: 'USD',
    label: 'US Dollar',
    conversionRate: 1.19
  }
}
export {CurrencyProvider, useCurrency, withCurrency, CURRENCIES}
```
