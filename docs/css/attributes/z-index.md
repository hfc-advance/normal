---
id: cssZindex
title: z-index
hide_title: true
sidebar_label: z-index
---

## 理解层叠上下文

`HTML`文档中的元素是存在于三个维度之中。像`margin` , `float` , `offset`这些属性，控制着元素在`x`轴和`y`轴上的表现形式一样，`z-index` 控制着 `z轴` 上面的表现。

> 如 `Photoshop` 等图像编辑软件一样，有 `图层` 的概念，我们可以对图层 `分组`，导出构图时，我们根本看不到猫，因为它在狗后面：

![z-index](https://www.joshwcomeau.com/_next/image?url=%2Fimages%2Fstacking-contexts%2Fphotoshop-groups.png&w=384&q=75)

:::important

- 在 `css` 中，也是类似的原理，元素被分组到 `层叠上下文` 中，当我们给一个元素设置 `z-index` 的时候，这个值只会和同一个上下文的元素的值作比较。
- 默认情况下，我们不人为创建上下文的情况，`html` 是所有元素的上下文节点。
:::

## 创建上下文

1. 文档根元素 `<html>`

2. `position` 值为 `absolute` 或者 `relative` && `z-index` 不为 `auto`

  ```css
  .context {
    position: relative;
    z-index: 1;
  }
  ```

3. `position` 值为 `fixed` 或者 `sticky`

  ```css
  .context {
    position: fixed;
  }
  ```

4. `flex` 的子元素，而且 `z-index` 不为 `auto`

  ```less
  .flex {
    display: flex;
    .child {
      z-index: 1;
    }
  }
  ```

5. `grid` 的子元素，而且 `z-index` 不为 `auto`

  ```less
  .grid {
    display: grid;
    .child {
      z-index: 1;
    }
  }
  ```

6. `opacity` 属性值小于1

  ```css
  .context {
    opacity: 0.99;
  }
  ```

7. `mix-blend-mode` 属性值不为 `normal` 的元素；

  ```css
  .context {
    mix-blend-mode: multiply;
  }
  ```

8. 下面属性的值不为 `none` 的元素

- `transform`
- `filter`
- `perspective`
- `clip-path`
- `mask/mask-image/mask-border`

9. `isolation` 属性值为 `isolation`

  ```css
  .context {
    isolation: isolate;
  }
  ```

10. `-webkit-overflow-scrolling` 属性值为 `touch` 的元素

  ```css
  .context {
    -webkit-overflow-scrolling: touch;
  }
  ```

11. `will-change` 值不为`non-initial` 的元素，以及 `contain` 属性值不为 `none` 的元素

  ```css
  .context {
    will-change: transform;
  }

  .context {
    contain: layout;
  }
  ```

## 参考

- [层叠上下文 - MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context)
- [What the heck, z-index??](https://www.joshwcomeau.com/css/stacking-contexts/)
- [chrome extension for z-context](https://chrome.google.com/webstore/detail/z-context/jigamimbjojkdgnlldajknogfgncplbh)
- [chrome extension for CSS Stacking Context inspector](https://chrome.google.com/webstore/detail/css-stacking-context-insp/apjeljpachdcjkgnamgppgfkmddadcki)