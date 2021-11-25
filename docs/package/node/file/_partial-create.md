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

### tmp

> [tmp](https://github.com/raszi/node-tmp) 在缓冲区创建临时文件或者目录，读写文件速度更高效

```javascript
const tmp = require('tmp');

tmp.file(function _tempFileCreated(err, path, fd, cleanupCallback) {
  if (err) throw err;

  console.log('File: ', path);
  console.log('Filedescriptor: ', fd);

  // If we don't need the file anymore we could manually call the cleanupCallback
  // But that is not necessary if we didn't pass the keep option because the library
  // will clean after itself.
  cleanupCallback();
});

```
