import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs
defaultValue='container'
groupId="babel"
values={[
{label: 'index.ts', value: 'index'},
{label: 'container.ts', value: 'container'},
{label: 'module-a.ts', value: 'modulea'},
]}>
<TabItem value='index'>

```typescript
import { ModuleA, moduleA } from './container'
console.log(moduleA)
```

</TabItem>
<TabItem value='container'>

```typescript
import { ModuleA, moduleA } from './module-a'

export { ModuleA, moduleA }
```

</TabItem>
<TabItem value='modulea'>

```typescript
export interface ModuleA {
  module: number
}

export const moduleA = 'moduleA'
```

</TabItem>
</Tabs>

<Tabs
defaultValue='container'
groupId="babel"
values={[
{label: 'index.js', value: 'index'},
{label: 'container.js', value: 'container'},
{label: 'module-a.js', value: 'modulea'},
]}>
<TabItem value='index'>

```javascript
import { moduleA } from './container'
console.log(moduleA)
```

</TabItem>
<TabItem value='container'>

```javascript
import { ModuleA, moduleA } from './module-a'
export { ModuleA, moduleA }
```

</TabItem>
<TabItem value='modulea'>

```javascript
export const moduleA = 'moduleA'
```

</TabItem>
</Tabs>

:::danger
如上图所示：`container`里面，单从`container.ts`里面无法分析`ModuleA, moduleA`是申明还是值，所以就保存了下来：

```javascript
import { ModuleA, moduleA } from './module-a'
export { ModuleA, moduleA }
```

但是`module-a`文件里面`ModuleA`类型申明，是可以分析出来的，所以`babel`编译的时候，就删除掉了这个类型申明，只留下了运行时的值`moduleA`

```javascript
export const moduleA = 'moduleA'
```

这个时候`container`从`module-a`里面导入`ModuleA`就报错了
:::
