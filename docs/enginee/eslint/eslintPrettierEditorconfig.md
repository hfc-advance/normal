---
id: eslintPrettierEslintEditorconfig
title: eslint prettier editorconfig 三者区别
hide_title: true
sidebar_label: eslint prettier editorconfig 三者区别
---

## 简介

> 这三个工具都有类似的目标：**保持代码本身以及团队成员之间代码的 一致性**。

- **[ESLint](https://link.juejin.cn/?target=http%3A%2F%2Feslint.org)** 是目前最受欢迎的 `Javascript` 代码检测工具。它会静态分析你的代码，主要做三件事：
    1. 检查丑陋的代码风格。
    2. 检查有风险的代码问题，也就是质量问题。
    3. 格式化代码，但是不专业。

- **[Prettier](https://link.juejin.cn/?target=http%3A%2F%2Fprettier.io%2F)** 是**`跨语言`** 的  代码检测以及格式化工具，主要有以下几个特点：
    1. 检查丑陋的代码风格，这和 `eslint` 一样。
    2. 跨语言，他支持 Javascript、JSX、Flow、JSON、HTML、CSS、JAVA等等。

- **[EditorConfig](https://link.juejin.cn/?target=http%3A%2F%2Feditorconfig.org%2F)** 既不检测代码也不格式化代码，主要是帮忙开发者在不同的编辑器之间定义一套标准的代码风格，让编辑器能够在写的时候就识别他的规则。

## 为什么三个工具要同时使用？

> `eslint` 已经具备代码自动格式化的功能了，为什么还要用 `prettier`？`prettier` 不需要编辑器的配置就能格式化丑陋的代码，为什么还要用 `editorConfig`?

### 为了回答第一个灵魂拷问，你应该谨记代码检查工具（linters）本质上有两类规则：

- **格式化规则**：防止代码风格不一致 & 避免丑陋的代码风格（比如：`max-len`, `no-mixed-spaces-and-tabs`, `keyword-spacing`, `comma-style` 等等）

- **代码质量规则**：防止无用和错误代码（比如：`no-unused-vars`, `no-extra-bind`, `no-implicit-globals`, `prefer-promise-reject-errors` 等等）

`ESLint` 能够应用这两类规则，如果可以的话，它还能自动修复代码。另一方面，`Prettier` 只能检查代码中的格式错误，但是它却`**比 ESLint 更专业**`。

### 回答 “为什么有eslint还需要有prettier”

> 虽然`eslint`有格式化功能，而且还非常强大能够格式化一些有代码质量的代码，这点`prettier`肯定做不到，因为`prettier`只能格式化风格不一致的代码，但是 **`prettier更专业`**

:::caution 举例说明
比如 `eslint` 的 `max-len` 就不能 `fix`，但是 `prettier` 的 `print-width` 可以自动格式化。
:::

### 回答 “为什么prettier可以跨编辑器格式化了，还需要editorConfig”
主要就是时机的问题：`EditorConfig` 的作用是配置你的编辑器，以便你所编写的代码***已经是格式良好的**了*，而 `Prettier` 要做的则是格式化你已经编写的代码。
