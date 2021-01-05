---
id: cssLineHeight
title: css中的line-height
hide_title: true
sidebar_label: line-height
---

## 1. 理解 line-height

![line-height](/img/o_line_height.png)

![line-height](/img/o_text_018.gif)

:::important 说明

- 行高指的是两行文本基线之间的距离
- 基线并不是汉字的下端沿，而是英文字母`x`的下端沿
:::

## 2. line-box

`line-box`工作就是包裹每行文字。一行文字一个`line boxes`。

> 例如“艾佛森退役”这5个字，如果它们在一行显示，你艾佛森再牛逼，对不起，只有一个line boxes罩着你；但“春哥纯爷们”这5个字，要是竖着写，一行一个，那真是够爷们，一个字罩着一个line boxes，于是总计五个line boxes。line boxes什么特性也没有，就高度。所以一个没有设置height属性的div的高度就是由一个一个line boxes的高度堆积而成的。

:::important 说明

- 一个没有设置`height`属性的`div`的高度就是由一个一个`line boxes`的高度堆积而成的。
- line boxes只是个考察汇报人员，考察它的手下谁的实际line-height值最高，谁最高，它就要谁的值，然后向上汇报，形成高度。例如，`<span style="line-height:20px;">`取手下`line-height<span style="line-height:40px;">`最高`</span>`的值`</span>`。则line boxes的高度就是40像素了。
:::

:::success 行高的垂直居中性
`line-height`的最终表现是通过`line boxes`实现的，而无论`line boxes`所占据的高度是多少（无论比文字大还是比文字小），其占据的空间都是与文字内容公用水平中垂线的。

![line-box](/img/2009-11-28_002310.png)

看`test1`的结果，此时`line boxes`的高度为`0`，但是它是以文字的水平中垂线对称分布的。这一重要的特性可以用来实现文字或图片的垂直居中对齐。
:::

## 3. 实际应用

### 1. 单行文本垂直居中

之前都是把`line-height`值设置为`height`一样大小的值可以实现单行文字的垂直居中。

:::tip 提示
实际只需要把`line-height`设置为您需要的`box`的大小可以实现单行文字的垂直居中，而不需要设置`height`。
:::

### 2. 多行文本垂直居中

对于高度固定的`div`，里面文字单行或多行显示，字体大小有大有小的情况怎么办呢？方法之一就是借助于`line-height`和`displya: inline-block`。

```jsx live
function Item () {
  const boxStyle = { lineHeight: '300px', width: '100px', height: '300px', border: '1px solid blue', fontSize: 0 }

  return (
    <div style={boxStyle}>
      <div style={{ display: 'inline-block', fontSize: '16px', lineHeight: 'normal', 'verticalAlign': 'middle' }}>发动机拉发送到了飞机考虑的<br />123</div>
      <span>x</span>
    </div>
  )
}
```

:::important 重要提示

- `line-height`的最终表现是通过`line boxes`实现的，也就是说`line-height`只对`line boxes`起作用
- `displya: inline-block`里面的包裹的内容无论多少行，都是一个`line boxes`,比较特殊。
- `line-height`只对`display: inline`或者是`display: inline-block`的元素有用

:::

:::tip 为什么可以垂直居中
文字后面（前面）有个类似空格字符的节点，然后就能响应`line-height`形成高度，此时，文字再来个`vertical-align:middle`，当当当当，就可以和这个被行高撑高的「幽灵空白节点」(近似)垂直对齐了。
:::

## 参考

- [深入理解CSS中的行高](https://www.cnblogs.com/rainman/archive/2011/08/05/2128068.html)
- [css行高line-height的一些深入理解及应用](https://www.zhangxinxu.com/wordpress/2009/11/css%e8%a1%8c%e9%ab%98line-height%e7%9a%84%e4%b8%80%e4%ba%9b%e6%b7%b1%e5%85%a5%e7%90%86%e8%a7%a3%e5%8f%8a%e5%ba%94%e7%94%a8/)
- [CSS深入理解vertical-align和line-height的基友关系](https://www.zhangxinxu.com/wordpress/2015/08/css-deep-understand-vertical-align-and-line-height/)
