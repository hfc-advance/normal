## key 的使用

组件在页面上多次渲染，每次都是独立的，不影响其他组件，是因为 React 会将状态存储在每个单独的实例中，当一个组件从页面上移走时，不会影响到其他组件。如果你渲染一个新的，它也不会影响现有的组件。

:::tip

key 可以控制组件的实例，当 key 被更换意味组件完全变更，将强迫 React 卸载这个组件，并重新挂载一个新的组件，这意味着当时存在于组件中的所有状态都被完全移除，而组件则被 "重新初始化"

:::

### 还原组件初始化状态

切换不同的 key，让组件重新挂载

```jsx live
function Contact() {
  const defaultValuesByTopic = {
    training: 'I would like some training',
    consulting: 'I have consulting needs',
    question: 'I have some questions'
  }

  const [topic, setTopic] = React.useState('training')

  return (
    <form>
      <label htmlFor='topic'>Topic</label>
      <select id='topic' value={topic} onChange={e => setTopic(e.target.value)}>
        <option value='training'>Training</option>
        <option value='consulting'>Consulting</option>
      </select>
      <label htmlFor='subject'>Email Subject</label>
      <input style={{width: '300px'}} id='subject' key={topic} defaultValue={defaultValuesByTopic[topic]} />
      <label htmlFor='body'>Email body</label>
    </form>
  )
}
```
