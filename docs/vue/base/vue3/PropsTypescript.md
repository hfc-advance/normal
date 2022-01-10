## Props 类型注解

目前有两种方式提供Props类型注解：

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs
  defaultValue='proptype'
  values={[
    {label: 'PropType', value: 'proptype'},
    {label: 'defineProps', value: 'defineProps'},
  ]}>
  <TabItem value='proptype'>

```html
<script setup lang="ts">
import { defineComponent } from 'vue'

defineComponent({
  props: {
    name: string,
    callback: {
      // highlight-next-line
      type: Function as PropType<() => void>,
      required: true
    }
  }
})
</script>
```

  </TabItem>
  <TabItem value='defineProps'>

```html
<script setup lang="ts">
import { defineProps } from 'vue'

// 运行时声明
const props = defineProps({
  name: String
})
// 静态类型申明
const props = defineProps<{ name: string }>()
</script>
```

  </TabItem>
</Tabs>

:::danger
defineProps 只能是要么使用`运行时声明`，要么使用`类型声明`, 同时使用两种声明方式会导致编译报错。
:::
