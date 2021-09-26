## .vscode

在项目根目录建立一个 `.vscode` 目录，里面可以有这些文件：

- `setting.json`：主要是存放一些公共配置
- `[name].code-snippets`：主要存放一些代码提示

### code-snippets

主要用来设置代码提示的，比如一些隐藏的全局变量，不能通过 `ts` 来提示的，就可以通过他来建立代码提示，提高开发效率。推荐阅读 [VSCode 利用 Snippets 设置超实用的代码块](https://juejin.cn/post/6844903869424599053)

```json
{
  "Print to console": {
    "prefix": "log",
    "body": [
    "console.log('$1');",
    "$2"
    ],
    "description": "Log output to console"
  }
}
```

:::tip
可以通过编辑器来建立文件：Mac系统: Code > 首选项 > 用户片段
:::

### setting.json

可以为项目提供一些通用配置，这在一起维护代码的时候很有必要：

```json
{
    "files.autoSave": "onWindowChange",
    "files.autoSaveDelay": 2000,
    // 配置 Tab 空格数
    "editor.tabSize": 2,
    // 保存自动格式化代码
    "editor.formatOnSave": true,
    // 粘贴自动格式化
    "editor.formatOnPaste": true,
    // 可以为不同语言或文档单独配置
    "[typescript]": {
        "editor.formatOnSave": false
    },
    "[markdown]": {
        "editor.formatOnSave": true
    }
}
```

### launch.json

添加项目调试配置，方便一起启动调试

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "debugger webpack",
      "url": "http://localhost:8080",
      "webRoot": "${workspaceFolder}",
      "runtimeExecutable": "npm",
      "runtimeArgs": ["run", "dev"]
    }
  ]
}
```

### extensions.json

用来配置一些项目需要用到的 `vscode plugin`，这样一起维护项目的人员，如果没有安装插件，就会提示安装

```json
{
  "recommendations": [
    "esbenp.prettier-vscode",
    "stylelint.vscode-stylelint"
  ]
}
```
