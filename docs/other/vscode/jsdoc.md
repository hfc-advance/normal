---
id: vscodeJsdoc
title: jsdoc
hide_title: true
sidebar_label: 在vscode中有用的jsdoc标签
---

## 1. @link

设置超链接文本

### 语法

- {@link namepathOrURL}
- [link text]{@link namepathOrURL}
- {@link namepathOrURL|link text}
- {@link namepathOrURL link text (after the first space)}

### 示例

```typescript
/**
 * {@link https://google.com}
 *
 * [Google]{@link https://google.com}
 *
 * {@link https://google.com|Google}
 *
 * {@link https://google.com Google}
 */
function MyClass () {
}
```

对应结果如下:

![@link](/img/@link.png)

:::success {@link namepathOrURL|link text}
推荐使用`{@link https://google.com|Google}`的方式:

- 能够隐藏具体的链接
- 链接的别名`Google`也能点击跳转
:::

## 4. @deprecated

添加`@deprecated`会被视为弃用模块。

![@deprecated](/img/@deprecated.png)