## option

配置项

### bundle

> 启用这个配置意味着将所有的依赖项(`node_modules`,`本地文件`)都打包到一个文件中。

```shell
esbuild main.ts --bundle
```

:::danger

- 当有多个入口文件的时候，启用`bundle`并不会将多个入口文件打包到一起，而是输出多个捆绑包，不能达到串联的目的

  ```shell
  esbuild main.ts app.ts --bundle --outdir=dist
  ```

  ```javascript title="多个入口多个输出文件"
  .
  ├── dist
  │   └── main.js
  │   └── app.js
  ```

:::

### define

> `define`构建期间替换代码中的标识符，改变代码。

```javascript
let js = 'DEBUG && require("hooks")'

require('esbuild').transformSync(js, {
  define: {DEBUG: 'true'}
})

/* {
  code: 'require("hooks");\n',
  map: '',
  warnings: []
} */
```

:::danger

- 以字符串的形式替换，需要另外添加引号

```javascript
require('esbuild').transformSync('id, str', {
  define: {id: 'text', str: '"text"'}
})

/* {
  code: 'text, "text";\n',
  map: '',
  warnings: []
} */
```

:::

### entryPoints

> `entryPoints`指定编译的入口文件，是一个数组，数组里面的每一个文件都会作为一个单独的入口点来编译，编译器会自动寻找每个入口点里面的依赖进行打包。

```javascript
require('esbuild').buildSync({
  entryPoints: ['home.ts', 'settings.ts'],
  bundle: true,
  write: true,
  outdir: 'out'
})
```

将生成两个文件`out/home.js`和`out/settings.js`，这两个文件是分开的文件都有各自的依赖项。

:::danger

- `entryPoints`的路径是相对于`process.cwd()`的路径，比如`entryPoints: ["home.ts"]`实际上就是`path.join(process.cwd(), 'home.ts')`
- 针对每个`entryPoints`设置输入文件名称：

  ```javascript
  require('esbuild').buildSync({
    entryPoints: {
      out1: 'home.js',
      out2: 'settings.js'
    },
    bundle: true,
    write: true,
    outdir: 'out'
  })
  ```

  通过设置`entryPoints`为对象，为每个入口文件设置名称，上面的代码将生成`out/out1.js`,`out/out2.js`

- `TODO`:不设置`bundle`捆绑到一个包的情况下，将一个入口文件下面的依赖项打包到输入目录下

:::

### entryNames

> `entryNames`控制每个入口文件对应编译后文件的名称，支持带有占位符的模板来配置输出文件的路径和名称：`[dir]/[name]-[hash]`

- `dir`：入口文件相对于`outbase`目录的相对路径：

  ```javascript
  esbuild.build({
    entryNames: '[dir]/[name]-[hash]',
    outbase: './src',
    bundle: true,
    outdir: 'out',
    entryPoints: ['src/detail/index.ts']
  })
  ```

  ```javascript title="文件目录"
  .
  ├── out
  │   └── detail
  │       └── index-UMQFD2QU.js
  └── src
      └── detail
          └── index.ts
  ```

  入口文件`src/detail/index.ts`相对于`outbase`目录的路径是`detail/index.ts`，所以最终输入的路径就是：`out/detail`

:::danger
不设置`outbase`或者`outbase:""`是空字符串的时候，`dir`就是和入口文件的目录相同，也就是直接输出文件到`outDir`下面。
:::

### outExtension

> `outExtension`指定输入文件的后缀名

```javascript
esbuild.build({
  bundle: true,
  outdir: 'out',
  entryPoints: ['src/detail/index.ts'],
  // highlight-start
  outExtension: {
    '.js': '.mjs'
  }
  // highlight-end
})
```

### outbase

> `outbase` 设置输出目录

```javascript
require('esbuild').buildSync({
  entryPoints: ['src/pages/home/index.ts', 'src/pages/about/index.ts'],
  bundle: true,
  outdir: 'out',
  outbase: 'src'
})
```

- `src/pages/home/index.ts`相对于`outbase`的目录就是：'./pages/homde/index.ts'所以加上`outdir`最终就是：`out/pages/home/index.js`

### outdir

> `outdir`设置输出文件的目录

### outfile

> `outfile`设置输出文件的名称，仅适用于只有单个入口文件的情况，如果有多个入口必须采用[outdir](#outdir)

```javascript
require('esbuild').buildSync({
  entryPoints: ['app.js'],
  bundle: true,
  outfile: 'out.js'
})
```

### external

> `external`排除捆绑包之外，当设置`bundle`的时候，会把所有的依赖都打进一个包里面，设置了`external`之后，就会保留`import`或者`require`的运行时语法，而不是打包到一个文件里面

```javascript
require('fs').writeFileSync('app.js', 'require("fsevents")')

require('esbuild').buildSync({
  entryPoints: ['app.js'],
  outfile: 'out.js',
  bundle: true,
  platform: 'node',
  external: ['fsevents']
})
```

### format

> `format`设置输出文件的模块规范：

- `iife`：生成代码在一个立即调用的执行函数内部，主要用于浏览器端，避免内部变量污染全局。

```javascript
let js = 'alert("test")'
let out = require('esbuild').transformSync(js, {
  format: 'iife'
})
```

```javascript title="输出文件"
;(() => {
  // src/detail/index.ts
  alert('test')
})()
```

:::danger
当没有设置`format`而且没有启动`bundle`的时候，文件默认会输出`iife`格式
:::

- `cjs`
- `esm`

### inject

> `inject`导入另一个文件的导出来自动替换每一个编译文件用到的全局变量

```javascript
// process-shim.js
export let process = {
  cwd: () => ''
}
// entry.js
console.log(process.cwd())
// esbuild
require('esbuild').buildSync({
  entryPoints: ['entry.js'],
  bundle: true,
  inject: ['./process-shim.js'],
  outfile: 'out.js'
})

// out.js
let process = {cwd: () => ''}
console.log(process.cwd())
```

:::danger

- 如果文件中的全局变量或者方法没有用到这个`inject`文件导出的变量或者方法，那么不会注入进来。
- 文件的范围就是所有的输出文件如果有用到注入的变量或者方法，那么输出的文件就会被注入进去。
- 如果`inject`的文件没有导出，也就是不是一个模块化文件，也就是说这个文件有副作用，即使编译文件没有引用到注入文件的数据，每个编译文件依然会在最顶层注入这个文件的代码，相当于直接引入`import 'file.js'`

  ```javascript
  // process-shim.js
  let uninject = {
    cwd: () => ''
  }
  // entry.js
  console.log(process.cwd())

  // out.js
  // highlight-next-line
  let uninject = {cwd: () => ''}
  console.log(process.cwd())
  ```

- 和`define`结合使用：

```javascript
// process-shim.js
export function dummy_process_cwd() {
  return ''
}
// entry.js
console.log(process.cwd())
// esbuild
require('esbuild').buildSync({
  entryPoints: ['entry.js'],
  bundle: true,
  define: {'process.cwd': 'dummy_process_cwd'},
  inject: ['./process-shim.js'],
  outfile: 'out.js'
})
```

```javascript title="输出文件"
// out.js
function dummy_process_cwd() {
  return ''
}
console.log(dummy_process_cwd())
```

可以看到最终会先执行替换字符串，然后再判断是否需要注入
:::

比如自动导入`JSX`

```javascript
// react-shim.js
import * as React from 'react'
export {React}

require('esbuild').buildSync({
  entryPoints: ['app.jsx'],
  bundle: true,
  inject: ['./react-shim.js'],
  outfile: 'out.js'
})
```

### loader

> `loader`指定每种文件的解释方式

例如将图片解析成`baset64`格式:

```javascript
require('esbuild').buildSync({
  entryPoints: ['app.js'],
  bundle: true,
  loader: {
    '.png': 'dataurl',
    '.svg': 'text'
  },
  outfile: 'out.js'
})
```

支持的解析方式有：

- `javascript`
- `typescript`
- `jsx`
- `tsx`
- `json`
- `css`
- `text`
- `binary`
- `base64`
- `dataurl`
- `file`：将文件复制到输出目录，并将文件名作为一个字符串嵌入捆绑包中，以`export default`的方式导出：

```javascript
import url from './example.png'
let image = new Image()
image.src = url
document.body.appendChild(image)

require('esbuild').buildSync({
  entryPoints: ['app.js'],
  bundle: true,
  loader: {'.png': 'file'},
  outdir: 'out'
})
```

### minify

> `minify`是否启动压缩
