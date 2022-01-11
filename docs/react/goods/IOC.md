---
id: reactIOC
title: react 控制反转
hide_title: true
sidebar_label: 控制反转（IOC）
---

## 理解控制反转

通俗点理解：library 本来是供使用者调用的，但是 library 反过来调用使用者的代码来实现某个功能

> 1. 模块间的依赖应该都是通过`抽象`发生的，高层定义好依赖的抽象，然后低层去实现这个抽象
> 2. 封装的模块应该做更少的事情，具体的事情应该是使用者去做
> 3. 具体业务使用抽象的时候，应该基于抽象再封装一下这个业务具体要做的事情

> 当依赖的是模块的具体实现之后，就会发生：如果低层的其中一层发生了变动，那么他的所有上层都需要发生变动，如果高层依赖的是抽象接口，那么低层只要这个抽象的接口不动，高层就能正常使用。

举例，比如现在要封装一个`过滤数组中包含undefined和null数据`方法：

```javascript
function filter(array) {
  let newArray = []
  for (let index = 0; index < array.length; index++) {
    const element = array[index]
    // 排除undefine和null
    // highlight-next-line
    if (element !== null && element !== undefined) {
      newArray[newArray.length] = element
    }
  }
  return newArray
}
filter([0, 1, undefined, 2, null, 3, 'four', ''])
```

有一天需求变了，还要`空字符串数据`

```javascript title="加强了封装，添加一些配置选项"
function filter(
  array,
  {filterNull = true, filterUndefined = true, filterZero = false, filterEmptyString = false} = {}
) {
  let newArray = []
  for (let index = 0; index < array.length; index++) {
    const element = array[index]
    if (
      (filterNull && element === null) ||
      (filterUndefined && element === undefined) ||
      (filterZero && element === 0) ||
      (filterEmptyString && element === '')
    ) {
      continue
    }

    newArray[newArray.length] = element
  }
  return newArray
}
```

上面的封装虽然实现了功能，但是哪一天如果需求变了，又要过滤其他数据，而你封装的是一个 library，那你需要更改代表然后发包供使用者使用。

最佳实践：

```javascript title="library提供少的功能，抽象具体的逻辑，让使用者去做具体的逻辑"
function filter(array, filterFn) {
  let newArray = []
  for (let index = 0; index < array.length; index++) {
    const element = array[index]
    // 使用者去做具体的过滤数据逻辑
    // highlight-next-line
    if (filterFn(element)) {
      newArray[newArray.length] = element
    }
  }
  return newArray
}

filter([0, 1, undefined, 2, null, 3, 'four', ''], el => el !== null && el !== undefined)
```

## react 中实现控制反转

### render props

> 接收一个 prop 是 function 而且这个 function 返回一个组件，父组件调用这个 function 渲染 function 的返回结果

```jsx title="Child组件直接固定写在Parent组件中"
function Parent() {
  return (
    <>
      <Child {...prop} />
    </>
  )
}

function Child() {
  return <div>child</div>
}
```

```jsx title="Parent不直接依赖Child组件，而是依赖一个children的属性方法，是一个抽象"
function Parent(props) {
  return <>{props.children(props)}</>
}

function App() {
  return <Parent>{parentProps => <div {...parentProps}>child</div>}</Parent>
}
```

### Compound Components 复合组件

> 多个组件组合在一起完成一项功能，比如`Select和Option`

```javascript title="Select最初设计思路，需要的数据都通过prop传递"
function App() {
  return (
    <Select
      items={[
        {contents: 'Download', onSelect: () => alert('Download')},
        {contents: 'Create a Copy', onSelect: () => alert('Create a Copy')},
        {contents: 'Delete', onSelect: () => alert('Delete')}
      ]}
    />
  )
}
```

如果有个下拉框需要`disable`，那么需要修改 items 的配置数据，导致所有的组件都重新渲染一遍，再比如需求变了：每个选项 hover 上去需要有个`popver`气泡提示，那么又需要修改代码

```javascript title="复合组件：把渲染逻辑的控制权交给调用者，每个Option怎么展示自己控制，状态在组件之间通过context隐式同享"
function App() {
  return (
    <MenuList>
      <MenuItem onSelect={() => alert('Download')}>Download</MenuItem>
      <MenuItem onSelect={() => alert('Copy')}>Create a Copy</MenuItem>
      <MenuItem onSelect={() => alert('Delete')}>Delete</MenuItem>
    </MenuList>
  )
}
```

### state reducer

> 自定义 hook 中，允许使用者传递一个 reducer 直接操控 hook 的状态，[`The State Reducer Pattern with React Hooks`](https://kentcdodds.com/blog/the-state-reducer-pattern-with-react-hooks)

```javascript
import * as React from 'react'
import ReactDOM from 'react-dom'
import Switch from './switch'

const actionTypes = {
  toggle: 'TOGGLE',
  on: 'ON',
  off: 'OFF'
}

function toggleReducer(state, action) {
  switch (action.type) {
    case actionTypes.toggle: {
      return {on: !state.on}
    }
    case actionTypes.on: {
      return {on: true}
    }
    case actionTypes.off: {
      return {on: false}
    }
    default: {
      throw new Error(`Unhandled type: ${action.type}`)
    }
  }
}

function useToggle({reducer = toggleReducer} = {}) {
  // 使用者传递reducer操控state
  // highlight-next-line
  const [{on}, dispatch] = React.useReducer(reducer, {on: false})

  const toggle = () => dispatch({type: actionTypes.toggle})
  const setOn = () => dispatch({type: actionTypes.on})
  const setOff = () => dispatch({type: actionTypes.off})

  return {on, toggle, setOn, setOff}
}

function Toggle() {
  const [clicksSinceReset, setClicksSinceReset] = React.useState(0)
  const tooManyClicks = clicksSinceReset >= 4

  const {on, toggle, setOn, setOff} = useToggle({
    reducer(currentState, action) {
      const changes = toggleReducer(currentState, action)
      if (tooManyClicks && action.type === actionTypes.toggle) {
        // other changes are fine, but on needs to be unchanged
        return {...changes, on: currentState.on}
      } else {
        // the changes are fine
        return changes
      }
    }
  })

  return (
    <div>
      <button onClick={setOff}>Switch Off</button>
      <button onClick={setOn}>Switch On</button>
      <Switch
        onClick={() => {
          toggle()
          setClicksSinceReset(count => count + 1)
        }}
        on={on}
      />
      {tooManyClicks ? <button onClick={() => setClicksSinceReset(0)}>Reset</button> : null}
    </div>
  )
}

function App() {
  return <Toggle />
}

ReactDOM.render(<App />, document.getElementById('root'))
```
