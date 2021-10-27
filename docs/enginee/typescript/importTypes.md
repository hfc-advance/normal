---
id: typescriptImportTypes
title: import type的作用
hide_title: true
sidebar_label: import type的作用
---

import Link from '@docusaurus/Link'
import BabelDemo from './importTypes/\_babelDemoPartial.md'

## 仅仅导入和仅仅导出

`import type`和`export type`可以称之为`仅仅导入申明；仅仅导出申明`

```typescript
import type { Options } from '@/interface'

export type { Options }
```

当我们不使用`仅仅导入；仅仅导出`的时候，类型申明照样能使用：

```typescript title="foo.ts"
export interface Options {
  children: JSX.Element
  path: string
}

export function doThing() {
  return 'runtime'
}
```

```typescript title="bar.ts"
// 混合导入，照样能使用
import { Options, doThing } from 'foo.ts'

const options: Options = {}
doThing()
```

## 使用仅仅导入的区别

既然能正常使用，那么使用`import type`又有啥区别呢？

```typescript
import { MyThing } from './some-module.ts'

export { MyThing }
```

如上面的代码所示：`MyThing`到底是一个类型还是一个值，如果单从一个文件来看，我们是无法知道答案的：

## 解决无法推断是申明还是值

### 仅仅导出

> 我们可以通过`export type`来告知编译器，这里代表的是一种类型

```typescript
import { MyThing } from './some-module.ts'

export type { MyThing }
```

### 使用具有上下文功能的编译器

> 编译器能够理解整个系统文件比如`tsc`，`tsc`编译器能够通过整个系统的上下文分析得出`MyThing`

```shell
tsc src/*.ts
```

### 避免风险代码

> 开启`tsconfig.json：isolatedModules`配置，这样可以避免写出这样的风险代码。<Link to="/docs/enginee/typescript/typescriptTsConfigJSON#isolatedmodules">isolatedModules 详细介绍</Link>

```json
{
  "compilerOptions": {
    "isolatedModules": true
  }
}
```

## 案例分析

比如`babel`,`typescript`的`Node API`：`transpileModule API`，一次只能在一个文件上操作，没有上下文的概念，就会有问题

```javascript
.
├── src
│   ├── index.ts
│   ├── container.ts
│   ├── module-a.ts
```

<BabelDemo />
