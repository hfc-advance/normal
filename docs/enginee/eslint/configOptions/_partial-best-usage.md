## 最佳用法

### .eslintrc.js添加语法提示

>通过`jsdoc`对`eslint`配置文件添加语法提示

```javascript
/** @type { import('eslint').Linter.Config } */
module.exports = {
  overrides: [...]
}
```

### vscode添加任意文件的风格检查

>比如添加了`jsonc-eslint-parser`解析器对`json`文件进行风格检查

```javascript
module.export = {
  overrides: [
     {
      files: ['*.json', '*.json5'],
      // highlight-next-line
      parser: 'jsonc-eslint-parser',
      rules: {
        quotes: ['error', 'double'],
        'quote-props': ['error', 'always'],
        'comma-dangle': ['error', 'never']
      }
    }
  ]
}
```

:::danger
`vscode`默认只对`js`语法文件比如`js,ts,jsx`等等文件添加语法检查，如果需要在`vscode`编辑器里面添加对别的类型文件进行风格检查，需要配置：

```json title=".vscode/settings.json"
{
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "html",
    "vue",
    "typescript",
    "typescriptreact",
    "json",
    "jsonc",
    "yml",
    "yaml"
  ]
}
:::
