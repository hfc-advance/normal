## runtime

### comlink webworker辅助工具

> [comlink](https://github.com/GoogleChromeLabs/comlink)，能够改变使用 `webworker` 方式的库

```javascript
import * as Comlink from "https://unpkg.com/comlink/dist/esm/comlink.mjs";
async function init() {
  const worker = new Worker("worker.js");
  // WebWorkers use `postMessage` and therefore work with Comlink.
  const obj = Comlink.wrap(worker);
  alert(`Counter: ${await obj.counter}`);
  await obj.inc();
  alert(`Counter: ${await obj.counter}`);
}
init();
```
