## extends

`extends` 支持以下几种类型：

- `eslint` 开头的：是 `ESLint` 官方的扩展：

    ```jsx
    module.exports = {
      extends: [
        'eslint:recommended'
      ]
    }
    ```

- `plugin` 开头的：使用插件里面定义的规则结合

    ```jsx
    module.exports = {
      plugins: [
        'react'
      ]
      extends: [
        'plugin:react/recommended'
      ]
    }
    ```

    插件下面定义的规则集合是通过 `configs` 来定义的

    ```jsx
    module.exports = {
      deprecatedRules,
      rules: allRules,
      configs: {
        // 可以通过：plugin:react/recommended 来使用
        recommended: {
          rules: {...}
        },
        // 可以通过：plugin:react/all 来使用
        all: {
          rules: activeRulesConfig
        },
        // 可以通过：plugin:react/jsx-runtime 来使用
        'jsx-runtime': {
          rules: {
            'react/react-in-jsx-scope': 0,
            'react/jsx-uses-react': 0
          }
        }
    }
    ```

  - `eslint-config-x` 或者 `@cope/eslint-config-x` ：是来至 `npm` 包自定义规则的

    ```jsx
    module.exports = {
      extends: [
        'react',
        'eslint-config-react',
        '@vue/vue',
        '@vue/eslint-config-vue'
      ]
    }
    ```
