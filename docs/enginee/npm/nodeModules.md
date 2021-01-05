---
id: node_modules
title: node_modules依赖详解
hide_title: true
sidebar_label: node_modules依赖详解
---

## 项目分析

<table>
<tr>
<th>项目</th>
<th>依赖</th>
<th>node_modules</th>
</tr>

<tr>
<td>

`conflict-test`
</td>
<td>

```json
"dependencies": {
  "todd-a": "^1.0.0",
  "todd-b": "^1.0.0"
}
```
</td>
<td rowspan="3">

```
node_modules
├── lodash 4.17.11
├── todd-a 1.0.0
├── todd-b 1.0.0
│   └── node_modules
│       └── todd-child 2.0.0
└── todd-child 1.0.0
```

</td>
</tr>

<tr>
<td>

`todd-a`
</td>
<td>

```json
"dependencies": {
  "lodash": "^4.17.11",
  "todd-child": "^1.0.0"
}
```
</td>
</tr>
<tr>
<td>

`todd-b`
</td>
<td>

```json
"dependencies": {
  "lodash": "^4.17.11",
  "todd-child": "^2.0.0"
}
```
</td>
</tr>
</table>

:::success 总结

- `npm`包中的`dependencies`依赖项，会安装到项目中，`devDependencies`中的依赖项不会安装到项目中。
- 包的所有依赖项默认会安装项目`node_modules`根目录下，**如果出现了相同的包而且版本不同的话**，会按照安装的先后顺序，先安装的版本的放到项目的`node_modules`目录下，后安装的版本会放到这个包下面的`node_modules`目录下。
- 优先级是这样的：项目的依赖项 > 先安装的 > 后安装的。举例来说：如果`conflict-test`这个项目也依赖了`todd-child 2.0.0`版本的话就会出现下面的这种情况：

  ```
  node_modules
  ├── lodash 4.17.11
  ├── todd-a 1.0.0
  │   └── node_modules
  │       └── todd-child 1.0.0
  ├── todd-b 1.0.0
  └── todd-child 2.0.0
  ```

- 完全相同的包（`todd-child 2.0.0 ≠ todd-child 2.0.1`）指的是版本完全相同包括小版本。具体的相同要看包中的`version`字段，而不是`package.json`里面`dependencies`里面的版本，因为`todd-child 2.0.0 ≠ todd-child 2.0.1`有可能最后安装的包都是`2.0.1`这个时候就是相同的
:::

## peerDependencies对依赖的影响

`peerDependencies`也叫对等依赖，意思就是：依赖我这个包，也要依赖`peerDependencies`里面的包。

### 总结

:::success 总结

- 当把依赖添加到`peerDependencies`里面之后，那么这些依赖就不会出现在私有的`node_modules`下面

  <table>
  <tr>
  <th>项目</th>
  <th>依赖</th>
  <th>node_modules</th>
  </tr>

  <tr>
  <td>

  `conflict-test`
  </td>
  <td>

  ```json
  "dependencies": {
    "todd-a": "^1.0.0",
    "todd-b": "^1.0.0"
  }
  ```
  </td>

  <td rowspan="3">

  ```
  node_modules
  ├── lodash 4.17.11
  ├── todd-a 1.0.0
  ├── todd-b 1.0.0
  │   └── node_modules
  │       └── todd-child 1.0.0
  └── todd-child 2.0.0
  ```
  </td>
  </tr>

  <tr>
  <td>

  `todd-a`
  </td>
  <td>

  ```json
  "dependencies": {
    "lodash": "^4.17.11",
    "todd-child": "^1.0.0"
  }
  ```
  </td>
  </tr>
  <tr>
  <td>

  `todd-b`
  </td>
  <td>

  ```json
  "dependencies": {
    "lodash": "^4.17.11"
  }
  "peerDependencies": {
    "todd-child": "^2.0.0"
  }
  ```
  </td>
  </tr>
  </table>

  - 即使先安装的`todd-a`，那也是`todd-b`下面`peerDependencies`的`todd-child`出现在根`node_modules`下面。
  - 优先级最高的是当前项目的依赖，但是如果包里面出现了`peerDependencies`，那么这个项目直接安装这个依赖项必须符合`peerDependencies`里面的版本设置：比如`"todd-child": "^2.0.0"`，那么这个项目安装的依赖项必须符合这个`^2.0.0`语义化版本。否则会报错

- 在`npm7`之前，如果包里面申明了`peerDependencies`那么这个项目如果没有安装`peerDependencies`依赖项，项目会抛出警告，只是提示一下，最终还是会安装`peerDependencies`依赖项，在`npm7`之后，不会附带警告，而是直接安装。
- `peerDependenciesMeta`可以设置忽略掉警告。

  ```json
  "peerDependencies": {
    "vue": "^1.0.0"
  },
  "peerDependenciesMeta": {
    "vue": {
      "optional": true
    }
  }
  ```

:::
