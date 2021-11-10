## 约束文件目录和名字

### ls-lint

> [ls-lint](https://github.com/loeffel-io/ls-lint)可以用来规范项目文件名：

```yaml title="ls-lint.yaml"
ls:
  .js: snake_case
  .ts: snake_case | camelCase
  .d.ts: PascalCase
  .html: regex:[a-z0-9]+

ignore:
  - node_modules
```
