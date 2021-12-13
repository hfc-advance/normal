---
id: jsonschemaVscodeIntellisense
title: json文件智能感知 - vscode
hide_title: true
sidebar_label: json文件智能感知 - vscode
---

## vscode 与 json 文件建立关联

:::danger 注意事项

- 如果约定的`jsonschema`是远程路径，需要开启下载功能。

```json title="settings.json"
{ "json.schemaDownload.enable": true }
```

- `markdownDescription`：规范中的`description`只能提供一些文本信息，如果要在`vscode`中提供丰富的`UI description`，可以通过设置`markdownDescription`，这个配置是`vscode`特有的：

```json
{
  "$schema": "http://json-schema.org/schema",
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "description": "The name of the entry",
      // highlight-next-line
      "markdownDescription": "The name of the entry. [See the documentation](https://example.com)"
    }
  }
}
```

- `defaultSnippets`：JSON Schema 规范中的 default 字段可用于 JSON 自动补全（VS Code 默认支持），能够满足一般情况。对于更复杂的补全提示，可通过扩展字段 defaultSnippets（VS Code 特有） 来完成：

```json
{
  "type": "array",
  "title": "Keybindings configuration",
  "items": {
    "type": "object",
    "required": ["key"],
    "default": "",
    "defaultSnippets": [
      {
        "label": "New keybinding",
        "description": "Binds a key to a command for a given state",
        "body": { "key": "$1", "command": "$2", "when": "$3" }
      }
    ],
    "properties": {
      "key": {
        "type": "string"
      }
      ...
    }
  }
}
```

:::

### json.$schema

> 数据侧：在 JSON 数据中增加一个 `$schema` 字段，指向 JSON Schema

```json title="reelup.config.json"
{
  // highlight-next-line
  "$schema": "http://json.schemastore.org/coffeelint",
  "port": 9999,
  "mode": "development"
}
```

:::danger
数据中添加`$schema`语法是 `vscode` 特定的，不是`JSON Schema`规范，所以`$schema`会更改 json 数据，从而造成 json 系统无法识别，比如验证可能失败。
:::

### settings json.schemas

> 添加`json.schemas`配置项到`settings.json`配置里，[参考 jsonschema user setting](https://code.visualstudio.com/docs/languages/json#_mapping-in-the-user-settings)

```json title="settings.json"
{
  "json.schemas": [
    // 映射到远程
    {
      "fileMatch": ["/receipts/*.json", "!/receipts/*.excluded.json"],
      "url": "https://json.schemastore.org/babelrc"
    },
    // 映射到工作区
    {
      "fileMatch": ["/receipts/*.json", "!/receipts/*.excluded.json"],
      "url": "./myschema.json"
    },
    // 直接自定义
    {
      "fileMatch": ["/receipts/*.json", "!/receipts/*.excluded.json"],
      "schema": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "description": "The name of the entry"
          }
        }
      }
    }
  ]
}
```

### contributes.jsonValidation

> 与[json.schemas](#settings-jsonschemas)类似，只不过这个是用于`vscode 插件`中，放到`package.json`文件配置中

```javascript title="package.json"
{
  "contributes": {
    "jsonValidation": [
      {
        "fileMatch": ".jshintrc",
        "url": "http://json.schemastore.org/jshintrc"
      }
    ]
  }
}
```

## 实用工具

### ajv 快速高效 schema 校验工具

```javascript
const Ajv = require('ajv')
const ajv = new Ajv()

const schema = {
  type: 'object',
  properties: {
    foo: { type: 'integer' },
    bar: { type: 'string' }
  },
  required: ['foo'],
  additionalProperties: false
}

const data = { foo: 1, bar: 'abc' }
const valid = ajv.validate(schema, data)
if (!valid) console.log(ajv.errors)
```

## 文档中心

- [jsonschema.net](https://www.jsonschema.net/home) 在线生成 jsonschema, 集转换、编辑于一体，功能相对完整，并且支持 `draft-07` 规范
- [json-schema.org](https://json-schema.org/) 官方站点
- [jsonschema 配置项](https://json-schema.org/understanding-json-schema/)
