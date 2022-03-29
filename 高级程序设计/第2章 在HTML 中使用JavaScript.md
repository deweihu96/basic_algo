只要一提到把JavaScript 放到网页中，就不得不涉及Web 的核心语言——HTML。

在当初开发JavaScript 的时候，Netscape 要解决的一个重要问题就是，如何做到让JavaScript 既能与HTML页面共存，又不影响那些页面在其他浏览器中的呈现效果。

经过尝试、纠错和争论，最终的决定就是为Web 增加统一的脚本支持。

Web 诞生早期的很多做法也都保留了下来，并被正式纳入HTML 规范当中。

## 1.script元素

属性：

- **async**：可选。表示应该立即下载脚本，但不应妨碍页面中的其他操作，比如下载其他资源或等待加载其他脚本。**只对外部脚本文件有效**。
- **charset**：可选。表示通过src 属性指定的代码的字符集。由于大多数浏览器会忽略它的值，因此这个属性很少有人用。
- **defer**：可选。表示脚本可以延迟到文档完全被解析和显示之后再执行。**只对外部脚本文件有效**。IE7 及更早版本对嵌入脚本也支持这个属性。
- **language**：已废弃。原来用于表示编写代码使用的脚本语言（如JavaScript、JavaScript1.2或VBScript）。大多数浏览器会忽略这个属性，因此也没有必要再用了。
- **src**：可选。表示包含要执行代码的外部文件。
- **type**：可选。可以看成是language 的替代属性；表示编写代码使用的脚本语言的内容类型（也称为MIME 类型）。


在使用 `<script> `嵌入 JavaScript 代码时，记住不要在代码中的任何地方出现 `</script>` 字符串。
例如，浏览器在加载下面所示的代码时就会产生一个错误：

```html
<script type="text/javascript">
    function sayScript(){
    	alert("</script>");
    }
</script>
```

因为按照解析嵌入式代码的规则，当浏览器遇到字符串 "</script>" 时，就会认为那是结束的</script> 标签。而通过转义字符“/”可以解决这个问题

```html
<script type="text/javascript">
    function sayScript(){
    	alert("<\/script>");
    }
</script>
```

## 2.标签的位置

现代Web 应用程序一般都把全部JavaScript 引用放在<body>元素中页面内容的后面：

```html
<!DOCTYPE html>
<html>
	<head>
		<title>Example HTML Page</title>
	</head>
	<body>
		<!-- 这里放内容 -->
		<script type="text/javascript" src="example1.js"></script>
		<script type="text/javascript" src="example2.js"></script>
	</body>
</html>
```

## 3.延迟脚本

```html
<!DOCTYPE html>
<html>
	<head>
		<title>Example HTML Page</title>
	<script type="text/javascript" defer="defer" src="example1.js"></script>
	<script type="text/javascript" defer="defer" src="example2.js"></script>
	</head>
	<body>
		<!-- 这里放内容 -->
	</body>
</html>
```

延迟脚本在执行时不会影响页面的构造，延迟脚本会被延迟到整个页面都解析完毕后再运行。

在这个例子中，虽然我们把`<script>`元素放在了文档的`<head>`元素中，但其中包含的脚本将延迟到浏览器遇到`</html>`标签后再执行。

在现实当中，延迟脚本并不一定会按照顺序执行，也不一定会在DOMContentLoaded 事件触发前执行，因此最好只包含一个延迟脚本。

## 4.异步脚本

```html
<!DOCTYPE html>
<html>
	<head>
		<title>Example HTML Page</title>
		<script type="text/javascript" async src="example1.js"></script>
		<script type="text/javascript" async src="example2.js"></script>
	</head>
	<body>
		<!-- 这里放内容 -->
	</body>
</html>
```

指定async 属性的目的是不让页面等待两个脚本下载和执行，从而异步加载页面其他内容。

异步脚本一定会在页面的load 事件前执行，但可能会在DOMContentLoaded 事件触发之前或之后执行。

## 5.在XHTML中的用法

可扩展超文本标记语言，即XHTML（Extensible HyperText Markup Language），是将HTML 作为XML 的应用而重新定义的一个标准。

在HTML 中，有特殊的规则用以确定`<script>`元素中的哪些内容可以被解析，但这些特殊的规则在XHTML 中不适用，如下。

```html
<script type="text/javascript">
function compare(a, b) {
	if (a < b) {
		alert("A is less than B");
	} else if (a > b) {
		alert("A is greater than B");
	} else {
		alert("A is equal to B");
	}
}
</script>
```

这里比较语句a < b 中的小于号（<）在XHTML 中将被当作开始一个新标签来解析。但是作为标签来讲，小于号后面不能跟空格，因此就会导致语法错误。

解决方案：

1. ```
   用相应的HTML 实体（&lt）替换代码中所有的小于号（<）
   ```

## 6.不推荐使用的语法

在最早引入`<script>`元素的时候，该元素与传统HTML 的解析规则是有冲突的。

早期不支持JavaScript 的浏览器会把`<script>`元素的内容直接输出到页面中，会破坏页面的布局和外观。

让不支持`<script>`元素的浏览器能够隐藏嵌入的JavaScript 代码，把JavaScript 代码包含在一个HTML 注释中：

```html
<script><!--
function sayHi(){
	alert("Hi!");
}
//--></script>
```

> 由于所有浏览器都已经支持JavaScript，因此也就没有必要再使用这种格式了，不推荐。

## 7.嵌入代码与外部文件

使用外部文件的优点：

- **可维护性**：遍及不同HTML 页面的JavaScript 会造成维护问题。但把所有JavaScript 文件都放在一个文件夹中，维护起来就轻松多了。而且开发人员因此也能够在不触及HTML 标记的情况下，集中精力编辑JavaScript 代码。
- **可缓存**：浏览器能够根据具体的设置缓存链接的所有外部JavaScript 文件。也就是说，如果有两个页面都使用同一个文件，那么这个文件只需下载一次。因此，最终结果就是能够加快页面加载的速度。
- **适应未来**：通过外部文件来包含JavaScript 无须使用前面提到XHTML 或注释hack。HTML 和XHTML 包含外部文件的语法是相同的。

> 并不存在必须使用外部文件的硬性规定

## 8.文档模式

最初的两种文档模式是：**混杂模式**（quirks mode）和**标准模式**（standards mode）

混杂模式会让IE 的行为与（包含非标准特性的）IE5 相同，而标准模式则让IE 的行为更接近标准行为。

如果在文档开始处没有发现文档类型声明，则所有浏览器都会默认开启混杂模式。

不同浏览器在混杂模式下的行为差异非常大，所以要在开头声明文档类型

```html
<!-- HTML 5 -->
<!DOCTYPE html>
```

## 9.noscript元素

在下列情况下，包含在`<noscript>`元素中的内容才会显示出来：

- 浏览器不支持脚本
- 浏览器支持脚本，但脚本被禁用

```html
<noscript>
	<p>本页面需要浏览器支持（启用）JavaScript。
</noscript>
```

