## 复制文件

### cpy

> [cpy](https://github.com/sindresorhus/cpy) 复制文件或目录，支持通配符

```jsx
import cpy from 'cpy';

await cpy([
  'source/*.png', // Copy all .png files
  '!source/goat.png', // Ignore goat.png
], 'destination');

// Copy node_modules to destination/node_modules
await cpy('node_modules', 'destination');

// Copy node_modules content to destination
await cpy('node_modules/**', 'destination');

// Copy node_modules structure but skip all files except package.json files
await cpy('node_modules/**/*.json', 'destination');

// Copy all png files into destination without keeping directory structure
await cpy('**/*.png', 'destination', {flat: true});

console.log('Files copied!');
```