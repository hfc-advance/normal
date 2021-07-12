---
id: reactUseReducer
title: react useReducer
hide_title: true
sidebar_label: useReducer
---

## 基础使用

它接收一个形如 `(state, action) => newState` 的 方法，并返回当前的 `state` 以及与其配套的 `dispatch` 方法：

```jsx
/**
 * initialArg：初始状态
 * init：可选值，是个方法可以格式化初始值
 */
const [state, dispatch] = useReducer(reducer, initialArg, init)
```

用法：

```jsx
const initialState = {count: 0};

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
    </>
  );
}
```

## dispatch 传递函数

形式如：

```jsx
const [state, setState] = useState({});
setState(prevState => {
  return prevState + 1
});
```

```jsx {3, 11}
const countReducer = (state, action) => ({
  ...state,
  ...action(state)
})

function Counter({initialCount = 0, step = 1}) {
  const [state, dispatch] = React.useReducer(countReducer, {
    count: initialCount,
  })

  const increment = () => dispatch(currentState => ({count: currentState.count + step}))
  return <button onClick={increment}>{count}</button>
}
```

## 封装异步请求

### 1. 申明异步状态 reducer

```jsx
function asyncReducer(state, action) {
  switch (action.type) {
    case 'pending': {
      return {status: 'pending', data: null, error: null}
    }
    case 'resolved': {
      return {status: 'resolved', data: action.data, error: null}
    }
    case 'rejected': {
      return {status: 'rejected', data: null, error: action.error}
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}
```

### 2. hook 封装 promise 和 reducer

```jsx
function useAsync(initialState) {
  const [state, dispatch] = React.useReducer(asyncReducer, {
    status: 'idle',
    data: null,
    error: null,
    ...initialState,
  })

  const {data, error, status} = state

  const run = React.useCallback(promise => {
    dispatch({type: 'pending'})
    promise.then(
      data => {
        dispatch({type: 'resolved', data})
      },
      error => {
        dispatch({type: 'rejected', error})
      },
    )
  }, [])

  return {
    error,
    status,
    data,
    run,
  }
}
```

### 3. 使用 hook 返回的方法和 state

```jsx
function PokemonInfo({pokemonName}) {
  const {data: pokemon, status, error, run} = useAsync({
    status: pokemonName ? 'pending' : 'idle',
  })

  React.useEffect(() => {
    if (!pokemonName) {
      return
    }
    run(fetchPokemon(pokemonName))
  }, [pokemonName, run])

  if (status === 'idle') {
    return 'Submit a pokemon'
  } else if (status === 'pending') {
    return <PokemonInfoFallback name={pokemonName} />
  } else if (status === 'rejected') {
    throw error
  } else if (status === 'resolved') {
    return <PokemonDataView pokemon={pokemon} />
  }

  throw new Error('This should be impossible')
}
```
