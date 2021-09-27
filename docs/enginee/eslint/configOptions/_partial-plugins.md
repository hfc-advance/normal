## plugins

> 插件的目的就是为了增强 `ESLint` 能力和范围：`ESLint` 虽然可以定义很多的 `rules`，以及通过 `extends` 来引入更多的规则，但是说到底只是检查 `JS` 语法。如果需要检查 `Vue` 中的 `template` 或者 `React` 中的 `jsx`，以及 `Typescript`，就需要插件的支持了

配置插件有三种形式：

### eslint-plugin-xxx

可以省略掉 `eslint-plugin`

```jsx
module.exports = {
  plugins: [
    // 包名：eslint-plugin-react
    'react'
  ]
}
```

### @pkg/eslint-plugin-x

同样是可以省略掉 `eslint-plugin`

```jsx
module.exports = {
  plugins: [
    // 包名：@jquery/eslint-plugin-jquery
    '@jquery/query'
  ]
}
```

### @pkg/eslint-plugin

同样是可以省略掉 `eslint-plugin`

```jsx
module.exports = {
  plugins: [
    // 包名：@typescript-eslint/eslint-plugin
    '@typescript-eslint'
  ]
}
```
