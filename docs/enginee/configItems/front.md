---
id: frontProjectConfigItems
title: 工程配置项
hide_title: true
sidebar_label: 前端工程
---

import NodeMon, { rightToc as NodeMonRigthToc } from './nodemon/\_partial.md'
import Vscode, { rightToc as VscodeRightToc } from './vscode/\_partial.md'
import Runtime, { rightToc as RuntimeRigthToc } from './runtime/\_partial-runtime.md'
import Gitattributes, { rightToc as GitattributesRigthToc } from './gitattributes/\_partial.md'

<NodeMon />
<Vscode />
<Runtime />
<Gitattributes />

export const rightToc = [...NodeMonRigthToc, ...VscodeRightToc, ...RuntimeRigthToc, ...GitattributesRigthToc]
