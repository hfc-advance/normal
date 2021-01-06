---
id: tsClass
title: ts中的class
hide_title: true
sidebar_label: class
---

## 接口定义静态类型

```typescript {9}
interface IStaticPerson {
  height: number
}

interface IPerson {
  age: number
}

const person: IStaticPerson = class Person implements IPerson {
  static height = 189;

  age = 26;
}
```

:::important

- `ES6`中可以采用**类表达式**来定义类，通过设置变量的类型，也就是约定了这个变量本身要具有的属性，如果是`class`，也就是**静态属性**。

  ```typescript
  const person = class {
  }
  ```

:::
