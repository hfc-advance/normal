---
id: cssVariables
title: css自定义变量
hide_title: true
sidebar_label: 自定义变量
---

## 使用技巧

### 1. 内联css变量

比如要动态设置一个背景图片，我们可以动态修改这个元素的某个变量，`css`里面直接使用这个变量

```html
<section class="hero" style="--bg-url: url('landscape.jpg')">
  <!-- Hero content -->
</section>
```

![css-variable](/img/hero-s1-variables.png)
