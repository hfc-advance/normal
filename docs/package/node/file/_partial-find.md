## 查找匹配

### globby

> [globby](https://github.com/sindresorhus/globby) 匹配文件或目录，支持通配符

```javascript
├── unicorn
├── cake
└── rainbow
```

```jsx
import {globby} from 'globby';

const paths = await globby(['*', '!cake']);

console.log(paths);
//=> ['unicorn', 'rainbow']
```