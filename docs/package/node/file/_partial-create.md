## 创建

### make-dir

> [make-dir](https://github.com/sindresorhus/make-dir) 递归创建目录

```jsx
const makeDir = require('make-dir');
(async () => {
  const path = await makeDir('unicorn/rainbow/cake');

  console.log(path);
  //=> '/Users/sindresorhus/fun/unicorn/rainbow/cake'
})();
```