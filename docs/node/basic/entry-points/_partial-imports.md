> `imports` - 用来定义内部模块的映射，可以理解为别名

```json
{
  "name": "@anijs/prettier",
  "imports": {
    "#dep": {
      "import": "dep-node-native",
      "require": "./dep-polyfill.js"
    }
  }
}
```

这样就可以直接通过`#dep`映射对应的模块：

```javascript
import dep from '#dep' //相当于加载dep-node-native
```

:::danger

- 映射名称必须始终以 `#` 开头
- `imports`和规范无关也就是不论`CommonJS`还是`ES Module`规范都支持。

:::
