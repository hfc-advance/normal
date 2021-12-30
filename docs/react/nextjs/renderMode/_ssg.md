## 静态生成（SSG）

> 静态生成：编译阶段将响应的路由直接编译成 html，数据请求可以在编译阶段生成，也可以在客户端渲染阶段执行

### SSG 运行步骤

1. 编译生成页面的 html
2. 用户发送请求到 server
3. server 将对应的 html 以及 js，返回到浏览器
4. 客户端渲染 html，执行 React 代码将 javascript 事件绑定，激活以让页面具有交互性，也称为`水合`

### Next.js SSG 开启

- 默认是开启 SSG 渲染模式，无非就是没有缓存数据
- `getStaticProps`和`getStaticPaths` 手动开启，并指定数据

### getStaticProps

```javascript
function Post(props) {
  const {postData} = props
  return <div>{postData.title}</div>
}

export async function getStaticProps(context) {
  // 模拟获取静态数据
  const postData = await getPostData()
  return {
    props: {postData}
  }
}
```

### getStaticPaths.fallback

- `fallback: false`：不降级，访问未编译生成的页面，直接返回 404
- `fallback: true`：生成一个没有数据的 html 返回浏览器，然后后台同步生成包含 props 数据的 json 文件返回到浏览器，再重新渲染这个数据
  1. 第一次访问：server 返回一个不包含 props 的 html 到浏览器
  2. server 端同步生成一个包含 props 的 json 文件，以及包含这个路径完整的 props 的 html 文件
  3. json 文件返回到浏览器，进行水合重新渲染页面，html 文件存放到服务器，用于下次直接使用
  4. 再次访问的时候，直接从之前构建完成的 html 返回给浏览器
  5. 浏览器直接渲染完整的 html
- `fallback: blocking`：不降级，并且要求用户请求一直等到新页面静态生成结束再返回到浏览器端，并缓存到服务器本地，供下次直接使用
