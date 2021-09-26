---
id: babel
title: babel应用规则
hide_title: true
sidebar_label: 配置文件应用规则
---

:::note

Some **content** with _markdown_ `syntax`. Check [this `api`](#).

:::

:::tip

Some **content** with _markdown_ `syntax`. Check [this `api`](#).

:::

:::info

Some **content** with _markdown_ `syntax`. Check [this `api`](#).

:::

:::caution

Some **content** with _markdown_ `syntax`. Check [this `api`](#).

:::

:::danger

Some **content** with _markdown_ `syntax`. Check [this `api`](#).

:::

Babel配置文件分为两种, 可以一起使用, 也可以单独使用。

- `babel.config.js`项目级别(整个项目都应用这个配置文件)
- `.babelrc, .babelrc.js`还有``文件目录级别

---

## 项目级别的配置

> Babel 7.x 中的新功能，Babel 具有 ["root"](https://babel.docschina.org/docs/en/next/options#root) 目录的概念，默认为 到当前的**工作目录**。对于项目范围的配置，Babel 将自动搜索 相对对于此根目录下的 "babel.config.js" 。或者，用户可以使用显式 ["configFile"](https://babel.docschina.org/docs/en/next/options#configfile) 值覆盖默认的配置文件搜索行为。

---

## 相对文件配置

`.babelrc`，`.babelrc.js`，以及`package.json`文件中的`babel`，三种配置方式都是相对文件的配置方式。
查找原则：它会从当前正在编译的文件所在文件夹开始，基于它的`filename`，向上搜索，直到找到`package.json`或者是提前找到`babelrc`文件，或者到达了顶级(`babel运行的目录`)，就停止搜索配置文件。

:::important
若是在`babel运行目录`下面的所有目录有全局配置文件`babel.config.js`，除非手动关闭，否则这个`babel.config.js`一定会起作用：

```javascript
src/
    mod/
        util/
            main.js
            package.json
            .babelrc.js
package.json
babel.config.js
```

这种情况`babel.config.js`也会起作用
:::

第一种情况：

```javascript
src/
    mod/
        util/
            main.js
            package.json
package.json
.babelrc.js
```

`cd src/ && npx babel src -d dist`，会发现main.js不会被转码

:::tip
这是因为main.js同级的位置有一个package.json文件，当main.js被babel编译的时候，它会相对main.js去找.babelrc.js配置，但是遇到package.json的文件夹，就会停止。
只要把util/package.json删掉，再次编译，即可恢复正常。
:::

第二种情况：

```javascript
src/
    mod/
        util/
            main.js
            package.json
            .babelrc.js
package.json
```

`cd src/ && npx babel src -d dist`，会发现main.js还是不会被转码。

:::tip
这是因为运行babel的目录是src，也就是babel运行的根目录是src/，虽然这次相对main.js可以找到一个.babelrc.js文件，但是因为这个文件不位于babel的root目录，所以导致它会直接被忽略。解决这个问题有两个办法：

1. 运行：cd src/mod/util && npx babel . -d dist
2. 在src/目录同级的位置添加一个babel.config.js，用来配置babelrcRoots，内容：

```javascript
// 目录结构
src/
    mod/
        util/
            main.js
            package.json
            .babelrc.js
package.json
babel.config.js

// babel.config.js
module.exports = {
    babelrcRoots: [
        ".",
        "mod/util",
    ]
}
```

:::

:::warning
babelrcRoots不能用.babelrc或.babelrc.js文件来替代，否则还是不能正常转码。
:::

## 参考

- [Babel配置文件](https://babel.docschina.org/docs/en/next/config-files)
- [babel详解（七）:配置文件](https://blog.liuyunzhuge.com/2019/09/09/babel%E8%AF%A6%E8%A7%A3%EF%BC%88%E4%B8%83%EF%BC%89-%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6/)
- [一文读懂 babel7 的配置文件加载逻辑](https://segmentfault.com/a/1190000018358854)
