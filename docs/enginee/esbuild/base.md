---
id: esbuildBase
title: esbuild基础
hide_title: true
sidebar_label: 基础配置
---

import TransformAPI, { rightToc as TransformAPIToc } from './base/\_partialTransformApi.md'
import BuildAPI, { rightToc as BuildAPIToc } from './base/\_partilBuildApi.md'
import Options, { rightToc as OptionsToc } from './base/\_partialOptions.md'
import Serve, { rightToc as ServeToc } from './base/\_partialServe.md'

<TransformAPI />
<BuildAPI />
<Serve />
<Options />

export const rightToc = [
...TransformAPIToc,
...BuildAPIToc,
...ServeToc,
...OptionsToc
]
