---
id: reactStyledComponentsTypescript
title: styled-components typescript
hide_title: true
sidebar_label: typescript
---

### 1. 定义 props

```tsx {6}
interface IStyledButton {
  /** 透明度 */
  opacity?: number;
}

const Button = styled.div<IStyledButton>`
  width: 100px;
  height: 100px;
  background-color: blue;
  border-radius: 6px;
  color: red;
  opacity: ${p => p.opacity};
`

function App (): JSX.Element {
  return <Button opacity={0.1}><h1>1</h1></Button>
}
```
