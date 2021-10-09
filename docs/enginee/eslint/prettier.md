---
id: eslintPrettier
title: prettier
hide_title: true
sidebar_label: .prettierrc
---

## 常用配置

```json
{
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "semi": false,
  "singleQuote": true,
  "trailingComma": "none",
  "bracketSpacing": true,
  "bracketSameLine": true,
  "jsxSingleQuote": true,
  "arrowParens": "avoid",
  "endOfLine": "lf"
}
```

## overrides 配置覆盖

> overrides 可以针对特殊拓展名，文件夹或者文件进行不同的配置

```json
{
  "semi": false,
  "overrides": [
    {
      "files": "*.test.js",
      "options": {
        "semi": true
      }
    },
    {
      "files": ["*.html", "legacy/**/*.js"],
      "options": {
        "tabWidth": 4
      }
    }
  ]
}
```

:::danger
`overrides.options` 下面的配置项只用添加和外层不一致的配置就可以了：

```json
{
  "arrowParens": "avoid",
  // highlight-next-line
  "endOfLine": "lf",
  "overrides": [
    {
      "files": [
        "*.js"
      ],
      "options": {
        "arrowParens": "always"
      }
    }
  ]
}
```

就比如上面的示例，`js` 文件设置了箭头函数参数总是带括号，但是没有设置换行符，会使用外面的 `endOfLine`的配置也就是全局的配置项。
:::

## 共享配置

```javascript title=".prettierrc.js"
module.exports = {
  ...require("@company/prettier-config"),
  semi: false
}
```

## parser 特殊文件解析器

> 通过 `overrides.options.parser` 可以让 `prettier` 支持无法解析的文件

```json
{
  "overrides": [
    {
      "files": ".prettierrc",
      "options": { "parser": "json" }
    }
  ]
}
```

## prettier 插件生态

> 插件功能的支持让prettier的功能更加强大和丰富，[prettier plugin](https://prettier.io/docs/en/plugins.html#using-plugins)

比如：

### [prettier-plugin-sort-imports自定义模块导入顺序](https://github.com/trivago/prettier-plugin-sort-imports)

可以自定义模块导入顺序

![import-sort](/img/import-sort.gif)

```shell
npm install --save-dev @trivago/prettier-plugin-sort-imports
```

```javascript
module.exports = {
  "printWidth": 80,
  "tabWidth": 4,
  "trailingComma": "all",
  "singleQuote": true,
  "jsxBracketSameLine": true,
  "semi": true,
  "importOrder": ["^@core/(.*)$", "^@server/(.*)$", "^@ui/(.*)$", "^[./]"],
  "importOrderSeparation": true,
}
```

## 注意事项

> 建议安装编辑器插件，而且开启`保存自动格式化功能`。

建议安装插件：

```json title=".vscode/extension.json"
{
  "recommendations": [
    "esbenp.prettier-vscode"
  ]
}
```

保存自动格式化配置：

```json title=".vscode/settings.json"
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  // highlight-start
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
  }
  // highlight-end
}
```

:::danger

- 如上图所标示的，需要设置每种语言的配置，要不然可能不生效。
- 支持的语言有：

  ```javascript
  javascript
  javascriptreact
  typescript
  typescriptreact
  json
  graphql
  ...
  ```

:::
