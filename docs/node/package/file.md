---
id: nodePkgFile
title: 文件操作
hide_title: true
sidebar_label: 文件操作
---

## 查找文件

### [escalade](https://github.com/lukeed/escalade) 从下往上查找文件

![escalade](/img/escalade.gif)

### [totalist](https://github.com/lukeed/totalist) 递归的方式查询所有的文件，以及文件的`stats`信息

```javascript
import { totalist } from 'totalist/sync';

const styles = new Set();
const scripts = new Set();

totalist('src', (name, abs, stats) => {
  if (/\.js$/.test(name)) {
    scripts.add(abs);
    if (stats.size >= 100e3) {
      console.warn(`[WARN] "${name}" might cause performance issues (${stats.size})`);
    }
  } else if (/\.css$/.test(name)) {
    styles.add(abs);
  }
});

console.log([...scripts]);
//=> [..., '/Users/lukeed/.../src/path/to/example.css', ...]
```

### [mk-dirs](https://github.com/lukeed/mk-dirs) 递归的方式创建目录

```javascript
import { mkdir } from 'mk-dirs';
import { resolve } from 'path';

// Async/await
try {
  let output = await mkdir('foo/bar/baz');
  console.log(output); //=> "/Users/hello/world/foo/bar/baz"
} catch (err) {
  //
}
```
