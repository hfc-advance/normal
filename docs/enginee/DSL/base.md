---
id: DSLBase
title: DSL - 实践
hide_title: true
sidebar_label: DSL实践
---

## 释义

> 关于 `DSL` 的理解，可以看[前端 DSL 实践指南（上）—— 内部 DSL](https://www.zhihu.com/column/p/107947462)

## 内部 DSL 风格

> 依赖宿主环境的语法，也就是不需要编译，可以直接在宿主环境运行，只不过封装的更抽象。

```javascript title="外部DSL"
2 weeks ago
```

```javascript title="内部DSL"
;(2).weeks().ago()
```

- `2 weeks ago`： 会得到 Uncaught SyntaxError: Unexpected identifier 的语法错误。
- `(2).weeks().ago()`： 则会得到一个 Uncaught TypeError: 2.weeks is not a function 的运行时类型错误。

:::tip
其实从错误类型上我们就可以看到它们是有本质不同的。
:::

### 级联方法（链式调用风格）

当我们用`javascript`也就是通用编程来操作原生 DOM:

```javascript
const userPanel = document.querySelector('#user_panel')
userPanel.addEventListener('click', hidePanel)
slideDown(userPanel) //假设这是一个已实现的动画封装
```

比如 JQuery 封装过后：

<!-- prettier-ignore -->
```javascript
$('#user_panel')
  .click(hidePanel)
  .slideDown()
  .find('button')
  .html('follow');
```

可以看到代码逻辑很清晰。

### 级联属性

`(2).weeks.ago`这个语法很清晰，默认环境是不支持的，需要封装`DSL`来支持：

```javascript
const hours = 1000 * 60 * 60
const days = hours * 24
const weeks = days * 7
const UNIT_TO_NUM = {hours, days, weeks}
class Duration {
  constructor(num, unit) {
    this.number = num
    this.unit = unit
  }
  toNumber() {
    return UNIT_TO_NUM[this.unit] * this.number
  }
  get ago() {
    return new Date(Date.now() - this.toNumber())
  }
  get later() {
    return new Date(Date.now() + this.toNumber())
  }
}

Object.keys(UNIT_TO_NUM).forEach(unit => {
  // highlight-start
  Object.defineProperty(Number.prototype, unit, {
    get() {
      return new Duration(this, unit)
    }
  })
  // highlight-end
})
```

:::danger
级联属性：核心就是 Object.defineProperty()，它可以劫持属性的 setter 与 getter：
:::
