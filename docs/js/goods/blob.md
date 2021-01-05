---
id: jsBlob
title: Blob
hide_title: true
sidebar_label: Blob
---

## 基本特征

- `Blob`，`Binary Large Object`的缩写，代表二进制类型的大对象，通俗点说，就是`Blob`对象是二进制数据
- `Blob`虽然是二进制数据，但它是`类似文件对象`的二进制数据，因此可以像操作`File`对象一样操作`Blob`对象
- 实际上，`File`是继承至`Blob`

***

## 基本用法

可以通过`Blob`的构造函数创建`Blob`对象：

```javascript
Blob(blobParts[, options])
```

参数说明：

- `blobParts`：数组类型，数组中的每一项连接起来构成`Blob`对象的数据，数组中的每项元素可以是[ArrayBuffer](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)，[ArrayBufferView](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray)，[Blob](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob)， [DOMString](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMString)
- `options`：可选项，字典格式类型，可以指定如下两个属性：
  - `type`：默认值为 `""`，它代表了将会被放入到`blob`中的数组内容的`MIME`类型。
  - `endings`：默认值为`"transparent"`，用于指定包含行结束符`\n`的字符串如何被写入。 它是以下两个值中的一个： `"native"`，表示行结束符会被更改为适合宿主操作系统文件系统的换行符； `"transparent"`，表示会保持`blob`中保存的结束符不变。

例如：

```javascript
var data1 = "a";
var data2 = "b";
var data3 = "<div style='color:red;'>This is a blob</div>";
var data4 = { "name": "abc" };

var blob1 = new Blob([data1]);
var blob2 = new Blob([data1, data2]);
var blob3 = new Blob([data3]);
var blob4 = new Blob([JSON.stringify(data4)]);
var blob5 = new Blob([data4]);
var blob6 = new Blob([data3, data4]);

console.log(blob1);  //输出：Blob {size: 1, type: ""}
console.log(blob2);  //输出：Blob {size: 2, type: ""}
console.log(blob3);  //输出：Blob {size: 44, type: ""}
console.log(blob4);  //输出：Blob {size: 14, type: ""}
console.log(blob5);  //输出：Blob {size: 15, type: ""}
console.log(blob6);  //输出：Blob {size: 59, type: ""}
```

:::important
- `size`代表`Blob`对象中所包含数据的字节数。由此可以读取一个中文字符占几个字节

```javascript
var data = '崔'

var blob = new Blob([data])

console.log(blob); //输出：Blob {size: 3, type: ""}
```

- `blob5`的`size`等于`15`是如何计算而来的呢？当传入的数据类型不是`Blob`接收的数据类型会调用`toString()`方法得到字符串数据，所以，`blob5`保存的数据是`"[object Object]"`，是15个字节。
:::

***

## 应用场景

### 同页面的 Web Worker

```html
<body>
  <script id="worker" type="app/worker">
    addEventListener('message', function () {
      postMessage('some message');
    }, false);
  </script>

  <script>
    var blob = new Blob([document.querySelector('#worker').textContent]);
    var url = window.URL.createObjectURL(blob);
    var worker = new Worker(url);

    worker.onmessage = function (e) {
      // e.data === 'some message'
    };
  </script>
</body>
```

***

### 以链接的形式插入 css

```javascript
window.URL = window.URL || window.webkitURL;

var blob = new Blob(['body { color: red; }'], {type: 'text/css'});

var link = document.createElement('link');
link.rel = 'stylesheet';
link.href = window.URL.createObjectURL(blob);
document.body.appendChild(link);
```

### 创建下载文件

```javascript
function createDownloadFile() {
  var content = "Blob Data";
  var blob = new Blob([content], {type : 'application/json'});
  var link = document.getElementsByTagName("a")[0];
  link.download = "file";
  link.href = URL.createObjectURL(blob);
}
```

:::important
只要需要`link`的地方，都可以使用`URL.createObjectURL`转换：

```javascript
objectURL = URL.createObjectURL(object);

// URL.revokeObjectURL() 静态方法用来释放一个之前通过调用 URL.createObjectURL() 创建的已经存在的 URL 对象。当你结束使用某个 URL 对象时，应该通过调用这个方法来让浏览器知道不再需要保持这个文件的引用了
URL.revokeObjectURL(objectURL);
```

:::

***

## slice 方法

`Blob`对象有一个`slice`方法，返回一个新的`Blob`对象，包含了源`Blob`对象中指定范围内的数据。

```javascript
slice([start[, end[, contentType]]])
```

参数说明：

- `start`： 可选，代表`Blob`里的下标，表示第一个会被会被拷贝进新的`Blob`的字节的起始位置。如果传入的是一个负数，那么这个偏移量将会从数据的末尾从后到前开始计算。

- `end`： 可选，代表的是`Blob`的一个下标，这个下标-1的对应的字节将会是被拷贝进新的`Blob`的最后一个字节。如果你传入了一个负数，那么这个偏移量将会从数据的末尾从后到前开始计算。

- `contentType`： 可选，给新的`Blob`赋予一个新的文档类型。这将会把它的`type`属性设为被传入的值。它的默认值是一个空的字符串。

```javascript
var data = "abcdef";
var blob1 = new Blob([data]);
var blob2 = blob1.slice(0,3);

console.log(blob1);  //输出：Blob {size: 6, type: ""}
console.log(blob2);  //输出：Blob {size: 3, type: ""}
```

## 参考

### [细说Web API中的Blob](https://segmentfault.com/a/1190000011563430)

### [字节跳动面试官：请你实现一个大文件上传和断点续传](https://juejin.im/post/5dff8a26e51d4558105420ed)
