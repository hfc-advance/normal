---
id: cssSvgStrokeDasharray
title: svg - dasharray&dashoffset
hide_title: true
sidebar_label: svg - dasharray&dashoffset
---

### stroke-dasharray

用于创建虚线，之所以后面跟的是`array`的，是因为值其实是数组。

```javascript
stroke-dasharray = '10'
stroke-dasharray = '10, 5'
stroke-dasharray = '20, 10, 5'
```

![stroke-dasharray](/img/1312697-20190618114106403-47322481.png)

:::success

- stroke-dasharray为一个参数时： 其实是表示虚线长度和每段虚线之间的间距

  - 如：stroke-dasharray = '10' 表示：虚线长10，间距10，然后重复 虚线长10，间距10

- 两个参数或者多个参数时：一个表示长度，一个表示间距

  - 如：stroke-dasharray = '10, 5' 表示：虚线长10，间距5，然后重复 虚线长10，间距5

  - 如：stroke-dasharray = '20, 10, 5' 表示：虚线长20，间距10，虚线长5，接着是间距20，虚线10，间距5，之后开始如此循环
:::

:::warning
`dasharray` 是循环的，也就是 虚线-间隔-虚线-间隔。

如：`stroke-dasharray = '20, 10, 5'`：

第一轮：虚线： 20， 间隔 10
第二轮：虚线： 5，  间隔 20

当值为单数的时候，虚线以及间隔并不是固定不变的
:::

### stroke-dashoffset

设置虚线的偏移。

![stroke-dashoffset](/img/1312697-20190618114434344-1494379511.png)

:::info 👆释义

1. 没有虚线
2. stroke-dasharray="3 1" ，虚线没有设置偏移，也就是stroke-dashoffset值为0
3. stroke-dashoffset="3"，偏移正数，虚线整体左移了3个单位，图中3后面的红线段，就是起始线段，线段之后是1个单位的间隔，我们可见区域从这个间隔开始，然后循环 3-1,3-1的虚线-间隔-虚线-间隔
4. stroke-dashoffset="-3"，偏移负数，虚线整体右移动了3个单位，由于dasharray 是循环的，前面偏移的位置会有dasharray 填充上
5. stroke-dashoffset="1"，偏移正数，虚线整体左移了1个单位，最终呈现出来的效果跟 线段4 一样
:::

:::warning 总结

- 偏移是整体偏移。
- 正数向左偏移，负数向右偏移。
:::

### 示例： 画线段

- 第一步：设置stroke-dasharray虚线长度等于当前svg的宽度，间隔大于或者等于svg宽度。

可视区域内只看到一段虚线。实际上是看不到间隔。

```jsx live
<svg >
　　<line id="line" x1="30" y1="30" x2="300" y2="30" stroke-width="20" stroke="red" stroke-dasharray="300,320"/>
</svg>
```

- 第二步：设置stroke左移 300单位（stroke-dashoffset:300），也就是刚好隐藏了虚线，可视区域内变成了320单位的间隔，

![stroke-dashoffset](/img/1312697-20190618115023853-311940423.png)

```jsx live
function createItem () {
  if (typeof document !== 'undefined') {
    const createdStyleTag = document.createElement("style");
    createdStyleTag.textContent = `@keyframes strokeLine {
          0% {
            stroke-dashoffset: 300;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }
        @-webkit-keyframes strokeLine {
          0% {
            stroke-dashoffset: 300;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }
        .stroke-line-example {
          animation: strokeLine 1.6s infinite;
        }
        `

    document.body.appendChild(createdStyleTag);
  }


  return (
    <svg >
    　　<line id="line" x1="30" y1="30" x2="300" y2="30" stroke-width="20" stroke="red" stroke-dasharray="300,320" className="stroke-line-example"  />
    </svg>
  )
}
```

### 示例： 画圆

和画线段的原理一样：将`dashoffset`设置成整个`stroke`的长度，然后让`offset`产生动画。

```jsx live
function createItem () {
  if (typeof document !== 'undefined') {
    const createdStyleTag = document.createElement("style");
    createdStyleTag.textContent = `@keyframes strokeCircle {
          0% {
            stroke-dashoffset: 314;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }
        @-webkit-keyframes strokeCircle {
          0% {
            stroke-dashoffset: 314;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }
        .stroke-circle-example {
          animation: strokeCircle 1.6s infinite;
        }
        `
    document.body.appendChild(createdStyleTag);
  }

  return (
    <svg  width="200" height="200" viewBox="0 0 200 200">
      <circle id="circle" cx="100" cy="80" r="50"  fill="gray" stroke-width="5" stroke="green" stroke-dasharray="314" className="stroke-circle-example" />
    </svg>
  )
}
```

## 参考

- [SVG学习之stroke-dasharray 和 stroke-dashoffset 详解](https://www.cnblogs.com/daisygogogo/p/11044353.html)
