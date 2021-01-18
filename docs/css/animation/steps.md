---
id: cssSteps
title: steps
hide_title: true
sidebar_label: steps
---

### steps 主要解决的问题

`steps`主要是让动画不连续，默认的`transition;animation`的动画都是连续动画。

```jsx live
function createItem () {
  const createdStyleTag = document.createElement("style");
  createdStyleTag.textContent = ` .contain {
      width: 100px;
      height: 100px;
      border: 2px solid darkgray;
      border-radius: 50%;
    }
    .child {
      width: 6px;
      height: 50px;
      margin-left: 47px;
      background-color: red;
      transform-origin: bottom center;
      animation: rotateTimer 15s infinite;
    }
    .child-steps {
      animation: rotateTimer 30s infinite steps(60);
    }

    @keyframes rotateTimer {
      to {
        transform: rotate(360deg);
      }
    }

    @-webkit-keyframes rotateTimer {
      to {
        transform: rotate(360deg);
      }
    }`
  document.body.appendChild(createdStyleTag);

  return (
    <div style={{display: 'flex'}}>
      <div>
        <div>连续动画</div>
        <div className="contain">
          <div className="child"></div>
        </div>
      </div>
      <div style={{marginLeft: '30px'}}>
        <div>不连续动画</div>
        <div className="contain">
          <div className="child child-steps"></div>
        </div>
      </div>
    </div>
  )
}
```

:::warning
有些时候，动画就是要不连续的才符合自然规律。
:::

### steps 语法

`steps(number, position)`

- `number`

表示把我们的动画分成了多少段。

```css
@keyframes move {
  0% { left: 0; }
  100% { left: 100px; }
}
```

假设我们的number值是5，则相当于把这段移动距离分成了5段，如下示意图：

![animation-timing-function-steps](/img/2018-06-11_214140.png)

- `position`

动画有两种形式：

- `start`：迅速开始

> 表示页面进来后，动画立马执行，也就是页面进来后，立马执行了一个`step`

![animation-timing-function-step-start](/img/2018-06-11_223135.png)

- `end`：迅速结束

> 表示时间结束，动画立马停止。

![animation-timing-function-step-end](/img/2018-06-11_223630.png)

![aniamtion-timing-function-step-gif](/img/animation-timing-function-steps.gif)

:::warning

- `timing function`作用于一个关键帧周期而非整个动画周期，即从关键帧开始开始，到关键帧结束结束。

  ```css
  .contain {
    animation: transformBox 1.6s steps(5, start)
  }

  @keyframe transformBox {
    0% {
      transform: translateX(30px)
    }

    50% {
      transfrom: translateX(100px)
    }

    100% {
      transform: translateX(200px)
    }
  }
  ```

  - 如上面代码定义了3个关键帧，也就是说关键帧周期有2个，`0-50`和`50-100`，那么实际的`step.length = 10`
  - `cubic-bezier`也属于`timing-function`，也就是`cubic-bezier`定义的动画函数也是作用域一个关键帧周期的。

    ```jsx live
    function createItem () {
      const createdStyleTag = document.createElement("style");
      createdStyleTag.textContent = `.item1 {
          width: 100px;
          height: 100px;
          background-color: aquamarine;
          animation: rotateBox 1s infinite;
        }

        @keyframes rotateBox {
          0% {
            transform: translateX(0);
          }

          50% {
            transform: translateX(150px);
          }

          100% {
            transform: translateX(300px);
          }
        }
        @-webkit-keyframes rotateBox {
          0% {
            transform: translateX(0);
          }

          50% {
            transform: translateX(150px);
          }

          100% {
            transform: translateX(300px);
          }
        }`
      document.body.appendChild(createdStyleTag);

      return (
        <div className="item1"></div>
      )
    }
    ```

    可以发现动画分为两段，是因为默认的`timing-function: cubic-bezier = ease`表现形式就是先快后慢，关键帧动画周期又有2个。
:::
