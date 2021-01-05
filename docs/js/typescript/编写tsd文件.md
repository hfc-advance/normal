---
id: typescriptTSD
title: 编写tsd文件
hide_title: true
sidebar_label: 编写tsd文件
---

### 拓展申明文件

虽然JavaScript不支持合并，但你可以为导入的对象打补丁以更新它们。


#### 全局拓展

直接申明全局拓展

```typescript
declare const maxNum: 100
```

![tsd](https://raw.githubusercontent.com/13916253446/assets/master/public/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202019-09-24%20%E4%B8%8B%E5%8D%888.oqgud17low8.25.57%20(1).png)

:::warning
这里要注意当使用`const`或者`let`的话,只能通过直接使用变量名的方式来访问,不能通过`window`来访问。比如上面的例子不能通过`window.maxNum`来访问。当我们把代码改成`var`
```typescript
declare var maxNum: 100
```
能直接通过变量名访问，也可以通过`window`来访问这个变量
:::

在模块内部申明全局变量

在模块申明文件里面,可以通过`global`来申明全局变量
```typescript
// module.d.ts
import Vue from 'vue'

declare global {
    var $vue: Vue
}
```

:::warning
只要文件内部使用`import`或者`export`关键字,那么这个文件就是一个模块申明文件了,也就是不能直接通过`declare const maxs: 200`来申明全局变量了。
:::


#### 模块拓展

可以拓展内部自定义模块以及外部模块比如`Vue`

- 拓展外部模块

比如增加`Vue`的根实例上面增加一个`$get`的请求方法

```typescript
// 1. 确保在声明补充的类型之前导入 'vue'
import Vue from 'vue'

// 2. 找到要拓展的模块的路径(Vue构造函数类型在types/vue.d.ts里)
declare module 'vue/types/vue' {
// 3. 声明为 Vue 补充的东西
  interface Vue {
    /**
     * get请求
     * @param  {string} _mt 请求标识符
     * @returns Promise 异步函数
     */
    $get(_mt: string): Promise<object>
  }
}
```

![tsd](https://raw.githubusercontent.com/13916253446/assets/master/public/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202019-09-24%20%E4%B8%8B%E5%8D%888.jkiunartchq.51.57%20(1).png)

- 拓展内部自定义模块

通过模块导入`import`或者`require`的方式使用的模块,可以有两种方式来申明文件。

1、在相应的模块文件夹下建立同名的`.d.ts`文件来申明

```typescript
import { NativeGoBack } from '@/libs/util.native.js'

// @/libs目录下的util.native.d.ts文件
export declare function NativeGoBack () => void
```

:::warning
无论在任何位置的`.ts`以及`.d.ts`文件内没有使用`export`申明`declare`的类型都将是**全局的**
:::

2、通过`module`来申明

```typescript
declare module '@/libs/util.native' {
    function NativeGoBack () => void
}
```

## 申明文件

### declare 声明全局变量

在项目中只用`declare`申明不再带别的关键字，申明的类型就是全局的

1. `declare var`;`declare let`;`declare const`申明全局变量

```typescript
declare var $: Jquery
declare let $: Jquery

// 使用const申明的全局变量，不能被重新赋值
declare const $: Jquery
```

2. `declare function`申明全局方法

```typescript
declare function test (id: number): number
```

3. `declare class`申明全局类

```typescript
declare class Animall {
  name: string;
  constructor (name: string);
}
```

4. `declare enum`申明全局枚举

```typescript
declare enum Directions {
  Up,
  Down,
  Left,
  Right
}
```

5. `declare namespace`申明全局变量是一个对象，包含很多子属性

```typescript
declare namespace Jquery {
  ajax (url: string): void
}

Jquery.ajax('/test')

// 或者可以使用window
declare global {
  namespace Jquery {
    ajax (url: string): void
  }
}
```

:::warning
直接用`declare`申明全局变量和使用拓展申明全局变量`declare global`有很大的区别:

- 通过`declare global`拓展的变量可以通过`window`来访问，直接使用`declare`申明的变量则不能

```typescript
declare global {
  var test: number
}

console.log(window.test)
```

- 在`npm`包中直接用`declare`申明的变量是局部变量，也就是使用者是访问不到的,如果是拓展全局变量`declare global`来项目使用者也可以访问到这个变量
:::

### declare module拓展原有模块

:::important
拓展原有模块有两个前提:

- 需要在类型申明文件中先引入原有模块
- 再使用`declare module`拓展

```typescript
import Vue from 'vue'

declare module 'vue/types/vue' {
  interface Vue {
    $router: VueRouter,
    $store: Store<any>
  }
}
```

:::

### 三斜杠指令申明依赖关系

斜线指令也是`ts`在早期版本中为了描述模块之间的依赖关系而创造的语法。随着`ES6`的广泛应用，现在已经不建议再使用 `ts`中的三斜线指令来声明模块之间的依赖关系了。

但是在声明文件中，它还是有一定的用武之地。

1. 全局变量申明文件存在依赖关系

在全局变量的声明文件中，是不允许出现`import`, `export`关键字的。一旦出现了，那么他就会被视为一个`npm`包或 `UMD`库，就不再是全局变量的声明文件了。故当我们在书写一个全局变量的声明文件时，如果需要引用另一个库的类型，那么就必须用三斜线指令了

```typescript
/// <reference types="jquery" />

declare function foo(options: JQuery.AjaxSettings): string;
```

## 注意事项

- 申明文件中出现`import`，`export`关键字时候，那么他就会被视为一个`npm`包或`UMD`库，就不再是全局变量的声明文件了，直接使用`declare`申明的变量就是局部变量了，如果要申明全局变量需要使用拓展的方式`declare global`

- 三斜杠指令有多种模式

:::tip
- `types`申明对一个库的依赖

```typescript
/// <reference types="jquery" />
```

- `path`申明对一个文件的依赖

```typescript
/// <reference path="vue.d.ts">
```

:::

## 参考

- [申明合并](https://www.tslang.cn/docs/handbook/declaration-merging.html)
- [申明类型文件](https://ts.xcatliu.com/basics/declaration-files)