---
id: webpackAssetModule
title: Asset Module
hide_title: true
sidebar_label: Asset Module
---

### 简介

资源模块(`asset module`)是一种模块类型，它允许使用资源文件（字体，图标等）而无需配置额外 `loader`。

在 `webpack 5` 之前，通常使用：

- `raw-loader` 将文件变成字符串内联。

- `url-loader` 将文件变成 `data url` 内联。

- `file-loader` 将文件弄到输出目录。

### asset/resource

发送一个单独的文件并导出 `URL`。之前通过使用 `file-loader` 实现。

```json {6} title = "webpack config"

{
  "rules": [
    {
      "test": "/\.(?:ico|gif|png|jpg|jpeg)$/i",
      "type": "asset/resource"
    }
  ]
}
```

```javascript
import favicon from './images/favicon.png'

favicon // a1af828b4e65d37668e1.png
```

### asset/inline

导出一个资源的 `data URI`。之前通过使用 `url-loader` 实现。

```json {6} title = "webpack config"

{
  "rules": [
    {
      "test": "/\.(?:ico|gif|png|jpg|jpeg)$/i",
      "type": "asset/inline"
    }
  ]
}
```

```javascript
import favicon from './images/favicon.png'

favicon // data:image/png;base64,iVBORw0KGgoAAAANSUhEU...
```

### asset/source

到处资源的源代码。之前通过 `raw-loader`来实现。

### asset

导出一个 `data URI` 和发送一个单独的文件之间自动选择。之前通过使用 `url-loader`，并且配置资源体积限制实现。

:::warning
- `webpack` 将按照默认条件，自动地在 `resource` 和 `inline` 之间进行选择：小于 `8kb` 的文件，将会视为 `inline` 模块类型，否则会被视为 `resource` 模块类型。
  - 可以通过 `Rule.parser.dataUrlCondition.maxSize`来修改这个配置。

    ```javascript {16}

    module.exports = {
      entry: './src/index.js',
      output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
      },
      module: {
        rules:
        [
          {
            test: /\.txt/,
            type: 'asset',
            parser: {
              dataUrlCondition: {
                maxSize: 4 * 1024 // 4kb
              }
            }
          }
        ]
      },
    };
    ```
  - 也可以是一个方法 `function (source, { filename, module }) => boolean`，返回 `true`, `webpack` 将模块作为一个 `Base64` 编码的字符串注入到包中， 否则模块文件会被生成到输出的目标目录中。

    ```javascript
    module.exports = {
      //...
      module: {
        rules: [
          {
            //...
            parser: {
              dataUrlCondition: (source, { filename, module }) => {
                const content = source.toString();
                return content.includes('some marker');
              }
            }
          }
        ]
      }
    };

  ```

:::

:::warning

- 如果在`webpack5`中使用`loader`来处理模块，需要将`asset type`设置成`javascript/auto`，否则会导致多次处理，有可能产生`asset`重复。

  ```javascript {16}

  module.exports = {

    module: {
      rules: [
          {
            test: /\.(png|jpg|gif)$/i,
            use: [
              {
                loader: 'url-loader',
                options: {
                  limit: 8192,
                }
              },
            ],
            type: 'javascript/auto'
          },
      ]
    },
  }
  ```

- 使用`loader`处理的时候，会对`URL`的模块产生影响

  ```javascript
  new URL('./images/favicon.png', import.meta.url) // http://localhost:8080/[object%20Module]
  ```

  - 可以使用 `dependency: { not: ['url'] }` 配置解决

    ```javascript {16}

    module.exports = {
      module: {
        rules: [
            {
              test: /\.(png|jpg|gif)$/i,
              use: [
                {
                  loader: 'url-loader',
                  options: {
                    limit: 8192,
                  }
                },
              ],
              type: 'javascript/auto'
              dependency: { not: ['url'] },
            },
        ]
      },
    }
    ```

  - 不使用 `loader`， 使用内置`type: asset` 不存在这样的问题。

:::

### 定义输出的文件名

默认情况下，`asset/resource` 模块以 `[hash][ext][query]` 文件名发送到输出目录。有两种方式自定义输出文件名

- `output.assetModuleFilename`

```javascript {6}
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: 'images/[hash][ext][query]'
  },
  module: {
    rules: [
      {
        test: /\.png/,
        type: 'asset/resource'
      }
    ]
  },
};
```

- `Rule.generator.filename`

```javascript {13}
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.png/,
        type: 'asset/resource',
        generator: {
          filename: 'static/[hash][ext][query]'
        }
      }
    ]
  },
};
```

### URL 资源

当使用 `new URL('./path/to/asset', import.meta.url)`，`webpack` 也会创建资源模块，编译到输出目录。

```javascript title="src/index.js"
const logo = new URL('./logo.svg', import.meta.url);
```

根据你配置中 `target` 的不同，`webpack` 会将上述代码编译成不同结果：

```javascript
// target: web
new URL(__webpack_public_path__ + 'logo.svg', document.baseURI || self.location.href);

// target: webworker
new URL(__webpack_public_path__ + 'logo.svg', self.location);

// target: node, node-webkit, nwjs, electron-main, electron-renderer, electron-preload, async-node
new URL(__webpack_public_path__ + 'logo.svg', require('url').pathToFileUrl(__filename));
```
