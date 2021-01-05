---
id: cssTransform
title: transform
hide_title: true
sidebar_label: transform
---

## transform-origin

元素变形的原点,也是坐标系的中心点。

### 默认值

```css
transform-origin: 50% 50% 0;
```

### 语法

- 因为`x-offset`的关键字`left;right;`和`y-offset`的关键字`top;bottom`不同，所以:

<div className="success">

如果是关键字定义那么定义没有顺序的讲究，下面是一样的效果:

```css
/* 第一种 */
transform-origin: left top;
/* 第二种 */
transform-origin: top left;
```

</div>

### 位移`(translate)`最终的位置和`transform-origin`无关

`translate`定义的始终是坐标中心点和中心点之间的距离，所以无论`transform-origin`是什么，那么位移最终的位置始终是相同的。

- origin不同，第一种情况:

```css
transform-origin: left top;
transform: translate(100px, 100px);
```

<div className="success">

![transform-origin](/img/svg-translate1.svg)

</div>

- origin不同，第二种情况:

```css
transform-origin: center;
transform: translate(100px, 100px);
```

<div className="success">

![transform-origin](/img/translate1.svg)

</div>

## 坐标系

元素的变形`transform`都是基于坐标系坐标原点来的。

### 坐标系会随便的元素的位置和变形变化而变化

- 默认值的坐标系:

![coordinate](/img/coordinate.svg)

- 变换位置后坐标系:

```css
transform: rotate(45deg);
```

![coordinate](/img/coordinate1.svg)

<div className="warning">

所以变形的时候变形属性的顺序不同可能导致的结果也不同。

```css
/* 第一种 */
transform: translate(50%, 50%) rotate(45deg)
/* 第二种 */
transform: rotate(45deg) translate(50%, 50%)
```

两种最终的效果不同。
</div>

---

`transform: translate(50%, 50%) rotate(45deg)`效果:

<div className="bg-f">

![transform2](/img/transform2.svg)

</div>

---

`transform: rotate(45deg) translate(50%, 50%)`效果:

<div className="bg-f">

![transform3](/img/transform3.svg)

</div>

## 三维坐标系

理解三维坐标系很重要。

![axi](/img/axios.jpg)

## 参考

### [1. 如何理解transform的matrix()用法](https://mp.weixin.qq.com/s/5PrxqJ8UkIPshzHegUumHw)
