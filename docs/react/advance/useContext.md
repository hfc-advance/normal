---
id: reactContext
title: react context
hide_title: true
sidebar_label: context
---

## 1. 基础用法

```jsx
// 1. 创建一个context
const MyContext = React.createContext({ height: 180 });

// 2. 创建一个使用的上下文
function Parent() {
  const [val, setVal] = React.useState({ height: 182 })
  return (
    <MyContext.Provider value={val}>
    </MyContext.Provider>
  )
}

// 3. 消费context
function Child() {
  const val = React.useContext(MyContext)
}
```

## 2. 自定义 hook 封装 context

为了方便使用时候的便利，可以将 `context` 封装到自定义 `hook` 中

```jsx
// 1. 创建一个顶层组件
const HistoryContext = React.createContext(null)
function History(prop) {
  return (
    <HistoryContext.Provider>
      {prop.children}
    </HistoryContext.Provider>
  )
}

// 2. 创建一个自定义hook
function useHistory() {
  const history = React.useContext(HistoryContext)

  return history
}
```

使用顶层组件和 `hook` 提取数据：

```tsx {3,5,10}
function App() {
  return (
    <History>
      <Item />
    </History>
  )
}

function Item() {
  const history = useHistory()

  return <div>{history.location.path}</div>
}
```

## 3. 传送 setState，避免一层一层传递

```jsx {3-6,13,19}
const TodosDispatch = React.createContext(null);
// 对外暴露hook
function useDispatch() {
  const dispatch = React.useContext(TodosDispatch)
  return dispatch
}

function TodosApp() {
  const [todos, dispatch] = useReducer(todosReducer);

  return (
    <TodosDispatch.Provider value={dispatch}>
      <DeepTree todos={todos} />
    </TodosDispatch.Provider>
  );
}

function DeepTree() {
  const dispatch = useDispatch()

  return ...
}
```

:::success

1. `useState的setState` 和 `useReducer的dispatch` 每次 `render` 能够保证引用是不变的，所以通过 `context` 传递是不会引发重新渲的
2. 自定义 `hook` 封装 `context` 的时候，就可以有两种形式：

- 当不需要订阅 `state` 的时候，类似 `recoil` 的 `useSetRecoilState(state)`，即使状态发生变更，也不需要触发组件渲染：就如上面的代码所示
- 另外一种就是需要订阅 `state` 变更，触发渲染，只需要传递 `value` 的时候，同时传递 `state`：

  ```tsx {3,7}
  function useDispatch() {
    const [state, dispatch] = React.useContext(TodosDispatch)
    return [state, dispatch]
  }

  function TodosApp() {
    const [todos, dispatch] = useReducer(todosReducer)

    return (
      <TodosDispatch.Provider value={[todos, dispatch]}>
        <DeepTree todos={todos} />
      </TodosDispatch.Provider>
    )
  }
  ```

:::
