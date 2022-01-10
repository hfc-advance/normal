## globalProperties 全局属性

因为`vue3`能够挂载多个实例，所以全局属性不能直接挂载`Vue`实例对象上面，所以原来的方式就不在适用

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs
  defaultValue='1'
  values={[
    {label: 'vue3', value: '1'},
    {label: 'vue2', value: '2'}
  ]}>
  <TabItem value='1'>

```typescript
// 1. 注册全局属性
const app = Vue.createApp({})
app.config.globalProperties.$http = axios

// 2. 获取实例使用
import { getCurrentInstance } from 'vue'
const app = getCurrentInstance()
app.config.globalProperties.$http
```

```typescript title="types.d.ts 添加类型提示"
declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $http: (data: object, rule: object) => boolean
  }
}
```

  </TabItem>
  <TabItem value='2'>

```javascript
// 直接放在实例上面
Vue.prototype.$http = () => {}
```

  </TabItem>
</Tabs>
