# requestIdleCallback

## 题目

是否了解过 requestIdleCallback ？

## 由 React Fiber 引起的关注

React 16 内部使用 Fiber ，即组件渲染过程可以暂停，先去执行高优任务，CPU 闲置时再继续渲染。
其中用到的核心 API 就是 requestIdleCallback 。

## requestAnimationFrame 每次渲染都执行，高优

页面的渲染是一帧一帧进行的，至少每秒 60 次（即 16.6ms 一次）才能肉眼感觉流畅。所以，网页动画也要这个帧率才能流畅。

用 JS 来控制时间是不靠谱的，因为 JS 执行本身还需要时间，而且 JS 和 DOM 渲染线程互斥。所以 ms 级别的时间会出现误差。<br>
`requestAnimationFrame` 就解决了这个问题，浏览器每次渲染都会执行，不用自己计算时间。

代码参考 requestAnimationFrame.html

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>requestAnimationFrame</title>
    <style>
        #box {
            width: 100px;
            height: 50px;
            border: 3px solid #333;
        }
    </style>
</head>

<body>
    <p>requestAnimationFrame</p>

    <button id="btn1">change</button>
    <div id="box"></div>

    <script>
        const box = document.getElementById('box')

        document.getElementById('btn1').addEventListener('click', () => {
            let curWidth = 100
            const maxWidth = 400

            function addWidth() {
                curWidth = curWidth + 3
                box.style.width = `${curWidth}px`
                if (curWidth < maxWidth) {
                    window.requestAnimationFrame(addWidth) // 时间不用自己控制
                }
            }
            addWidth()
        })
    </script>
</body>

</html>
```

## requestIdleCallback 空闲时才执行，低优

requestIdleCallback 会在网页渲染完成后，CPU 空闲时执行，不一定每一帧都执行。

requestIdleCallback 不适合执行 DOM 操作，因为修改了 DOM 之后下一帧不一定会触发修改。

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>requestIdleCallback</title>
</head>

<body>
    <p>requestIdleCallback</p>

    <script>
        window.onload = () => {
            console.info('start')
            setTimeout(() => {
                console.info('timeout')
            })
            window.requestIdleCallback(() => {
                console.info('requestIdleCallback')
            })
            window.requestAnimationFrame(() => {
                console.info('requestAnimationFrame')
            })
            console.info('end')
        }
    </script>
</body>

</html>
```

## 宏任务

requestAnimationFrame 和 requestIdleCallback 都是宏任务，它们比 setTimeout 更晚触发。都要等DOM渲染完之后才会去执行。

## 使用场景

requestAnimationFrame 可用于网页动画。

requestIdleCallback 可用于一些低优先级的场景，以代替 setTimeout 。例如发送统计数据。
但请注意 requestIdleCallback 的浏览器兼容性

## 答案

requestIdleCallback 可在网页渲染完成后，CPU 空闲时执行，用于低优先级的任务处理。
