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

## getter 和 setter

类属性可以具有`getter`和`setter`。使用`getter`可以计算一个值以作为属性值返回，而使用`setter`可以让您在设置属性时运行任意代码。

```typescript
class Vector2 {
  private _x = 0;

  get x() { return this._x; }

  set x(value: number) {
    this._x = value;
    this.calculateLength();
  }

  constructor(x: number, y: number) {
    this._x = x;
    this._y = y;
    this.calculateLength();
}
}
```

## 访问修饰符

修饰符可以设置属性的安全级别，以及访问权限。

- `public 默认`
- `private`
- `protected`
- `readonly`

:::warning

访问修饰符是`ts`自有的，访问权限验证只能在编译阶段验证，对于运行时代码验证可以采用`#`私有字段来解决。
:::

## 抽象类

抽象类中可以定义抽象方法和属性，子类继承必须实现抽象类中的抽象属性和方法

```typescript
abstract class Parent {
  abstract height: number;
  abstract getHeight(): number;

  age = 26
}

class Child extends Parent {
  height = 189;

  getHeight () {
    return this.age
  }
}
```

:::warning

- `extends`和`implements`的区别

  - `implements`后面跟的是`ts`类型，如果后面是`class`，那也是`class`背后生成的接口，所以在`implements`无论是抽象类还是具体的类，类里面所有的方法和属性，都必须要定义和实现

    ```typescript
    abstract class Parent {
      abstract height: number;
      abstract getHeight(): number;
      age = 26
    }

    class Child implements Parent { ❎
      height = 189;
      getHeight () {
        return this.age
      }
    }

    class Child implements Parent { ✅
      height = 189;
      getHeight () {
        return this.age
      }
      age = 26
    }
    ```

  - `extends`继承的时候，如果子类定义了`constructor`，那么必须调用`super`执行父类的构造函数。

    ```typescript
    class Child extends Parent { ✅
      constructor () {
        super()
      }
    }

    class Child extends Parent { ❎
      constructor () {
      }
    }
    ```

:::
