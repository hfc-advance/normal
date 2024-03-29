---
id: cachePerformance
title: http缓存
hide_title: true
sidebar_label: http缓存
---

## 1. http缓存

`HTTP`缓存有几种不同的类型，这些可以分为两个主要类别：`私有缓存` 和 `共享缓存`。

###1 私有缓存

可以使用 `private` 来实现私有缓存，这与 `public` 的用法相反，缓存服务器只对特定的客户端进行缓存，其他客户端发送过来的请求，缓存服务器则不会返回缓存。它的一般表示方法如下

```
Cache-Control: private
```

![privateCache](/img/privateCache.png)

<div class='success'>

配合`max-age`来使用: `Cache-Control: private, max-age=30672000`

</div>

<div class='warning'>

对于需要登录才能访问到资源，`Cache-Control` 应该设置成 `private` 以禁止代理服务器缓存这些资源，否则会威胁信息安全。

</div>

###2 共享缓存

共享缓存是一种用于存储要由多个用户重用的响应缓存。共享缓存一般使用 `public` 来表示，`public` 属性只出现在客户端响应中，表示响应可以被任何缓存所缓存。一般表示方法如下

```
Cache-Control: public
```

![publicCache](/img/publicCache.png)

<div class='success'>

简要说明就是存在缓存服务器或者`cdn`的时候，只要有用户访问过，那么后面的用户就只用存缓存服务器读取就可以了

配合`max-age`来使用: `Cache-Control: public, max-age=30672000`

</div>
