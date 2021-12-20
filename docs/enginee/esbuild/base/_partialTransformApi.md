## Transform API

> `Transform API`不需要访问文件系统，直接对字符串进行操作，这使得它非常适合在没有文件系统的环境中使用，比如浏览器中

```javascript
require('esbuild').transformSync('let x: number = 1', {
  loader: 'ts'
})
```
