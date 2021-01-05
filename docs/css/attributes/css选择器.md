---
id: cssSelector
title: css选择器
hide_title: true
sidebar_label: 选择器
---

## 组合选择器

### 1. 后代选择器

所有后代指的是，某个元素下面`任意层级的元素`

- `语法`：`A B`

```css
div .item {
  color: blue;
}
```

`div`元素下面的子级，子孙级类名`.item`的元素

### 2. 子代选择器

所谓子代指的是，某个元素下面的`直接子级的元素`

- `语法`：`A > B`

```css
div .item {
  color: blue;
}
```

`div`元素下面的直接子级类名`.item`的元素

### 3. 兄弟选择器

所谓兄弟指的是，某个元素直接对应同一个`父级`

- `语法`：`A ~ B`

```css
div ~ .item {
  color: blue;
}
```

和`div`元素共用一个父级而且类名`.item`的元素

### 4. 紧邻兄弟选择器

所谓紧邻兄弟，就是两个元素直接对应同一个`父级`，而且这两个元素还是`紧紧挨着`

- `语法`：`A + B`

```css
div + .item {
  color: blue;
}
```

紧挨着`div`元素的`.item`元素
