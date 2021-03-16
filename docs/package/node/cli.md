---
id: nodeToolCli
title: 常用的cli资源包
hide_title: true
sidebar_label: cli
---

## 解析命令行参数

### [![1. minimist 格式化参数成对象的形式](https://img.shields.io/github/stars/substack/minimist?label=minimist&style=social)](https://github.com/substack/minimist)

可以将命令行参数格式化成对象的格式

```shell
node example/parse.js -x 3 -y 4 -n5 -abc --beep=boop foo bar baz
```

```javascript
var argv = require('minimist')(process.argv.slice(2));
console.log(argv);

// { _: [ 'foo', 'bar', 'baz' ], x: 3, y: 4, n: 5, a: true, b: true, c: true, beep: 'boop' }
```

### [![2. yargs 海盗风格的命令行提示](https://img.shields.io/github/stars/yargs/yargs?label=yargs&style=social)](https://github.com/yargs/yargs)

```shell
#!/usr/bin/env node
require('yargs') // eslint-disable-line
  .command('serve [port]', 'start the server', (yargs) => {
    yargs
      .positional('port', {
        describe: 'port to bind on',
        default: 5000
      })
  }, (argv) => {
    if (argv.verbose) console.info(`start server on :${argv.port}`)
    serve(argv.port)
  })
  .option('verbose', {
    alias: 'v',
    type: 'boolean',
    description: 'Run with verbose logging'
  })
  .argv
```

![yargs](/img/yarg_screen.png)

## 版本

### [![1. node-semver 快速比较版本或者校验版本](https://img.shields.io/github/stars/npm/node-semver?label=node-semver&style=social)](https://github.com/npm/node-semver)

快速比较版本或者校验版本

```javascript
const semver = require('semver')

semver.valid('1.2.3') // '1.2.3'
semver.valid('a.b.c') // null
semver.clean('  =v1.2.3   ') // '1.2.3'
semver.satisfies('1.2.3', '1.x || >=2.5.0 || 5.0.0 - 7.2.3') // true
semver.gt('1.2.3', '9.8.7') // false
semver.lt('1.2.3', '9.8.7') // true
semver.minVersion('>=1.0.0') // '1.0.0'
semver.valid(semver.coerce('v2')) // '2.0.0'
semver.valid(semver.coerce('42.6.7.9.3-alpha')) // '42.6.7'
```

## path

:::important 重要提示
- 处理路径的时候，一定要注意各个系统的路径形式不一样，比如`windows`: `static\\js\\index.js`，`unix`: `static/js/index.js`。
- `path`处理路径的时候，会自动根据系统来格式化成相应格式的路径。
```javascript
const dir = 'static/js/index.js'
const thePath = path.join(dir)

// unix => static/js/index.js
// windows => static\\js\\index.js
```
:::

### [![1. slash 反斜杠路径格式化成斜杠路径](https://img.shields.io/github/stars/sindresorhus/slash?label=slash&style=social)](https://github.com/sindresorhus/slash)

`node`的`path`模块默认为根据系统格式化兼容系统的路径，这个库可以统一的格式化成**斜杠**，一般用来判断路径可以保证各个系统的兼容性

```javascript
const path = require('path');
const slash = require('slash');

const string = path.join('foo', 'bar');
// Unix    => foo/bar
// Windows => foo\\bar

slash(string);
// Unix    => foo/bar
// Windows => foo/bar
```

常用：

```javascript
if (slash(process.cwd()).indexOf('/packages/test') > 0 ) {
  process.env.VUE_CLI_DEBUG = true
}
```

### [![2. globby 方便的查找文件](https://img.shields.io/github/stars/sindresorhus/globby?label=globby&style=social)](https://github.com/sindresorhus/globby#readme)

方便快速的查找文件及目录

```javascript
const globby = require('globby');

(async () => {
	const paths = await globby('images', {
		expandDirectories: {
			files: ['cat', 'unicorn', '*.jpg'],
			extensions: ['png']
		}
	});

	console.log(paths);
	//=> ['cat.png', 'unicorn.png', 'cow.jpg', 'rainbow.jpg']
})();
```

:::warning
`globby`只识别正斜杠`/`的路径形式，所以在`windows`系统上面需要格式化成`/`路径
:::

## 操作文件

### [![1. copyfiles 用正则的方式批量复制文件](https://img.shields.io/github/stars/calvinmetcalf/copyfiles?label=copyfiles&style=social)](https://github.com/calvinmetcalf/copyfiles)

正则的方式复制文件，改变文件目录结构，但是不能以模板的形式，编译文件

```shell
copyfiles -f ./foo/*.txt ./foo/bar/*.txt out
```

### [![2. node-jsonfile 方便的读写json文件](https://img.shields.io/github/stars/jprichardson/node-jsonfile?label=node-jsonfile&style=social)](https://github.com/jprichardson/node-jsonfile)

非常方便的操作`json`文件

```javascript
const jsonfile = require('jsonfile')

const file = '/tmp/data.json'
const obj = { name: 'JP' }

jsonfile.writeFile(file, obj, { spaces: 2 }, function (err) {
  if (err) console.error(err)
})
```

### [3. vue-docgen-api 从vue文件中提取信息从而生成文档](https://github.com/vue-styleguidist/vue-styleguidist/tree/dev/packages/vue-docgen-api)

解析`vue`文件，从文件中提取信息

```shell
var vueDocs = require('vue-docgen-api')
var componentInfo
vueDocs.parse(filePath).then(ci => {
  componentInfo = ci
})
```

### [![4. conf 跨平台持久化储存数据](https://img.shields.io/github/stars/sindresorhus/conf?label=conf&style=social)](https://github.com/sindresorhus/conf)

将数据保存在系统目录，达到持久化存储的作用。

```javascript
const Conf = require('conf');

const config = new Conf();

config.set('unicorn', '🦄');
console.log(config.get('unicorn'));
//=> '🦄'

// Use dot-notation to access nested properties
config.set('foo.bar', true);
console.log(config.get('foo'));
//=> {bar: true}

config.delete('unicorn');
console.log(config.get('unicorn'));
//=> undefined
```

### [![5. observable-conf 监听持久化存储的数据变化](https://img.shields.io/github/stars/SamVerschueren/observable-conf?label=observable-conf&style=social)](https://github.com/SamVerschueren/observable-conf)

监听通过 `Conf` 保存的数据变化

```javascript
const Conf = require('observable-conf');
const config = new Conf();

config.select('unicorn').subscribe(value => {
	console.log(value);
	//=> '🦄'
})

config.set('unicorn', '🦄');
```

### [6. rimraf 删除文件](https://github.com/isaacs/rimraf)

跨平台 `rm -rf`

### [![6. magic-string 快速处理字符串以及生成map](https://img.shields.io/github/stars/Rich-Harris/magic-string?label=magic-string&style=social)](https://github.com/Rich-Harris/magic-string)

很方便的处理字符串以及生成 `map`

```javascript
var MagicString = require( 'magic-string' );
var s = new MagicString( 'problems = 99' );

s.overwrite( 0, 8, 'answer' );
s.toString(); // 'answer = 99'

s.overwrite( 11, 13, '42' ); // character indices always refer to the original string
s.toString(); // 'answer = 42'

s.prepend( 'var ' ).append( ';' ); // most methods are chainable
s.toString(); // 'var answer = 42;'

var map = s.generateMap({
  source: 'source.js',
  file: 'converted.js.map',
  includeContent: true
}); // generates a v3 sourcemap

require( 'fs' ).writeFile( 'converted.js', s.toString() );
require( 'fs' ).writeFile( 'converted.js.map', map.toString() );
```

## 执行命令

### [![1. git-js 快速执行git命令](https://img.shields.io/github/stars/steveukx/git-js?label=git-js&style=social)](https://github.com/steveukx/git-js)

支持快速执行`git`所有命令

```javascript
const simpleGit = require('simple-git');
const git = simpleGit(); // or git = simpleGit(workingDir);
git.init()
  .then((initResult) => onInit())
  .then(() => git.addRemote('origin', 'git@github.com:steveukx/git-js.git'))
  .then((addRemoteResult) => onRemoteAdd())
  .catch(err => console.error(err));

function onInit () { }
function onRemoteAdd () { }
```

## 渲染界面

### [![1. ink 用react画界面在命令行渲染](https://img.shields.io/github/stars/vadimdemedes/ink?label=ink&style=social)](https://github.com/vadimdemedes/ink)

用`react`画界面在终端渲染

```jsx
import React, {useState, useEffect} from 'react';
import {render, Text} from 'ink';

const Counter = () => {
	const [counter, setCounter] = useState(0);

	useEffect(() => {
		const timer = setInterval(() => {
			setCounter(previousCounter => previousCounter + 1);
		}, 100);

		return () => {
			clearInterval(timer);
		};
	}, []);

	return <Text color="green">{counter} tests passed</Text>;
};

render(<Counter />);
```

![ink-package](/img/ink-gif.svg)

### [![2. chalk-animation 字体动画](https://img.shields.io/github/stars/bokub/chalk-animation?label=chalk-animation&style=social)](https://github.com/bokub/chalk-animation)

给文字添加动画。

![rainbow](../../../static/img/687474703a2f2f692e696d6775722e636f6d2f6e61706478646e2e676966.gif)

### [![3. gradient-string 终端显示渐变色字体](https://img.shields.io/github/stars/bokub/gradient-string?label=gradient-string&style=social)](https://github.com/bokub/gradient-string)

终端显示渐变色字体

```javascript
const gradient = require('gradient-string');

console.log(gradient('cyan', 'pink')('Hello world!'));
```

![gradient-string](/img/687474703a2f2f6269742e6c792f6772616469656e742d737472696e672d70726576696577.png)

### [![4. ora Loading效果](https://img.shields.io/github/stars/sindresorhus/ora?label=ora&style=social)](https://github.com/sindresorhus/ora)

终端显示 `Loading`

```javascript
const ora = require('ora');

const spinner = ora('Loading unicorns').start();

setTimeout(() => {
	spinner.color = 'yellow';
	spinner.text = 'Loading rainbows';
}, 1000);
```

![ora](../../../static/img/screenshot-2.gif)

### [![5. cli-table 终端渲染table](https://img.shields.io/github/stars/Automattic/cli-table?label=cli-table&style=social)](https://github.com/Automattic/cli-table)

终端渲染 `table` 样式

```javascript
var Table = require('cli-table');

// instantiate
var table = new Table({
    head: ['TH 1 label', 'TH 2 label']
  , colWidths: [100, 200]
});

// table is an Array, so you can `push`, `unshift`, `splice` and friends
table.push(
    ['First value', 'Second value']
  , ['First value', 'Second value']
);

console.log(table.toString());
```

![cli-table](../../../static/img/687474703a2f2f692e696d6775722e636f6d2f73597134542e706e67.png)

## 服务器

### [![1. got 友好的http请求，文件上传下载](https://img.shields.io/github/stars/sindresorhus/got?label=got&style=social)](https://github.com/sindresorhus/got)

友好的 `http` 请求

```javascript title="文件上传下载"
const stream = require('stream');
const {promisify} = require('util');
const fs = require('fs');
const got = require('got');

const pipeline = promisify(stream.pipeline);

(async () => {
	await pipeline(
		got.stream('https://sindresorhus.com'),
		fs.createWriteStream('index.html')
	);

	// For POST, PUT, PATCH, and DELETE methods, `got.stream` returns a `stream.Writable`.
	await pipeline(
		fs.createReadStream('index.html'),
		got.stream.post('https://sindresorhus.com')
	);
})();
```

### [![2. detect-port 检测端口是否被占用](https://img.shields.io/github/stars/node-modules/detect-port?label=detect-port&style=social)](https://github.com/node-modules/detect-port)

检测端口是否被占用。

```javascript
const detect = require('detect-port');

detect(port, (err, _port) => {
  if (err) {
    console.log(err);
  }

  if (port == _port) {
    console.log(`port: ${port} was not occupied`);
  } else {
    console.log(`port: ${port} was occupied, try port: ${_port}`);
  }
});
```
