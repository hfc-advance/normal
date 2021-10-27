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