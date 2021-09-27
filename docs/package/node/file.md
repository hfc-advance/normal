---
id: nodeToolFile
title: 文件操作
hide_title: true
sidebar_label: 文件操作
---

import Delete, { rightToc as DeleteRightToc } from './file/_partial-delete.md'
import Find, { rightToc as FindRightToc } from './file/_partial-find.md'
import Copy, { rightToc as CopyRightToc } from './file/_partial-copy.md'
import Create, { rightToc as CrteateRightToc } from './file/_partial-create.md'
import Download, { rightToc as DownloadRightToc } from './file/_partial-download.md'

<Delete />
<Find />
<Copy />
<Create />
<Download />

export const rightToc = [
  ...DeleteRightToc,
  ...FindRightToc,
  ...CopyRightToc,
  ...CrteateRightToc,
  ...DownloadRightToc
]
