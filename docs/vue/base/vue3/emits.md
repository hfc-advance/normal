## emits 自定义事件

在vue3中，建议定义所有发出的事件，以便更好地记录组件应该如何工作。

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs
  defaultValue='setup'
  values={[
    {label: 'setup', value: 'setup'},
    {label: 'options', value: 'options'},
  ]}>
  <TabItem value='setup'>

```html
<script setup lang="ts">
import { defineEmits } from 'vue'

const emit = defineEmits<{
  (e: 'change', id: number): void
  (e: 'update', value: string): void
}>()
</script>
```

  </TabItem>
  <TabItem value='options'>

```html
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  emits: {
    // 没有验证
    click: null,

    // 验证 submit 事件
    submit: ({ email, password }) => {
      if (email && password) {
        return true
      } else {
        console.warn('Invalid submit event payload!')
        return false
      }
    }
  },
  methods: {
    submitForm(email, password) {
      this.$emit('submit', { email, password })
    }
  }
})
</script>
```

  </TabItem>
</Tabs>

:::danger

- defineEmits和defineProps一样，只能是要么使用`运行时声明`，要么使用`类型声明`, 同时使用两种声明方式会导致编译报错。
- 事件通过返回true或者false以验证该事件是否有效
:::
