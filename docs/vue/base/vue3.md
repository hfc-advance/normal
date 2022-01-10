---
id: vue3Base
title: vue3Base
hide_title: true
sidebar_label: vue3基础用法
---

import GlobalProperties, { rightToc as GlobalPropertiesRightToc } from './vue3/globalProperty.md'
import PropsTypescript, { rightToc as PropsTypescriptRightToc } from './vue3/PropsTypescript.md'
import Emits, { rightToc as EmitsRightToc } from './vue3/emits.md'

<GlobalProperties />
<PropsTypescript />
<Emits />

export const rightToc = [
  ...GlobalPropertiesRightToc,
  ...PropsTypescriptRightToc,
  ...EmitsRightToc
]
