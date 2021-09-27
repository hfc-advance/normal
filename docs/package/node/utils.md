---
id: nodeToolUtils
title: 辅助工具
hide_title: true
sidebar_label: 辅助工具
---

## 查询数据

### fullname 查询设备登录用户

> [fullname](https://github.com/sindresorhus/fullname), 跨平台支持查询当前设备登录用户

```javascript
const fullName = require('fullname');

(async () => {
  console.log(await fullName());
  //=> 'Sindre Sorhus'
})();
```

## 操作数据

### open 打开各种文件

> [open](https://github.com/sindresorhus/open) 跨平台打开各种格式的文件

```javascript
const open = require('open');

await open('unicorn.png', {wait: true});
console.log('The image viewer app quit');

await open('https://sindresorhus.com');

await open('https://sindresorhus.com', {app: {name: 'firefox'}});

await open('https://sindresorhus.com', {app: {name: 'google chrome', arguments: ['--incognito']}});
```
