---
id: frontProjectBABELvsTSC
title: babel vs tsx
hide_title: true
sidebar_label: babel vs tsc
---

import BabelGoods, { rightToc as BabelGoodsRigthToc } from './babelVStsc/_babelGoodsPartial.md'
import TscGoods, { rightToc as TscGoodsRigthToc } from './babelVStsc/_tscGoodsPartial.md'
import BabelAndTsc, { rightToc as BabelAndTscRigthToc } from './babelVStsc/_babel&tsc.md'

<BabelGoods />
<TscGoods />
<BabelAndTsc />

export const rightToc = [...BabelGoodsRigthToc, ...TscGoodsRigthToc, ...BabelAndTscRigthToc]
