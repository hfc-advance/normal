---
id: DSLPEGJS
title: DSL - PEG.js
hide_title: true
sidebar_label: PEG.js
---

## 语法

### ”literal“

> 精确匹配字符串，并将其作为字符串返回。紧跟`i`表示不区分大小写

```javascript
const grammar = `Start = 'a'i`
const grammar = `Start = ('a' / 'b')i`
```

### `.`

> `.` 匹配任意字符，并将其作为字符串返回

```javascript
const grammar = `Start = .*`
parse('abc') // [ 'a', 'b', 'c' ]
```

### [characters]

> 匹配集合中的一个字符并将其作为字符串返回。紧跟`i`表示不区分大小写

- 字符列表还可以包含范围（例如`[a-z]` 表示“所有小写字母”
- 前面的字符`^` 反转匹配的集合（例如，`[^a-z]`表示“除小写字母之外的所有字符”）

```javascript
const grammar = `Start = [abc]i+`
parse('abcA') // [ 'a', 'b', 'c', 'A' ]
```

### expression `*`

> 匹配表达式的零次或多次重复，并在数组中返回它们的匹配结果。匹配是贪婪的，即解析器尝试尽可能多地匹配表达式。与正则表达式不同，没有回溯

```javascript
const grammar = `Start = 'a'i*`
parse('aaAaA') // [ 'a', 'a', 'A', 'a', 'A' ]
```

### expression `+`

> 匹配一个或多个重复的表达式，并在一个数组中返回它们的匹配结果。匹配是贪婪的，即解析器尝试尽可能多地匹配表达式。与正则表达式不同，没有回溯。

### expression `?`

> 尝试匹配表达式。如果匹配成功，则返回其匹配结果，否则返回 null。与正则表达式不同，没有回溯。

### `&` expression (待理解)

> `& expression` 尝试匹配表达式。如果匹配成功，就返回 undefined，不消耗任何输入，否则认为匹配失败。

### `!` expression (待理解)

> 尝试匹配表达式。如果匹配不成功，就返回 undefined，不消耗任何输入，否则认为匹配失败。
