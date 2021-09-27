## env

> 指定不同的环境可以给对应环境下提供预设的全局变量。比如说在 `browser` 环境下，可以使用 `window` 全局变量;在 `node` 环境下，可以使用 `process` 全局变量等

以下是常用的环境配置：

```jsx
module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true
  }
}
```

[完整的环境配置](https://eslint.bootcss.com/docs/user-guide/configuring#specifying-environments)

### 注意事项

- 支持 `ES6` 语法并不意味着同时支持新的 `ES6` 全局变量或类型，比如 `Set` 等新类型，所以 env 配置是必须的

    ```jsx
    module.exports = {
      parserOptions: {
        ecmaVersion: 6,
      },
      // 必须配置的
      env: {
        es6: true
      }
    }
    ```

- 当支持了 ES 对应的全局变量，就相当于支持了对应的 ES 语法，所以设置了 env.es6，就可以不用设置 parserOptions.ecmaVersion

  ```javascript
  module.exports = {
    // 相当于设置了parserOptions.ecmaVersion = 6
    env: {
      es6: true
    }
  }
  ```

依次类推：

- es2017：parserOptions.ecmaVersion 为 8
- es2020：parserOptions.ecmaVersion 为 11
- es2021：parserOptions.ecmaVersion 为 12
