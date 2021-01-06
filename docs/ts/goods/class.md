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

## 为什么 class 能够直接作为 ts类型来使用

```typescript {9}
class Person {
  age: number;

  constructor (age: number) {
    this.age = age
  }
}

function getAge (person: Person) {
}
getAge(new Person(26))

const obj = { age: 26 }
type TObj = obj ❎
type TObj = typeof obj ✅
type TPerson = Person ✅
```

👆所示，没有申明`interface Person`，但是能使用`Person`类型。别的数据类型就不可以，`class`却可以。

:::success

- `ts`中当使用`class`关键字的时候，实际上也创建了一个和`class`同名的接口:

  ```typescript
  class Person {
    age: number;

    constructor (age: number) {
      this.age = age
    }
  }

      // 👇

  interface Person {
    age: number
  }
  class Person {}
  ```

  - 生成的接口，包含了类的所有`实例属性和方法`。
:::
