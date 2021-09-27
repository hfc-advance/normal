## 请求数据

### got 强大的http请求库

> [got](https://github.com/sindresorhus/got) 功能非常强大的 http 请求库，支持各种插件

```jsx
import got from 'got';
const {data} = await got.post('https://httpbin.org/anything', {
  json: {
    hello: 'world'
  }
}).json();

console.log(data);
//=> {"hello": "world"}
```