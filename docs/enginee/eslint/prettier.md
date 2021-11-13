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

## prettier和eslint结合

>要想`prettier`和`eslint`不冲突，必须做到：`eslint-plugin-prettier` 以及 `eslint-config-prettier` 结合使用。

### eslint-plugin-prettier

> 插件主要是用来找出错误：这里的错误指的是不符合 `.prettierc` 配置的规则错误，因为默认 `ESLint` 根本就不识别 `.prettierc` 配置，所以需要 `ESLint` 插件来标记错误：插件的工作原理是先调用 `Prettier` 对你的代码进行格式化，然后会把格式化前后不一致的地方进行标记，通过配置 `'prettier/prettier': 'error'` 此条规则会将标记地方进行 `error` 级别的报错提示，然后可以通过 `ESLint` 的 `--fix` 自动修复功能将其修复。
>

```jsx
module.exports = {
  plugins: [
    // eslint-plugin-prettier
    'prettier'
  ],
  rules: {
    'prettier/prettier': 'error'
  }
}
```

插件内置了 `recommended` 的配置其实也就只有三项：

```jsx
module.exports = {
  configs: {
    recommended: {
      extends: ['prettier'],
      plugins: ['prettier'],
      rules: {
        'prettier/prettier': 'error',
        'arrow-body-style': 'off',
        'prefer-arrow-callback': 'off'
      }
    }
  }
}
```

### eslint-config-perttier

> 光有检查错误还不够，要是发现了错误，但是这个错误和 `eslint` 里面的错误冲突了怎么办：解决冲突的思路就是通过将这个包提供的扩展放到 `extends` 最后面引入，然后将可能冲突的 `ESLint` 规则全部关闭掉。
> 

源码如下：

```jsx
module.exports = {
  rules: {
    // The following rules can be used in some cases. See the README for more
    // information. (These are marked with `0` instead of `"off"` so that a
    // script can distinguish them.)
    "curly": 0,
    "lines-around-comment": 0,
    "max-len": 0,
    "no-confusing-arrow": 0,
    "no-mixed-operators": 0,
    "no-tabs": 0,
    "no-unexpected-multiline": 0,
    "quotes": 0,
    "@typescript-eslint/quotes": 0,
    "babel/quotes": 0,
    "vue/html-self-closing": 0,
    "vue/max-len": 0,
    ...
  }
}
```

:::caution
其实可以看出这里有个问题：`eslint-config-prettier` 关闭了所有 `prettier` 能够设置的规则，而不是根据当前项目 `.prettierc` 配置文件里面的规则来覆盖，这样就会出现有些规则都不会检查的问题，因为关闭掉的规则，`.perttierc` 文件里面可能没有配置。
:::

所以当我们用了 `prettier` 配置就应该让 `prettierc` 文件配置完整，配置所有规则。