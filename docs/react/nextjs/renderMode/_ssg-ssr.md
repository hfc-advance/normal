## SSG + SSR

在上面介绍的 ISR 方案时提及过，ISR 的实质是 SSG + SSR：

- 静态内容走 SSG：编译构建时把相对静态的页面预先渲染生成 HTML，浏览器请求时直接返回静态 HTML
- 动态内容走 SSR：浏览器请求未预先渲染的页面，在运行时通过 SSR 渲染生成页面，然后返回到浏览器，并缓存静态 HTML，下次命中缓存时直接返回

```javascript
export async function getStaticProps() {
  const res = await fetch('https://.../posts')
  const posts = await res.json()

  return {
    props: {
      posts
    },
    revalidate: 10
  }
}

export async function getStaticPaths() {
  const res = await fetch('https://.../posts')
  const posts = await res.json()
  const paths = posts.map(post => ({
    params: {id: post.id}
  }))

  // 访问没有编译生成的页面，会在服务堵塞先生成html，返回到浏览器端渲染，同步保存在服务器端用于下次直接渲染
  // highlight-next-line
  return {paths, fallback: 'blocking'}
}
```
