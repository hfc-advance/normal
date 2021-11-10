---
id: frontProjectConfigItems
title: 工程配置项
hide_title: true
sidebar_label: 前端工程
---

import NodeMon, { rightToc as NodeMonRightToc } from './nodemon/\_partial.md'
import Vscode, { rightToc as VscodeRightToc } from './vscode/\_partial.md'
import Runtime, { rightToc as RuntimeRightToc } from './runtime/\_partial-runtime.md'
import Gitattributes, { rightToc as GitattributesRightToc } from './gitattributes/\_partial.md'
import JsConfigJson, { rightToc as JsConfigJsonRightToc } from './jsconfigjson/\_partial.md'
import FileCheckJson, { rightToc as FileCheckRightToc } from './fileNameLint/\_lsLintPartial.md'

<NodeMon />
<Vscode />
<Runtime />
<Gitattributes />
<JsConfigJson />
<FileCheckJson />

export const rightToc = [...NodeMonRightToc, ...VscodeRightToc, ...RuntimeRightToc, ...GitattributesRightToc, ...JsConfigJsonRightToc, ...FileCheckRightToc]
