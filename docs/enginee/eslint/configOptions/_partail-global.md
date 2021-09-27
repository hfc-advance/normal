## globals

> 除了 `env` 内置环境的全局变量，可以还有一些特殊的全局变量，比如在 `html` 中设置了一个全局变量，并不是通过 `window` 来访问的，就需要通过 globals 来设置。

```jsx
module.exports = {
	globals: {
		API_ENV: true
	}
}

// 使用
API_ENV = 'mit'
```

### 注意事项

- `false`、`readable`、`readonly` 这 3 个是等价的，表示变量只可读不可写
- 启用 [no-undef](https://eslint.org/docs/rules/no-undef) 规则，来检查 使用了没有定义的全局变量
- 启用 [no-global-assign](https://eslint.org/docs/rules/no-global-assign) 规则，来检查 **可读不可写**状态的全局变量
- `true`、`writeable`、`writable` 这 3 个是等价的，表示变量可读可写
