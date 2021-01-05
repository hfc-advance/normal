---
id: .npmrc
title: npmrc详解
hide_title: true
sidebar_label: .npmrc
---

## npmrc

:::tip
无论是`install`,还是`update`，还是`publish`都会经过`.npmrc`读取配置项，只不过默认情况下读取的是全局`.npmrc`文件的内容。

- `npm config`命令实际上更新的就是全局`.npmrc`文件的内容
- 如果项目中配置了`npmrc`，那么安装包或者别的都会走这个配置，从外部是没有办法切换的，比如说`npmrc`配置了`registry`那么安装包的时候，使用用的都是`registry`这个`npm`源
:::

### 文件

按优先级从`高到低`排序：

- 每个项目的配置文件（`/my/project/.npmrc`）
- 每个用户的配置文件（`~/.npmrc`）
- 全局的配置文件（`$PREFIX/etc/npmrc`）
- `npm`内置的配置文件（`/path/to/npm/npmrc`）

:::important
这四个文件都会被加载，但是按照优先级，相同的配置项前者会覆盖后者。
:::

### 语法

- 环境变量可以使用`${varibale_name}`代替:

```shell
prefix = ${HOME}/.npm-packages
```

- 注释

`.npmrc`文件里以`;`或者`#`开始的行，会被理解为注释。`npmrc`文件会被[npm/ini](https://github.com/npm/ini)解析，也就是它规定了语法:

```ini
# last modified: 01 Jan 2016
; Set a new registry for a scoped package
@myscope:registry=https://mycustomregistry.example.org
```

## 配置项

### registry

配置`npm`源

```shell
registry=http://npm.zhaogangren.com/
```

### @myscope:registry

对单独域的包，单独配置`npm`源

```shell
@zg:registry=http://npm.zhaogangren.com/
```

用命令行设置

```shell
npm config set @zg:registry http://npm.zhaogangren.com/
```

### save-prefix

安装包的时候版本语法默认是`^`，`save-prefix`可以修改

```shell
# 固定版本号
save-prefix=''
```
