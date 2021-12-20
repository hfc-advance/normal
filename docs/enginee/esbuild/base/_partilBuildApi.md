## Build API

> `Build API`对一个文件或者多个文件进行操作，相互引用并捆绑在一起

```javascript
require('esbuild').buildSync({
  entryPoints: ['in.ts'],
  outfile: 'out.js'
})
```
