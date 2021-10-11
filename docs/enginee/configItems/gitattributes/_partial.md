## .gitattributes

> 每当有文件保存或者创建时，`git`会根据指定的属性来自动地保存。开发者使用不同的操作系统，默认的文件结尾行就会不同。在 Windows 上默认的是回车换行（Carriage Return Line Feed, CRLF），然而，在 Linux/MacOS 上则是换行（Line Feed, LF）。

### 最佳配置

```shell
# 自动识别文件是否为text
# 使用 lf 换行符进行存储
* text=auto eol=lf

# 覆盖部分文件配置, checkout 时替换为 crlf.
*.bat text eol=crlf
```
