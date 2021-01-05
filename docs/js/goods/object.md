---
id: jsObject
title: object知识
hide_title: true
sidebar_label: Object
---

## 监听对象

`object`的`getter`和`setter`能够监听对象的读取和设置操作。并且有个相当重要的点:

:::important 重点知识
`getter`和`setter`函数中的`this`指向该对象。
:::

### Object.defineProperty方式

`Object.defineProperty`给对象添加对象属性特性描述，主要就是是否可枚举修改删除设置等以及`value/getter/setter`等设置

```javascript
var test = {};
Object.defineProperty(test, 'o', {
  get() {
     console.log('监听到正在获取属性o的值');
     return this._o;
  },
  set(v) {
    console.log('监听到正在设置属性o的值为：' + v);
    this._o = v;
    return this._o;
  }
});

test.o = 14; // 监听到正在设置属性o的值为：14
console.log(test.o); // 监听到正在获取属性o的值
```

### `__defineGetter__`和`__defineSetter__`方式

`__defineGetter__`和`__defineSetter__`是对象原型上面的方法。

```javascript
var test = {};

test.__defineGetter__('o', function(){
    console.log('监听到正在获取属性o的值');
    return this._o;
});

test.__defineSetter__('o', function(v){
    console.log('监听到正在设置属性o的值为：' + v);
    this._o = v;
    return this._o;
});

test.o = 14; // 监听到正在设置属性o的值为：14
console.log(test.o); // 监听到正在获取属性o的值
```

:::warning
这两种方法已经不推荐使用，而且随着浏览器更新会慢慢抛弃不再支持这两种写法。
:::

### 直接在对象上面定义

对象的属性可以直接使用`get`和`set`的方式来定义:

```javascript
var test = {
  get o(){
    console.log('监听到正在获取属性o的值');
    return this._o;
  },
  set o(v){
    console.log('监听到正在设置属性o的值为：' + v);
    this._o = v;
    return this._o;
  }
}
```

### 应用场景

- 获取闭包内对象

```javascript
var foo = (function(){
  var o = {
      a: 1,
      b: 2
  };
  return function(key) {
      return o[key];
  }
})();
```

:::tip
`getter`和`setter`函数中的`this`指向该对象。这个知识点我们可以在所有的对象原型上面定义一个属性的`gettter`
:::

```javascript {2,6}
// 定义一个唯一的key必须污染对象
const key = Symbol()

Object.defineProperty(Object.prototype, key, {
  get () {
    return this;
  }
})

foo(key)
```
