---
id: performanceReactScheduler
title: 性能优化-react任务调配
hide_title: true
sidebar_label: react 手动为任务分配优先级
---

`react` 单独分离出 `scheduler` 库，我们可以通过该库为 `react` 任务分配优先级。

```javascript title="将通知分配低优先级"
import {
  unstable_LowPriority,
  unstable_scheduleCallback
} from "scheduler";

function sendDeferredAnalyticsNotification(value) {
  unstable_scheduleCallback(unstable_LowPriority, function() {
    sendAnalyticsNotification(value);
  });
}
```

优先级从高到低依次是：

- `Immediate` 立即执行优先级，需要同步执行的任务。

- `UserBlocking` 用户阻塞型优先级（250 ms 后过期），需要作为用户交互结果运行的任务（例如，按钮点击）。

- `Normal` 普通优先级（5 s 后过期），不必让用户立即感受到的更新。

- `Low` 低优先级（10 s 后过期），可以推迟但最终仍然需要完成的任务（例如，分析通知）。

- `Idle` 空闲优先级（永不过期），不必运行的任务（例如，隐藏界面以外的内容）。

## 参考

- [Scheduling in React](https://philippspiess.com/scheduling-in-react/)
- [React的调度-v16](https://que01.top/2019/08/28/v16-Scheduling-in-React/)
