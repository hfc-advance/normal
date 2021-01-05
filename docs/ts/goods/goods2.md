---
id: tsGoods2
title: 技巧2
hide_title: true
sidebar_label: 技巧2
---

### 1. 申明 class 中的 constructor

```typescript
interface IClassyAnimal {
  new (name: string): IAnimal;
  group: string;
}
const petClass: IClassyAnimal = class Parrot {
  static group = 'Bird';
  constructor(public name: string) {}
}
```

:::warning

- 可以通过使用`new`的方式来定义
:::

### 2. 单独为对象中的一个属性定义类型

有时候一个对象中有很多属性，但是大部分属性都能通过类型推倒出来，只有个别的属性是动态的，比如这个属性的值是动态对象，动态数组。

```typescript {10,14}
const application = {
  /** 校验应用是否有效 */
  validate (app: IApp): string | true {
    const { name, url } = app || {}
    if (!(name && url)) return 'the name and url of the application are required'
    if (name?.search(/^[a-zA-Z]{3,}$/) < 0) return 'the name of the application is a string and is longer than or equal to 3'
    if (url?.search(/^http/) < 0) return 'the url of the application should be network url'

    // 应用重复
    if (application.enum.name)
    return true
  },
  /** 应用: IApp.name => IApp */
  enum: {},
  add () {
  }
}
```

:::success

- 可以通过`as`定义单个属性的类型：

  ```typescript {6}
  const application = {
    /** 校验应用是否有效 */
    validate (app: IApp): string | true {
    },
    /** 应用: IApp.name => IApp */
    enum: {} as { [name: string]: IApp },
    add () {
    }
  }
  ```

:::