---
id: performanceJSplit
title: 性能优化-延迟渲染以及js切片
hide_title: true
sidebar_label: 延迟渲染 & js切片
---

## 延迟渲染

因为 `requestAnimationFrame` 的特性：`每一帧渲染之前执行`，因此我们可以利用其做延迟渲染，或者叫做 `渲染切片`。

### 锁

例如：滑动的时候去设置样式。

```javascript
$box.on('mousemove',function(e){
  requestAnimationFrame(function(){
    $point.css({
      top : e.pageY,
      left : e.pageX
    })
  })
});
```

这样就会有问题，因为 `rAF队列` 会在渲染之前，一次清空所有的任务，所以上面的代码，只不过是将设置样式这个动作，放到了下一帧，并不能达到 `切片` 的目的。

我们可以利用 `锁` 来锁定操作。

```javascript
var locked = false;
$box.on('mousemove',function(e){
  if(!locked){
    requestAnimationFrame(function(){
      changeCSS(e);
    });
    locked = true;
  }else {
    return;
  }
});
function changeCSS(e) {
  $point.css({
    top : e.pageY,
    left : e.pageX
  })
  locked = false;
}
```

## js 切片

`requestAnimationFrame` 的执行时机是在页面重绘之前，我们知道浏览器中 `JS` 的执行是会阻塞页面渲染的，所以 `requestAnimationFrame` 的执行时机同样代表着当前 `JS` 线程的空闲。

我们可以给大的数量，来做一个 `切片`，这样就不会堵车了。

### 递归

用递归的方式，去创建分分帧操作


```javascript
$(function(){
  var lazyLoadList = [A,B,C,D];
  var load = function() {
    var module = lazyLoadList.shift();
    if(module) {
      new module();
      window.requestAnimationFrame(load); //写个递归
    }
  }
  window.requestAnimationFrame(load);
})
```
