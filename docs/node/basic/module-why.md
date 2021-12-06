---
id: nodeModuleWhy
title: 模块化解决什么问题
hide_title: true
sidebar_label: 模块化解决什么问题
---

> 一句话概括：限制作用域的同时，还可以明确的安排自己作用域内的哪些数据能够提供给别的作用域使用。

一次只需要考虑几个变量，事情就会变得简单。`JavaScript` 有一种方法来帮助你做到这一点，叫做`作用域`。由于作用域在 `JavaScript` 中的工作方式，函数不能访问在其他函数中定义的变量<div class="line-space-normal"></div>
这很棒！这意味着当你在一个函数中编码时，你只需要考虑当前这个函数了。你不必再担心其他函数可能会对你的变量做什么了。<div class="line-space-normal"></div>
虽然是这样没错，但是它也有不好的地方。这会让你很难去在不同的函数之间去共享变量。<div class="line-space-normal"></div>
要解决这个问题，于是就会提升变量到更高一层的作用域，甚至到全局作用域。<div class="line-space-normal"></div>

> 比如早期使用 `Jquery` 的时候，在你使用 `jQuery API` 之前，你不得不去把 `jQuery` 引入到全局作用域。

![module-why-global](../../../static/img/global_module_scope_.png)
