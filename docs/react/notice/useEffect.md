---
id: reactNoticeUseEffect
title: react useEffect
hide_title: true
sidebar_label: useEffect
---

## 内存泄漏问题

### 1. 异步执行完毕，组件已经卸载。

```jsx
import React, { useEffect} from 'react';

export default function UseEffectWithRaceCondition() {
  const [todo, setTodo] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
      const newData = await response.json();
      setTodo(newData);
    };
    fetchData();
  }, []);

  if (data) {
    return <div>{data.title}</div>;
  } else {
    return null;
  }
}
```

:::warning
上面的代码，当异步请求执行完毕，更新 `state` 的时候，有可能当前 `组件被卸载` 了，这个时候就会引发 `内存泄漏` 问题。

- 应该和 `vue beforeDestroy` 一样，在组件卸载之前，应该清除掉所有的 `定时器；订阅；异步任务` 等等。

  ```jsx {8,15}
  export default function UseEffectWithRaceCondition() {
    const [todo, setTodo] = useState(null);
    useEffect(() => {
      let isComponentMounted = true

      const fetchData = async () => {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
        if (isComponentMounted) {
          const newData = await response.json();
          setTodo(newData);
        }
      };
      fetchData();
      return () => {
        isComponentMounted = false
      }
    }, []);

    if (data) {
      return <div>{data.title}</div>;
    } else {
      return null;
    }
  }
  ```

:::