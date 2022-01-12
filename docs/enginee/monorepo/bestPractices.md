---
id: MonorepoBestPractices
title: monorepo 最佳实践
hide_title: true
sidebar_label: 最佳实践
---

## 技术选型

1. monorepo 支持： pnpm workspace
2. lerna 替代方案：changesets
3. 依赖拓扑链路解决方案：turborepo

## 项目目录结构

### site + library

站点项目混合 library 类型的项目：既可以发布站点又支持产出`npm`公共包

```json
.
├── apps
│   ├── docs
│   └── web
├── packages
│   ├── ele-lib
│   └── ele-ui
└── package.json

{
  "workspaces": [
    "apps/*",
    "packages/*"
  ],
  "scripts": {
    "build": "turbo run build",
    "dev": "turbo run dev"
  }
}
```
