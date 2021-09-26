## nodemon

> [nodemon](https://github.com/remy/nodemon) 用来监视node.js应用程序中的任何更改并自动重启服务,非常适合用在开发环境中

```bash
{
  "restartable": "rs",
  "verbose": true,
  "watch": [
    "config/",
    "router/",
    "utils/",
    "views/",
    "app.ts",
    "index.ts"
  ],
  "ignore": [
    "test/*.spec.ts"
  ],
  "delay": "1000",
  "exec": "TS_NODE_PROJECT=tsconfig.server.json node --inspect -r ts-node/register ./app.ts",
  "ext": "ts,ejs,yml,json"
}
```

### 常用配置项

- `restartable`：设置重启模式
- `verbose`：设置日志输出模式，`true`为详细模式
- `watch`：需要监听的文件
- `ignore`：忽略的文件
- `delay`：设置延迟时间
- `exec`：执行的命令
- `ext`：文件后缀名
