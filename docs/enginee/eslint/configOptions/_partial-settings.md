## settings

> 共享参数：会传递给每个规则项的，会当做参数传递过去，但用不用，就是具体规则的事情

```jsx
module.exports = {
  settings: {
    'import/resolver': {
        node: {
          extensions: ['.tsx', '.ts', '.js', '.json']
        },
        alias: {
          map: [['@', './src/']]
        },
        typescript: {}
      }
  }
}
```

其实这里就是给每个 `ESLint` 规则 传递一个 `import/resolver` 参数，值是个对象，别的插件可能用不上，但是被 `eslint-plugin-import` 用上了
