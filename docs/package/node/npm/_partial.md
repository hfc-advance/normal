## 查询 registry 信息

### pacote

> [pacote](https://github.com/npm/pacote) 从 `npm registry` 查询包的信息，以及下载包

```jsx
const pacote = require('pacote')

// get a package manifest
pacote.manifest('foo@1.x').then(manifest => console.log('got it', manifest))

// extract a package into a folder
pacote.extract('github:npm/cli', 'some/path', options)
  .then(({from, resolved, integrity}) => {
    console.log('extracted!', from, resolved, integrity)
  })

pacote.tarball('https://server.com/package.tgz').then(data => {
  console.log('got ' + data.length + ' bytes of tarball data')
})
```