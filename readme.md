## 使用技巧

### remark

> 已添加 vscode 代码提示，可以通过 `:::remark` 来快捷提示

![remark](https://eagle-ui.oss-cn-beijing.aliyuncs.com/.io/remark-code-example.png)

使用语法：

```markdown
:::note 自定义标题
:::
```

### mdx

可以在 `mdx` 文件中，使用 `jsx` 语法：

```jsx
export const Highlight = ({children, color}) => (
  <span
    style={{
      backgroundColor: color,
      borderRadius: '2px',
      color: '#fff',
      padding: '0.2rem',
    }}>
    {children}
  </span>
);

<Highlight color="#25c2a0">Docusaurus green</Highlight> and <Highlight color="#1877F2">Facebook blue</Highlight> are my favorite colors.

I can write **Markdown** alongside my _JSX_!
```

### 导入文件源代码

借助 [raw-loader](https://webpack.js.org/loaders/raw-loader/)，可以按原样从另一个文件导入代码片段：

```jsx
import CodeBlock from '@theme/CodeBlock';
import MyComponentSource from '!!raw-loader!./myComponent';

<CodeBlock className="language-jsx" title="/src/myComponent">
  {MyComponentSource}
</CodeBlock>
```

### 使用 tab

> [查看更多](https://docusaurus.io/zh-CN/docs/markdown-features/tabs)，已添加 vscode 代码提示，可以通过 `tabs` 来快速提示

```jsx
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs
  defaultValue="apple"
  values={[
    {label: 'Apple', value: 'apple'},
    {label: 'Orange', value: 'orange'},
    {label: 'Banana', value: 'banana'},
  ]}>
  <TabItem value="apple">This is an apple 🍎</TabItem>
  <TabItem value="orange">This is an orange 🍊</TabItem>
  <TabItem value="banana">This is a banana 🍌</TabItem>
</Tabs>
```

```jsx
```

### 高亮代码行

> 除了使用数字标明高亮以外，还以为通过注释来标明，vscode 已经添加代码提示，通过打印 `codehigh`

您也可以使用 `highlight-next-line`、`highlight-start` 和 `highlight-end` 来选择要高亮的行。

```jsx
function HighlightSomeText(highlight) {
  if (highlight) {
    // highlight-next-line
    return '这句被高亮了！';
  }

  return '这里不会';
}

function HighlightMoreText(highlight) {
  // highlight-start
  if (highlight) {
    return '这片区域被高亮了！';
  }
  // highlight-end

  return '这里不会';
}
```
