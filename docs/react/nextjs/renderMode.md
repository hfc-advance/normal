---
id: reactNextJsRenderMode
title: next.js 渲染模式
hide_title: true
sidebar_label: 渲染模式
---

import SSR , { rightToc as ssrRightToc } from './renderMode/\_ssr.md'
import SSG , { rightToc as ssgRightToc } from './renderMode/\_ssg.md'
import ISR , { rightToc as isrRightToc } from './renderMode/\_isr.md'
import SSR_CSR , { rightToc as ssr_csrRightToc } from './renderMode/\_ssr-csr.md'
import SSG_CSR , { rightToc as ssg_csrRightToc } from './renderMode/\_ssg-csr.md'
import SSG_SSR , { rightToc as ssg_ssrRightToc } from './renderMode/\_ssg-ssr.md'

<SSR />
<SSG />
<ISR />
<SSR_CSR />
<SSG_CSR />
<SSG_SSR />

export const rightToc = [
...ssrRightToc,
...ssgRightToc,
...isrRightToc,
...ssr_csrRightToc,
...ssg_csrRightToc,
...ssg_ssrRightToc
]
