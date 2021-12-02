---
id: jsPackageUtils
title: 辅助工具
hide_title: true
sidebar_label: 辅助工具
---

import ObjectCompare from '../../js/goods/对象转字符串.md'

## 判断数据

### microdiff

> [microdiff](https://github.com/AsyncBanana/microdiff) 高性能零依赖比较数据而且能够给出具体差异的地方

```javascript
import diff from 'microdiff'

const obj1 = {
  originalProperty: true
}
const obj2 = {
  originalProperty: true,
  newProperty: 'new'
}

console.log(diff(obj1, obj2))
// [{type: "CREATE", path: ["newProperty"], value: "new"}]
```

### stable-hash 序列化任何数据 => 字符串

> [stable-hash](https://github.com/shuding/stable-hash)，496Byte 大小，可以序列化任何类型的数据

```javascript
import hash from 'stable-hash'

hash([1, '2', [new Date(3)]]) === hash([1, '2', [new Date(3)]])
hash([1, 2]) !== hash([2, 1])

hash({ foo: 'bar' }) === hash({ foo: 'bar' })
hash({ foo: { bar: 1 } }) === hash({ foo: { bar: 1 } })
```

### 关于对象转字符串

<ObjectCompare />

## json

### serialize-javascript 将任意数据转成 json

> [serialize-javascript](https://github.com/yahoo/serialize-javascript) 可以将`js`任意数据包括正则和方法转成`json`存储

```javascript
var serialize = require('serialize-javascript')

serialize({
  str: 'string',
  num: 0,
  obj: { foo: 'foo' },
  arr: [1, 2, 3],
  bool: true,
  nil: null,
  undef: undefined,
  inf: Infinity,
  date: new Date('Thu, 28 Apr 2016 22:02:17 GMT'),
  map: new Map([['hello', 'world']]),
  set: new Set([123, 456]),
  fn: function echo(arg) {
    return arg
  },
  re: /([^\s]+)/g,
  big: BigInt(10)
})
```

输出一下结果：

```javascript
'{"str":"string","num":0,"obj":{"foo":"foo"},"arr":[1,2,3],"bool":true,"nil":null,"undef":undefined,"inf":Infinity,"date":new Date("2016-04-28T22:02:17.000Z"),"map":new Map([["hello","world"]]),"set":new Set([123,456]),"fn":function echo(arg) { return arg; },"re":new RegExp("([^\\\\s]+)", "g"),"big":BigInt("10")}'
```

当我们想要再使用这个数据的时候，可以通过`eval`返回原始数据格式：

```javascript
function deserialize(serializedJavascript) {
  return eval('(' + serializedJavascript + ')')
}
```
