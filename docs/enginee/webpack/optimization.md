---
id: webpackOptimization
title: optimization
hide_title: true
sidebar_label: optimization
---

### optimization.chunkIds

决定了文件最终打包过后的`bundle`的文件名称。

```
dist
├── 0.js // 决定了output的名称，比如：0
├── 1.js
```

<table>
<tr>
<th>选项</th>
<th>描述</th>
<th>示例</th>
</tr>

<tr>
<td>

`'natural'`
</td>
<td>按照使用顺序的ID</td>
<td>

```
├── dist
│   ├── 2.43c64a.bundle.js
│   ├── main.049323.bundle.js
│   └── runtime.ad2065.bundle.js
```
</td>
</tr>

<tr>
<td>

`'named'`
</td>
<td>
按照文件的目录，生成一个可读的ID。开发模式默认启用
</td>
<td>

```
├── dist
│   ├── main.2d2e17.bundle.js
│   ├── runtime.5b83b2.bundle.js
│   └── src_a_js.aa6820.bundle.js
```
</td>
</tr>

<tr>
<td>

`'deterministic'`
</td>
<td>
简短的数字ID，在编译的时候不会发生改变。适合长期缓存。生产模式默认启用
</td>
<td>

```
├── dist
│   ├── 150.ff1a6d.bundle.js
│   ├── main.ade014.bundle.js
│   └── runtime.3edf33.bundle.js
```
</td>
</tr>

<tr>
<td>

`'size'`
</td>
<td>
数字ID专注于最小的初始下载大小。
</td>
<td>

```
├── dist
│   ├── 0.75299b.bundle.js
│   ├── main.2c53d4.bundle.js
│   └── runtime.5417e4.bundle.js
```
</td>
</tr>

<tr>
<td>

`'total-size'`
</td>
<td>
数字ID专注于最小的总下载大小。
</td>
<td>

```
├── dist
│   ├── 2.43c64a.bundle.js
│   ├── main.049323.bundle.js
│   └── runtime.ad2065.bundle.js
```
</td>
</tr>
</table>

:::warning

- 开发模式默认值: `chunkIds = 'named'`
- 生产模式默认值: `chunkIds = 'deterministic'`
- `chunkIds`只是决定了文件的`name`，但是一个完成的链接，应该是`[name].[contenthash].js`例如：`src_a_js.aa6820.js`，所以`name`可以一直固定不变，变化的只要是`contenthash`就可以了。
:::

### optimization.moduleIds

决定了代码内部每个`module`的依赖的`id`

```javascript
(self.webpackChunkwebpack_boilerplate = self.webpackChunkwebpack_boilerplate || []).push([[0], {
    579: (e,l,b)=>{
        b.e(2).then(b.bind(b, 150)),
        console.log(1)
    }
}, 0, [[579, 1]]]);

// 👆所示，579就是由moduleIds生成的
```

<table>
<tr>
<th>选项</th>
<th>描述</th>
<th>示例</th>
</tr>

<tr>
<td>

`'natural'`
</td>
<td>按照使用顺序的ID</td>
<td>

```javascript
(self.webpackChunkwebpack_boilerplate = self.webpackChunkwebpack_boilerplate || []).push([[179], [(e,l,b)=>{
    b.e(150).then(b.bind(b, 1)),
    console.log(1)
}
], 0, [[0, 666]]]);
```
</td>
</tr>

<tr>
<td>

`'named'`
</td>
<td>
按照文件的目录，生成一个可读的ID。开发模式默认启用
</td>
<td>

```javascript
(self.webpackChunkwebpack_boilerplate = self.webpackChunkwebpack_boilerplate || []).push([[179], {
    "./src/index.js": (e,s,c)=>{
        c.e(150).then(c.bind(c, "./src/a.js")),
        console.log(1)
    }
}, 0, [["./src/index.js", 666]]]);
```
</td>
</tr>

<tr>
<td>

`'deterministic'`
</td>
<td>
简短的数字ID，在编译的时候不会发生改变。适合长期缓存。生产模式默认启用
</td>
<td>

```javascript
(self.webpackChunkwebpack_boilerplate = self.webpackChunkwebpack_boilerplate || []).push([[179], {
    579: (e,l,b)=>{
        b.e(150).then(b.bind(b, 150)),
        console.log(1)
    }
}, 0, [[579, 666]]]);
```
</td>
</tr>

<tr>
<td>

`'size'`
</td>
<td>
数字ID专注于最小的初始下载大小。
</td>
<td>

```javascript
(self.webpackChunkwebpack_boilerplate = self.webpackChunkwebpack_boilerplate || []).push([[179], [(e,l,b)=>{
    b.e(150).then(b.bind(b, 1)),
    console.log(1)
}
], 0, [[0, 666]]]);
```
</td>
</tr>
</table>
