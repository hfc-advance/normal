---
id: cssNormalStyle
title: 统一样式
hide_title: true
sidebar_label: 项目统一样式
---

### 移除数字输入框的箭头

```css
input[type="number"] {
  -moz-appearance: textfield;
}
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
```

- 数字键盘箭头

![numberArrow](/img/inputmode-2.png)
