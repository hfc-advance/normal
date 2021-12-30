## SSR + CSR

- 首次加载页面走 SSR：保证首屏加载速度的同时，并且满足 SEO 的诉求
- 页面切换走 CSR：Next.js 会发起一次网络请求，执行 getServerSideProps 函数，拿到它返回的数据后，进行页面渲染

:::danger

1. 点击发送请求的同时，页面的静态资源也会同步加载，但是渲染的时机是在 getServerSideProps 返回数据之后，所以有可能会造成点击卡顿

:::
