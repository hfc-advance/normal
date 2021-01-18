---
id: cssCubicBezier
title: cubic-bezier
hide_title: true
sidebar_label: cubic-bezier
---

### 查询 cubic-bezier 函数

- [https://easings.net/](https://easings.net/)
- [手动制作，并支持导入函数重新制作](https://cubic-bezier.com/)

***

### cubic-bezier 转 js

[![bezier-easing 使用cubic-bezier函数根据x轴(time)计算y轴(位移)](https://img.shields.io/github/stars/gre/bezier-easing?label=bezier-easing&style=social)](https://github.com/gre/bezier-easing)

这是一个可以使用`cubic-bezier`函数根据`x轴`计算`y轴`值的库。

```javascript
import BezierEasing from 'bezier-easing'

const easing = BezierEasing(0.25, 0.1, 0.11, 1.44)


const start = Date.now()
// 运动总时长
const totalTime = 300
// 运动总位置
const translate = 1000
const loop = () => {
  const p = (Date.now() - start) / totalTime
  if (p >= 1) {
    requestAnimationFrame(() => {
      this.setStyle(translate)
    })
  } else {
    requestAnimationFrame(() => {
      this.setStyle(easing(p) * translate)
      loop()
    })
  }
}
loop()
```
