---
id: goodShell
title: 有用的shell
hide_title: true
sidebar_label: 有用的shell
---

### 使用`prettier`美化发生改变的文件代码

```shell {5}
#!/bin/sh

BASEDIR="<path to my project dir>"

files=$(git diff --name-status master);

while read -r file; do
  mode=$(echo "$file" | awk '{print $1}')
  filePath=$(echo "$file" | awk '{print $2}')
  if [ "$mode" = "M" ] || [ "$mode" = "A" ] || [ "$mode" = "AM" ]
    then
      npx prettier --write $filePath
  fi
done <<< "$files"
```

- `git diff --name-status master` 将当前分支与`master`进行比较，`--name-status`生成两列。一列是**文件更改类型**，一列是**文件路径**。如下图所示：

![git_diff](/img/git_diff.png)

- `while read -r file; do`遍历读取的文件的行
- `mode=$(echo "$file" | awk '{print $1}')` 获取第一列的内容。
- `filePath=$(echo "$file" | awk '{print $2}')`获取第二列的内容。
- `npx prettier --write $filePath`格式化并输出文件。
