---
id: nodePackageEntry
title: package包的入口点
hide_title: true
sidebar_label: main,module,exports
---

## 简介

在包package.json文件中，两个字段可以定义包的入口点："main"和"exports"以及"module"。"main"所有版本的Node.js都支持该字段，但是其功能有限：它仅定义包的主要入口点。

:::warning

- module是一个提案，并不是一个常规配置。目前被`webpack4，rollup`等主流打包器使用。
- exports提供的功能比较完善，允许开发者定义对外的公共接口。没有定义的入口，怎么样都是不能访问的，即使直接子文件夹的形式也不可以访问：

  ```javascript
  import Vue from 'vue/dist/vue.esm.js'
  ```

  - 如果在支持`exports`的系统上，如果没有定义子目录访问路径，会抛出错误

  ```json
  {
    "exports": {
      "./dist": "./dist"
    }
  }
  ```

- exports目前在`webpack5`上面已经被使用。
:::

## exports

### 主入口点

可以使用`.`来定义主入口点。

```json
{
  "exports": {
    ".": "./main.js"
  }
}
```

或者:

```json
{
  "exports": "./main.js"
}
```

## 参考

[node package_entry_points](https://nodejs.org/api/packages.html#packages_package_entry_points)
