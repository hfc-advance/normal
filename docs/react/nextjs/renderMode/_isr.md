## 增量静态再生（ISR）

当浏览器请求已在构建时渲染生成的页面时，首先返回的是缓存的 HTML，10s 后页面开始重新渲染，页面成功生成后，更新缓存，浏览器再次请求页面时就能拿到最新渲染的页面内容了。

### ISR 运行步骤

1. 编译阶段生成静态 html，同 ssg 步骤
2. 用户请求 server
3. server 返回缓存的 html，间隔一定的时间之后构建重新生成对应的 html，更新原来的缓存 html

### Next.js ISR 开启

`getStaticProps` 返回 `revalidate`配置多少秒之后重新生成 html

```javascript
export async function getStaticProps() {
  const res = await fetch('https://.../posts')
  const posts = await res.json()

  return {
    props: {
      posts
    },
    // 10秒之后重新生成html
    // highlight-next-line
    revalidate: 10
  }
}

export async function getStaticPaths() {
  const res = await fetch('https://.../posts')
  const posts = await res.json()

  const paths = posts.map(post => ({
    params: {id: post.id}
  }))
  return {paths, fallback: 'blocking'}
}

export default Blog
```
