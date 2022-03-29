# 第11章 DOM 扩展

对 DOM 的两个主要的扩展是 Selectors API（选择符 API）和 HTML5。这两个扩展都源自开发社区，两者被使用的频率极高。

## 11.1 选择符API

* Selectors API（ www.w3.org/TR/selectors-api/）是由 W3C 发起制定的一个标准，致力于让浏览器原生支持 CSS 查询。
* Selectors API Level 1 的核心是两个方法： querySelector()和 querySelectorAll()。

### 11.1.1 querySelector()方法

* querySelector()方法接收一个 CSS 选择符，返回与该模式匹配的第一个元素，如果没有找到匹配的元素，返回 null。如果传入了不被支持的选择符， querySelector()会抛出错误。
* Document 类型调用 querySelector()方法时，会在文档元素的范围内查找匹配的元素。而通过 Element 类型调用 querySelector()方法时，只会在该元素后代元素的范围内查找匹配的元素。

### 11.1.2 querySelectorAll()方法

* querySelectorAll()方法接收的参数与 querySelector()方法一样，返回的是一个 NodeList 的实例，是某时刻的快照。
* 要取得返回的 NodeList 中的每一个元素，可以使用 item()方法，也可以使用方括号语法。

### 11.1.3 matchesSelector()方法

* 浏览器的支持情况不确定。
* matchesSelector() 这个方法接收一个参数，即 CSS 选择符，如果调用元素与该选择符匹配，返回 true；否则，返回 false。

## 11.2 元素遍历

因为空白文本节点的存在，不同的浏览器在获取子节点的时候表现不一样，有的返回空白文本节点，而有的不。为了抹平这一差距，诞生了一组新的属性。例如firstElementChild方法，它是firstChild的元素版本，它不会返回空白文本。其他的获取子节点以及相对应的元素版本：

* childElementCount：返回子元素（不包括文本节点和注释）的个数。
* lastElementChild：指向最后一个子元素； lastChild 的元素版。
* previousElementSibling：指向前一个同辈元素； previousSibling 的元素版。
* nextElementSibling：指向后一个同辈元素； nextSibling 的元素版。

## 11.3 HTML5

简单地讲，HTML5 规范则围绕“如何使用新增标记”，定义了大量 JavaScript API。

### 11.3.1 与类相关的扩充

HTML5新增的对类的操作主要有：

1. getElementsByClassName
2. classList

```
//删除"disabled"类
div.classList.remove("disabled");
//添加"current"类
div.classList.add("current");
//切换"user"类
div.classList.toggle("user");
```

### 11.3.2 焦点管理

HTML5 也添加了辅助管理 DOM 焦点的功能。
首先就是 `document.activeElement` 属性，引用了DOM中获得焦点的元素。文档刚加载完成时，引用的是body元素，文档加载期间引用的是null。
另外就是新增了 document.hasFocus()方法，这个方法用于确定文档是否获得了焦点，可以用来判断用户是否离开了页面。

### 11.3.3 HTMLDocument的变化

HTML5扩展了document一些属性：

1. readyState 属性，它有两种情况，一种是`loading`，另一种是`complete`
2. compatMode 属性，告诉开发者当前浏览器采用了哪种渲染模式。"CSS1Compat"-标准模式，"BackCompat"-兼容模式。
3. head 属性，返回<head>元素的引用。

### 11.3.4 字符集属性

`document.charset`，返回当前文档使用的字符集，默认情况下值为'UTF-16'。
`document.defaultCharset`，返回当前文档根据系统设置自，默认使用的字符集。该属性浏览器支持情况不多。

### 11.3.5 自定义数据属性

HTML5规定可以为元素添加自定义属性，但是要以`data-`为前缀，自定义属性添加完后，可以通过元素的dataset属性来访问。看个例子：

```html
<div id='myDiv' data-appId='123'></div>
```

```javascript
//本例中使用的方法仅用于演示
var div = document.getElementById("myDiv");
//取得自定义属性的值
var appId = div.dataset.appId;
//设置值
div.dataset.appId = 23456;
```

### 11.3.6 插入标记

### 11.3.7 scrollIntoView()方法

## 11.4 专有扩展

### 11.4.1 文档模式

### 11.4.2 children属性

### 11.4.3 contains()方法

### 11.4.4 插入文本

### 11.4.5 滚动













































```javascript

```