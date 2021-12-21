## Serve

> 启动一个`web`服务器

### options

```javascript
interface ServeOptions {
  port?: number;
  host?: string;
  servedir?: string;
  onRequest?: (args: ServeOnRequestArgs) => void;
}

interface ServeOnRequestArgs {
  remoteAddress: string;
  method: string;
  path: string;
  status: number;
  timeInMS: number;
}
```
