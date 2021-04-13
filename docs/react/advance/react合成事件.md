---
id: reactCombineEvent
title: react合成事件
hide_title: true
sidebar_label: 合成事件-不用清除事件的原理
---

:::important 简单总结
在 `react` 中绑定的事件并不会直接通过 `dom event` 作用在 `element` 上面，而是保存在 `filber` 上面，然后通过监听全局的事件，判断 `target`，然后再通过 `target` 对应到 `filber` 调用事件。
:::

:::success
所以组件卸载，也不用解绑事件。
:::

## 参考

- [React太劝退，通过anu学合成事件](https://mp.weixin.qq.com/s?__biz=MzkzMjIxNTcyMA==&mid=2247485256&idx=1&sn=1fa86d7d9c67d6d87154a82f5d0f09e5&chksm=c25e698ff529e0994835bb8d99a5b0d9279902add3cfae2fda69d1049efa0bb47771617636be&cur_album_id=1783121402896678912&scene=189#rd)
