---
id: cssVerticalAlign
title: css中的vertical-align
hide_title: true
sidebar_label: vertical-align
---

## 1. 重要提示

:::important `vertical-align`重要提示

- 属性值都是相对于父元素的。
- 只对`inline`,`inline-block`,`table-cell`元素生效
- 默认对齐方式是`baseline`

:::

## 2. 应用场景

### 1. 幽灵空白

```jsx live
<div style={{ backgroundColor: 'blue' }}>
  <img src='/img/2015-06-28_105734 (1).png' />
</div>
```

可以看到图片下面有个缝隙。

:::important 原因

- 块状元素内部包裹着内联元素，这个块状元素内部还有一个(`更有可能两个-前后`),看不见摸不着没有宽度没有实体的空白节点，这个假想又似乎存在的空白节点
- `vertical-align`在内联元素上面起作用，默认值是`baseline`，但是又有行高`line-height`，可以通过下面实例查看

```jsx live
<div style={{ backgroundColor: 'blue' }}>
  <img src='/img/2015-06-28_105734 (1).png' />
  <span style={{ backgroundColor: '#FFFFFF', color: '#000000' }}>zxx</span>
</div>
```

:::

:::warning 牢记知识点

- 对于内联元素，`vertical-align`与`line-height`虽然看不见，但实际上「到处都是」！
- `vertical-align`的默认对齐方式是`baseline`

:::

### 2. 如何解决

- 让`vertical-align`失效，将图片设置成`display: block`块状元素

  ```jsx live
  <div style={{ backgroundColor: 'blue' }}>
    <img style={{ display: 'block' }} src='/img/2015-06-28_105734 (1).png' />
  </div>
  ```

- 使用`vertical-align`其他值

  ```jsx live
  <div style={{ backgroundColor: 'blue' }}>
    <img style={{ verticalAlign: 'middle' }} src='/img/2015-06-28_105734 (1).png' />
  </div>
  ```

- 修改`line-height`的值

 ```jsx live
  <div style={{ backgroundColor: 'blue', lineHeight: 0 }}>
    <img src='/img/2015-06-28_105734 (1).png' />
  </div>
  ```

- 修改`font-size`的值

  ```jsx live
  <div style={{ backgroundColor: 'blue', fontSize: 0 }}>
    <img src='/img/2015-06-28_105734 (1).png' />
  </div>
  ```

  :::tip 为什么修改`font-size`也起作用
  如果`line-height`是相对单位，例如`line-height:1.6`或者`line-height:160%`之类，也可以使用`font-size`间接控制，比方说来个狠的，`font-size`设为大鸡蛋`0`, 本质上还是改变`line-height`值.
  :::

## 参考

- [CSS深入理解vertical-align和line-height的基友关系](https://www.zhangxinxu.com/wordpress/2015/08/css-deep-understand-vertical-align-and-line-height/)
