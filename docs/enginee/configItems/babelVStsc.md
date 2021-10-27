---
id: frontProjectBABELvsTSC
title: babel vs tsx
hide_title: true
sidebar_label: babel vs tsc
---

import BabelGoods, { rightToc as BabelGoodsRigthToc } from './babelVStsc/_babelGoodsPartial.md'
import TscGoods, { rightToc as TscGoodsRigthToc } from './babelVStsc/_tscGoodsPartial.md'
import TscConfig, { rightToc as TscConfigRigthToc } from './babelVStsc/_tscConfig.md'

<BabelGoods />
<TscGoods />
<TscConfig />

export const rightToc = [...BabelGoodsRigthToc, ...TscGoodsRigthToc, ...TscConfigRigthToc]
