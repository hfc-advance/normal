---
id: jsPackageUtils
title: 辅助工具
hide_title: true
sidebar_label: 辅助工具
---

import ObjectCompare from '../../js/goods/对象转字符串.md'

## 判断数据

### stable-hash 序列化任何数据 => 字符串

> [stable-hash](https://github.com/shuding/stable-hash)，496Byte大小，可以序列化任何类型的数据

```javascript
import hash from 'stable-hash'

hash([1, '2', [new Date(3)]]) === hash([1, '2', [new Date(3)]])
hash([1, 2]) !== hash([2, 1])

hash({ foo: 'bar' }) === hash({ foo: 'bar' })
hash({ foo: { bar: 1 } }) === hash({ foo: { bar: 1 } })
```

### 关于对象转字符串

<ObjectCompare />
