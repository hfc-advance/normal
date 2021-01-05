---
id: tsGoods1
title: 技巧
hide_title: true
sidebar_label: 技巧
---

### 1. 利用`ts`类型推断，提取对象动态的`key`

当一个对象是动态的时候，我们可能会这样定义类型：

```typescript
interface IObj {
  [key: string]: any
}

const obj: IObj = {
  name: '1',
  test: 2
}
````

:::warning
这个时候我们想提取`obj`的`key`作为联合类型：

```typescript
type keys = keyof typeof obj

// "string" | "number"
```

但是如果我们利用`ts自己的类型推断`, 就是不定义`obj`的类型，就可以提取`obj`的`key`

```typescript
const obj = {
  name: '1',
  test: 2
}

type keys = keyof typeof obj

// "name" | "test"
```

:::

### 2. 泛型传递，不用手动定义

```typescript
function getData<O extends object, K extends keyof O> (obj: O, id: K): O[K] {
  return obj[id]
}

getData({ name: '崔海峰' }, 'name')
```

:::tip
通过调用方法传参，自动推断`O`和`K`的类型，不用在调用方法的时候手动传递`O`和`K`的类型，这也是利用类型推断的原理
:::

### 3. vue的类型申明分为几部分，可以通过 typeof vue 来获取所有的属性

`vue`有全局的方法，也有一些实例上面的方法，比如：`Vue.mixin`和`this.$attrs`就是不同的类型申明

```typescript
import TVue from 'vue'

{
  install (Vue: TVue) {
    // 这个时候Vue上面只会有一些实例属性和方法，不能访问Vue.mixin
  }
}
```

:::tip
但是我们可以通过导入数据，而不是导入类型，直接通过`typeof`来提取完整的类型定义

```typescript
import Vue from 'vue'

{
  install (Vue: typeof Vue) {
    Vue.mixin()
  }
}
```

:::

### 4. 表达式中的类型转换

- 对象的类型转换

```typescript
const item = o.length ? 'test' : 'prd'
```

:::warning
因为不知道`o`的类型，所以这里直接读取`o.length`会抛出类型错误，这里就需要类型转换：

- 尖括号的方式`<>`

```typescript
const item = (<any[]>o).length ? 'test' : 'prd'
```

- 使用`as`

```typescript
const item = (o as any[]).length ? 'test' : 'prd'
```

:::

### 5. 类型保护

类型保护是`可执行运行时检查`的一种表达式，一个变量可以是多种类型的值，但是在某一个范围内它的值是确定的。
目前有`四种方式`实现

- `in` 关键字

```typescript
interface Admin {
  name: string;
  privileges: string[];
}

interface Employee {
  name: string;
  startDate: Date;
}

type UnknownEmployee = Employee | Admin;

function printEmployeeInformation(emp: UnknownEmployee) {
  console.log("Name: " + emp.name);
  if ("privileges" in emp) {
    console.log("Privileges: " + emp.privileges);
  }
  if ("startDate" in emp) {
    console.log("Start Date: " + emp.startDate);
  }
}
```

- `typeof` 关键字

```typescript
function padLeft(value: string, padding: string | number) {
  if (typeof padding === "number") {
      return Array(padding + 1).join(" ") + value;
  }
  if (typeof padding === "string") {
      return padding + value;
  }
  throw new Error(`Expected string or number, got '${padding}'.`);
}
```

:::warning
`typeof` 类型保护只支持两种形式：`typeof v === "typename"` 和 `typeof v !== typename`，`"typename"` 必须是 `"number"`， `"string"`， `"boolean"` 或 `"symbol"`。 但是 `TypeScript` 并不会阻止你与其它字符串比较，语言不会把那些表达式识别为类型保护。
:::

- `instanceof` 关键字

```typescript
interface Padder {
  getPaddingString(): string;
}

class SpaceRepeatingPadder implements Padder {
  constructor(private numSpaces: number) {}
  getPaddingString() {
    return Array(this.numSpaces + 1).join(" ");
  }
}

class StringPadder implements Padder {
  constructor(private value: string) {}
  getPaddingString() {
    return this.value;
  }
}

let padder: Padder = new SpaceRepeatingPadder(6);

if (padder instanceof SpaceRepeatingPadder) {
  // padder的类型收窄为 'SpaceRepeatingPadder'
}
```

- `自定义`类型保护

无法访问 `instanceof` 和 `typeof`。在这种情景下，你可以创建用户自定义的类型保护函数，这仅仅是一个返回值为类似于`someArgumentName is SomeType` 的函数

```typescript
function isFish(pet: Fish | Bird): pet is Fish {
  return (<Fish>pet).swim !== undefined;
}

// 'swim' 和 'fly' 调用都没有问题了
if (isFish(pet)) {
  pet.swim()
}
else {
  pet.fly()
}
```

### 6. 利用 never 收窄类型，囊括未来可能出现的所有情况

用来预判一些未来可能会出现的错误。比如以下的场景:

```typescript
interface Foo {
  type: 'foo'
}

interface Bar {
  type: 'bar'
}

type All = Foo | Bar
```

在 switch 当中判断 type，TS 是可以收窄类型的 (discriminated union)：

```typescript
function handleValue(val: All) {
  switch (val.type) {
    case 'foo':
      // 这里 val 被收窄为 Foo
      break
    case 'bar':
      // val 在这里是 Bar
      break
    default:
      // val 在这里是 never
      const exhaustiveCheck: never = val
      break
  }
}
```

注意在 default 里面我们把被收窄为 never 的 val 赋值给一个显式声明为 never 的变量。如果一切逻辑正确，那么这里应该能够编译通过。但是假如后来有一天你的同事改了 All 的类型：

```typescript
type All = Foo | Bar | Baz
```

:::success
设置了`never`的值，就会抛出错误不能将`Baz`赋值给`never`，这样一来就可以囊括`switch`所有的情况。
:::

## 关键字

### 1. typeof

```typescript
const a = 1

type TA = typeof a // -> "1"
```

:::tip
获取数据的`类型`
:::

### 2. keyof

```typescript
interface Person {
  name: string
  age: number
}

type KP = keyof Person // -> "name"，"age"
```

:::tip
可以用来取得一个对象接口的所有`key`值
:::

### 3. in

```typescript
type Keys = "a" | "b" | "c"

type Obj =  {
  [p in Keys]: any
} // -> { a: any, b: any, c: any }
```

:::tip
用来遍历枚举类型
:::

### 4. infer （vt. 推断；推论）

```typescript
type Func<T> = T extends () => infer R ? R : boolean;

let func1: Func<number> // => boolean
let func2: Func<''> // => boolean
let func3: Func<() => Promise<number>>
```

:::important 善用 infer 来做类型“解构”
 `infer X` 就相当于声明了一个变量，这个变量随后可以使用，这个变量的值，就是申明的时候`具体位置的值`

- 比如你想获取某个被`Promise`包装过的原类型

  ```typescript
  type PromiseInnerType<T extends Promise<any>> = T extends Promise<infer P>
    ? P
    : never
  type Test = PromiseInnerType<Promise<string>> // Test 的类型为 string
  ```

- 其实上面就是 infer 的通常用途。举一反四，任意工具类型都可以用上述原理来做类型“解构”。比如，你还可以写一个 ReturnType 的 Promise 版本，用于获取 Promise 函数的"解构类型"

  ```typescript
  type PromiseReturnType<T extends () => any> = ReturnType<T> extends Promise<
    infer R
  >
    ? R
    : ReturnType<T>

  async function test() {
    return { a: 1 }
  }

  type Test = PromiseReturnType<typeof test> // Test 的类型为 { a: number }
  ```

:::

:::warning
只能出现在`extends`语句中，而且在`true`分支中使用
:::

### 5. extends

```typescript
interface ILengthwise {
  length: number;
}

function loggingIdentity<T extends ILengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}
```

:::tip
约束某个类型必须是继承某个类型，可以用来添加约束
:::
