---
id: reactPerformance
title: react - 性能优化
hide_title: true
sidebar_label: 性能优化
---

import Idea, { rightToc as ideaRightToc } from './performance/\_idea.md'
import ReuseFiber, { rightToc as reuseFiberRightToc } from './performance/\_reuseFiber.md'
import BatchUpdate, { rightToc as batchUpdateRightToc } from './performance/\_batchUpdate.md'

<Idea />
<ReuseFiber />
<BatchUpdate />

export const rightToc = [
...ideaRightToc,
...reuseFiberRightToc,
...batchUpdateRightToc
]
