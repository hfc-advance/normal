## parserOptions

> parserOptions 是用来传递给 [parser](https://www.notion.so/eslint-b39395bffe8a47f8a78a89d413e601c7) 解析器使用的，所以自定义解析器的 parserOptions 配置项是不一样的。下面我们重点看下默认解析器的 parserOptions

```jsx
{
  // ESLint 默认解析器，也可以指定成别的
  parser: "espree",
  parserOption: {
     // 指定要使用的 ECMAScript 版本，默认值 5
    ecmaVersion: 5,
    // 设置为 script (默认) 或 module（如果你的代码是 ECMAScript 模块)
    sourceType: "script",
    // 这是个对象，表示你想使用的额外的语言特性,所有选项默认都是 false
    ecmafeatures: {
      // 是否允许在全局作用域下使用 return 语句
      globalReturn: false,
      // 是否启用全局 strict 模式（严格模式）
      impliedStrict: false,
      // 是否启用JSX
      jsx: false,
      // 是否启用对实验性的objectRest/spreadProperties的支持
      experimentalObjectRestSpread: false
    }
  }
}
```

### sourceType

> 大多数的情况下使用 `module` 形式，因为 `module` 形式兼容普通的 `js`，使用 `script` 则不兼容

如果想要针对个别文件特殊处理，可以使用：[配置文件层叠原则](https://www.notion.so/eslint-cc7b2c893e0e4c43b1fbb4cca1ef72ef)  或者 `overrides`

### 常用配置

```javascript
{
  // ESLint 默认解析器，也可以指定成别的
  parser: "espree",
  parserOption: {
    ecmaVersion: 6,
    // 设置为 script (默认) 或 module（如果你的代码是 ECMAScript 模块)
    sourceType: "module",
    // 这是个对象，表示你想使用的额外的语言特性,所有选项默认都是 false
    ecmafeatures: {
      // 是否启用全局 strict 模式（严格模式）
      impliedStrict: true,
      // 是否启用JSX
      jsx: true,
    }
  }
}
```
