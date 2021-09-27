## parser

`ESLint` 会对我们的代码进行校验，而 `parser` 的作用是将我们写的代码转换为 [ESTree](https://link.zhihu.com/?target=https%3A//github.com/estree/estree)，ESLint 会对 ESTree 进行校验。

> `ESTree` 只是一个 `AST` 的某一种规范，`ESTree` 本质上还是 `AST`。

:::caution
`ESLint` 默认使用 [Espree](https://github.com/eslint/espree) 作为其解析器，只能转换两种语法模式：

- **js**：只能处理标准性的语法
- **jsx**：需要配上 `parserOptions.ecmaFeatures.jsx`

所以需要解析别的语法规则就需要特殊而且与 `ESLint` 兼容的解析器：
:::

### esprima 处理js语法

`esprima` 和默认解析器一样，只是能解析 `js` 语法，只不过能兼容更多的 `jsx` 语法，很少场景使用。

### @babel/eslint-parser 处理所有的 babel code

> `ESLint`的核心规则不支持实验性语法，因此可能无法正常工作，@babel/eslint-parser 是允许 ESLint 在由 Babel 转换的源代码上运行的解析器，所以能处理所有 babel 支持的源代码。

### @typescript-eslint/parser 处理 typescript 语法

### 处理 react

react 其实用的是 jsx 语法，所以默认的 parser 就支持，但是由于 react 拓展了更多 jsx 语法，这些语法 默认的解析器是识别不了的，所以需要插件支持这些拓展语法：[eslint-plugin-react](https://github.com/yannickcr/eslint-plugin-react)

```jsx
module.exports = {
  env: {
    browser: true,
    es2021: false,
    node: true
  },
  extends: [
    'plugin:react/recommended'
  ],
  // react不需要单独的解析器
  parser: '@typescript-eslint/parser',
  plugins: ['react', '@typescript-eslint'],
  parserOptions: {
    ecmaFeatures: {
      impliedStrict: true,
      // 设置支持 jsx 就可以了
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  }
}
```

### 处理 vue

`vue` 的 `template` 语法也是特殊的语法，所以需要特殊的解析器，`vue` 官方的 [vue-eslint-parser](https://github.com/vuejs/vue-eslint-parser/blob/master/docs/ast.md)

### 注意事项

- `parser` 全局只有一个

  当自定义的 eslintrc 文件配置了 parser，那么这个优先级是最高的，会覆盖掉 extends 里面配置的 parser，也就是下面的优先级顺序：

  1. `eslintrc` 配置的 `parser`
  2. `extends` 配置的 `parser`
  3. 默认的 `parser`