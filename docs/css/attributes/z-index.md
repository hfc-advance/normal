---
id: cssZindex
title: z-index
hide_title: true
sidebar_label: z-index
---

## 理解三维坐标系

`HTML`文档中的元素是存在于三个维度之中。像`margin` , `float` , `offset`这些属性，控制着元素在`x`轴和`y`轴上的表现形式一样。

### `z-index`这个属性控制着元素在`z`轴上的表现形式。

![z-index](/img/z-index.png)

:::important
1. 任何`HTML`文档默认的堆叠上下文都是`<html>`元素。因此，除非创建新的堆叠上下文，否则也就是默认情况下，任何元素的堆叠顺序都是相对于页面的任意元素。

2. 如果未指定`z-index`的属性，元素的堆叠顺序基于它所在的文档树。默认情况下，文档中后来声明的元素具有更高的堆叠顺序。下面结果: `item2`元素会覆盖`item1`元素上面。
```html
<div><div class="item1"></div></div>
<div><div class="item2"></div></div>

<style>
  .item1, .item2 {
    width: 100px;
    height: 100px;
  }
  .item1 {
    background-color: blue;
  }
  .item2 {
    margin-top: -30px;
    margin-left: 30px;
    background-color: yellow;
  }
</style>
```

![z-index](/img/zIndex1.png)

3. 所有定了位的元素(设置`position`非`static`的元素)的层级要比没有定位的元素层级高。上面的例子如果把`item1`设置成`relative`那么`item1`将覆盖在`item2`元素之上。

```css
.item1, .item2 {
  width: 100px;
  height: 100px;
}
.item1 {
  position: relative;
  background-color: blue;
}
.item2 {
  margin-top: -20px;
  background-color: yellow;
}
```

![z-index](/img/zIndex2.png)

4. 堆叠顺序都是基于堆叠上下文的，默认堆叠上下文都是`<html>`。但是当设置了`z-index`属性，也就设置了当前元素的堆叠顺序，也为这个元素的所有子元素建立了一个新的堆叠上下文。

5. 当父元素的堆叠顺序被设置的时候，它的子元素之间的顺序和每个元素自己设置的`z-index`有关，但是相对于父元素外面的其他元素的堆叠顺序也就固定了，也就是父元素的堆叠顺序。

6. 创建新的堆叠上下文有这么几种情况:
- 当一个元素位于`HTML`文档的最外层（`<html>`元素）
- 当一个元素被定位了并且拥有一个`z-index`值（不为`auto`）
- 当一个元素被设置了`opacity`，`transforms`, `filters`, `css-regions`, `paged media`等属性

```html
<div class="parent1"><div class="item1"></div></div>
<div><div class="item2"></div></div>

<style>
.item1, .item2 {
  width: 100px;
  height: 100px;
}
.parent1 {
  transform: translate(0, 0);
}
.item1 {
  position: absolute;
  z-index: 999;
  background-color: blue;
}
.item2 {
  position: absolute;
  margin-left: 30px;
  background-color: yellow;
}
</style>
```

你会发现`item2`元素在`item1`元素之上，这就是因为`parent1`创建了新堆叠上下文，`item1`的`z-index:999`是基于这个堆叠上下文来的。如图所示:

![z-index](/img/zIndex3.png)
:::

## 参考

### [z-index的工作原理](https://www.w3cplus.com/css/how-z-index-works.html)
### [没人告诉你关于z-index的一些事](https://www.w3cplus.com/css/what-no-one-told-you-about-z-index.html)
### [Safari 3D transform变换z-index层级渲染异常的研究](https://www.zhangxinxu.com/wordpress/2016/08/safari-3d-transform-z-index/)
