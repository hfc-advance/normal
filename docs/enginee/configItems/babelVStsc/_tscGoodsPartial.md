## tsc的优点

### 类型检查

> babel没有类型检查，tsc可以在不编译代码的情况检查代码，而且这样速度非常快

```shell
tsc --noEmit
```

```json
{
  "compilerOptions": {
    "noEmit": true
  }
}
```

### 生成.d.ts类型定义文件

```json
"compilerOptions": {
  // 生成.d.ts
  "declaration": true,
  // 仅仅生成.d.ts，不编译代码
  "emitDeclarationOnly": true,
  "isolatedModules": true
}
```

### 装饰器和元数据

> 在 TypeScript 实现了装饰器之后，装饰器提案已经多次更改，仍然没有最终确定，这意味着目前ECMAScript规范和 TypeScript 在装饰器的行为方式上并没有完全一致。Babel 的插件遵循 ECMAScript 规范，这意味着 Babel 不像 TypeScript 那样编译装饰器。

:::danger
`javascript`目前装饰器提案是在`Stage-2`，`typescript`装饰器的实现是`Stage-1`阶段，所以如果`babel`要想模拟和`typescript`同样的实现需要如下配置：

```json
{
  "presets": ["@babel/preset-typescript"],

  "plugins": [
    "babel-plugin-transform-typescript-metadata",
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    ["@babel/plugin-proposal-class-properties", { "loose": true }],
  ],
}
```

:::
