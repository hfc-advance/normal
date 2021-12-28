## 批量更新

### unstable_batchedUpdates

1. `setTimeout`中更新是同步的

```javascript title="渲染多次"
function Item() {
  const [num, setNum] = React.useState(1)
  function clickEvent() {
    // highlight-start
    setTimeout(() => {
      setNum(2)
      setNum(3)
    }, 0)
    // highlight-end
  }
  return <div onClick={clickEvent}>child {num}</div>
}
```

2. `Promise`中更新是同步的

```javascript title="请求数据完成后setState执行多次"
function Item() {
  console.log('child render')

  const [num, setNum] = React.useState(1)
  const [num1, setNum1] = React.useState(1)
  React.useEffect(() => {
    async function loadData() {
      await window.fetch(window.location.href)
      // 执行多次
      setNum(3)
      setNum1(2)
    }
    loadData()
  }, [])
  return (
    <div id='item'>
      child {num} {num1}
    </div>
  )
}
```

3、原生 DOM 事件中更新是同步的

```javascript title="非react合成事件，直接绑定DOM事件setState执行多次"
function Item() {
  const [num, setNum] = React.useState(1)
  React.useEffect(() => {
    document.querySelector('#item')?.addEventListener('click', () => {
      setNum(2)
      setNum(6)
    })
  }, [])
  return <div id='item'>child {num}</div>
}
```
