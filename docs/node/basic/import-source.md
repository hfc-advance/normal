---
id: nodeImportSourceCode
title: import加载原理
hide_title: true
sidebar_label: import原理
---

## 原理

> `javascript`是一门`解释执行`语言，也就是`javascript引擎`边编译边执行。

`JS 引擎`对脚本静态分析的时候，遇到模块加载命令 `import`，就会生成一个`只读引用`。等到脚本真正执行时，再根据这个只读引用，到被加载的那个模块里面去取值。

## 特点

### ESM 是引用，CommonJS 是浅拷贝

> `ES Module`导入和导出都是执行的同一个引用，也就是导出模块的`原始值`变了，导入的值也会发生改变
