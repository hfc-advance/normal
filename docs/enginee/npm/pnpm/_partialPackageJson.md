## package.json

### pnpm.overrides

> 主要用来覆盖任何依赖：强制所有的`packages`使用单个版本的依赖项。

```json
{
  "pnpm": {
    "overrides": {
      // 强制当前项目所有eslint的依赖都是用7.0.0版本
      "eslint": "^7.0.0",
      // 强制@anijs/eslint-config包下面的typescript依赖项用4.0.0版本
      "@anijs/eslint-config>typescript": "^4.0.0"
    }
  }
}
```

:::danger 用处

- 解决`lerna`和`pnpm workspace`不兼容的问题

  ```json title="package.json"
  {
    "dependencies": {
      "@anijs/eslint-config-typescript": "workspace:*"
    }
  }
  ```

  `pnpm`通过`workspace:*`来解决本地包之间的依赖问题，但是`lerna`识别不了这种语法，这时候就可以通过设置`pnpm.overrides`来解决本地包的依赖问题：

  ```json title="package.json"
  {
    "dependencies": {
      "@anijs/eslint-config-typescript": "^1.0.0"
    },
    "pnpm": {
      "overrides": {
        "@anijs/eslint-config-typescript": "workspace:*"
      }
    }
  }
  ```

:::
