---
id: eslintEditorconfig
title: editorconfig
hide_title: true
sidebar_label: .editorconfig
---

## 简介

> EditorConfig 既不检测代码也不格式化代码，主要是帮忙开发者在不同的编辑器之间定义一套标准的代码风格，让编辑器能够在`写`的时候就识别他的规则，然后应用这些规则。prettier 是在 `写完之后`格式化。

## 属性介绍

- `indent_style`：缩进风格，`tab` 为 hard-tabs，space 为 soft-tabs。

  :::info

  - `hard-tabs`：就是硬件的 `tab`，使用的是制表符也就是：`\t`。
  - `soft-tabs`：就是用空格实现的，一般是由2个或者4个空格实现的，使用的是空格符也就是：`\s`。
  :::

- indent_size：设置整数表示规定每级缩进的列数和 soft-tabs 的宽度（译注：空格数）。如果设定为 tab，则会使用 tab_width 的值（如果已指定）。
- tab_width：设置整数用于指定替代 tab 的列数。默认值就是 indent_size 的值，一般无需指定。
- end_of_line：定义换行符，支持 lf、cr 和 crlf。

  :::info
  不同的系统有不同的行结束习惯。想插入一个新行时，需要使用符合操作系统的行结束符号。
  > “回车”（CR，Carriage Return）和“换行”（LF，Line Feed）

  - 基于 Unix 的系统使用 `\n`作为行结束字符，
  - 基于 Windows 的系统使用 `\r\n`作为行结束字符，
  - 基于 Mac 的系统使用`\r`作为行结束字符。
  :::

- charset：编码格式，支持 latin1、utf-8、utf-8-bom、utf-16be 和 utf-16le，不建议使用 uft-8-bom。
- trim_trailing_whitespace：设为 true 表示会除去换行行首的任意空白字符，false 反之。
- insert_final_newline：设为 true 表明使文件以一个空白行结尾，false 反之。
- root：表明是最顶层的配置文件，发现设为 true 时，才会停止查找.editorconfig 文件。

## 通配符说明

|  通配符   | 说明  |
|  ----  | ----  |
| *  | 匹配除`/`之外的任意字符串 |
| **  | 匹配任意字符串 |
| ?  | 匹配任意单个字符 |
| [name]  | 匹配 name 字符 |
| [!name]  | 匹配非 name 字符 |
| {s1,s3,s3}  | 匹配任意给定的字符串（0 |

## 最佳配置

```yaml
root = true

[*]
charset = utf-8
indent_style = space
indent_size = 2
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true

[*.md]
trim_trailing_whitespace = false
```

## 注意事项

> .editorconfig 需要编辑器支持，有的编辑器内置支持，有的编辑器需要安装插件

比如 `vscode` 就需要安装插件支持：

```json title=".vscode/extension.json"
{
  "editorconfig.editorconfig"
}
```
