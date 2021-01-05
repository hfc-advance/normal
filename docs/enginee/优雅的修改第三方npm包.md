---
id: projectUpdatePac
title: 如何优雅的修改npm包
hide_title: true
sidebar_label: 如何优雅的修改npm包
---

## 1. [patch-package](https://github.com/ds300/patch-package#readme)

:::success 原理

- 通过`npx patch-package packageName`生成`patch`包，放于项目中
- 添加`postinstall`钩子，修复包

  ```json
  "scripts": {
    "postinstall": "patch-package"
  }
  ```

:::
