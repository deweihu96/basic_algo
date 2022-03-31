# for vs forEach

## 题目

for 和 forEach 哪个更快？为什么

## 测试

代码参考 for-foreach.html ，测试结果：for 更快

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=q, initial-scale=1.0">
    <title>for vs forEach</title>
</head>

<body>
    <p>for vs forEach</p>

    <script>
        const arr = []
        for (let i = 0; i < 100 * 10000; i++) {
            arr.push(i)
        }
        const length = arr.length

        console.time('for')
        let n1 = 0
        for (let i = 0; i < length; i++) {
            n1++
        }
        console.timeEnd('for') // 3.7ms

        console.time('forEach')
        let n2 = 0
        arr.forEach(() => n2++)
        console.timeEnd('forEach') // 15.1ms
    </script>
</body>

</html>
```

## 创建函数需要开销

for 直接在当前函数中执行，forEach 每次都要新创建一个函数。
函数有单独的作用域和上下文（可回顾“堆栈模型”），所以耗时更久。

## 答案

for 更快，因为 forEach 每次创建函数需要开销

## 扩展

开发中不仅要考虑性能，还要考虑代码的可读性，forEach 可读性更好。
