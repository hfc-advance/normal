## babel的优点

> 虽然`babel`和`tsc`都能够转译代码，但是`babel`能够涵盖更广泛的场景，并且能够微调生成的代码。

### 覆盖的场景更广泛

- 针对浏览器优化构建。

  使用`babel + babel-preset-env + browserlists`，可以更好的控制转译的目标，比如可以定位`IE11`以上所有的浏览器，但是`tsc`就只能转译成特定`es`标准的代码

  ```json
  {
    "compilerOptions": {
      "target": "ESNext"
    }
  }
  ```

### 丰富的插件生态

- 删除开发时特定的指令，生成一个优化的生产包

  ```javascript
  if (__DEV__) {
    console.log('foo');
  }
  ```

- 优化代码，比如通过插件可以将`lodash`全部导入更改为`lodash-es`按需导入的代码

### polyfill自动注入

利用`useBuiltIns: usage`编译器可以自动根据代码使用到语法添加需要的`polyfill`

```javascript
{
  "presets": [
    [
      "@babel/env",
      {
        "targets": {
          "edge": "17",
          "firefox": "60",
          "chrome": "67",
          "safari": "11.1"
        },
        // highlight-start
        "useBuiltIns": "usage",
        "corejs": "3.6.5"
        // highlight-end
      }
    ]
  ]
}
```

:::danger
`ts编译器`需要手动为每个文件导入`polyfill`
:::