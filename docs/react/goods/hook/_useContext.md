## useContext

:::danger 特点

- context 里面包含多个数据，任意数据发生变化，都会导致订阅了这个 context 的组件发生渲染

:::

```javascript title="基本使用"
// highlight-next-line
const ThemeContext = React.createContext(themes.light)
function App() {
  return (
    // highlight-next-line
    <ThemeContext.Provider value={themes.dark}>
      <Toolbar />
    </ThemeContext.Provider>
  )
}
function ThemedButton() {
  // highlight-next-line
  const theme = useContext(ThemeContext)
  return (
    <button style={{background: theme.background, color: theme.foreground}}>
      I am styled by theme context!
    </button>
  )
}
```
