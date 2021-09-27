## overrides

> 针对个别文件设置新的检查规则

```jsx
module.exports = {
  overrides: [
    {
      files: ["lib/**/*.runtime.js", "hot/*.js"],
      env: {
        es6: false,
        browser: true
      },
        globals: {
        Promise: false
      },
      parserOptions: {
        ecmaVersion: 5
      }
    }
  ]
}
```
