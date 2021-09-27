## 删除

### del

> [del](https://github.com/sindresorhus/del) 删除文件和目录，支持通配符

```jsx
const del = require('del');
(async () => {
  const deletedFilePaths = await del(['temp/*.js', '!temp/unicorn.js']);
  const deletedDirectoryPaths = await del(['temp', 'public']);

  console.log('Deleted files:\n', deletedFilePaths.join('\n'));
  console.log('\n\n');
  console.log('Deleted directories:\n', deletedDirectoryPaths.join('\n'));
})();
```