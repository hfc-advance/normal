## 查找匹配

### globby

> [globby](https://github.com/sindresorhus/globby) 匹配文件或目录，支持通配符

```javascript
├── unicorn
├── cake
└── rainbow
```

```jsx
import { globby } from 'globby'

const paths = await globby(['*', '!cake'])

console.log(paths)
//=> ['unicorn', 'rainbow']
```

### node-glob

> [node-gloy](https://github.com/isaacs/node-glob) 匹配文件或目录，支持通配符，比[globby](#globby) 支持的通配符更多。

```javascript
var glob = require('glob')

// options is optional
glob('**/*.js', options, function (er, files) {
  // files is an array of filenames.
  // If the `nonull` option is set, and nothing
  // was found, then files is ["**/*.js"]
  // er is an error object or null.
})
```
