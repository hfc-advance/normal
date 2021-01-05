---
id: typescriptBseconfig
title: ts基础配置
hide_title: true
sidebar_label: 基础配置
---

## babel-typescript

使用`babel`去处理`typescript`。参考[TypeScript-Babel-Starter](https://github.com/microsoft/TypeScript-Babel-Starter)

1. 首先安装必须的`npm`包

```json
"devDependencies": {
    "@babel/cli": "^7.8.3",
    "@babel/core": "^7.8.3",
    "@babel/plugin-proposal-class-properties": "^7.8.3",
    "@babel/preset-env": "^7.8.3",
    "@babel/preset-typescript": "^7.8.3",
    "typescript": "^3.7.5"
}
```

2. 然后创建`tsconfig.json`

```shell
tsc --init --declaration --allowSyntheticDefaultImports --target esnext --outDir lib
```

3. 创建`.babelrc`文件

```json
{
    "presets": [
        "@babel/env",
        "@babel/typescript"
    ],
    "plugins": [
        "@babel/proposal-class-properties"
    ]
}
```

4. 最后创建`webpack.config.js`

```javascript
const path = require('path')

module.exports = {
    // Change to your "entry-point".
    entry: './src/index',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.bundle.js'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json']
    },
    module: {
        rules: [{
            // Include ts, tsx, js, and jsx files.
            test: /\.(ts|js)x?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
        }],
    }
}
```

## google/gts

[![gts](https://img.shields.io/github/stars/google/gts?label=gts&style=social)](https://github.com/google/gts)

谷歌`typescript`风格，包括了各种应用：

- 初始化`tsconfig.json`

```javascript
npx gts init
```

- `check`
- `fix`
- `clean`
- `compile`
- `pretest`
