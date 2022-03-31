# px em rem vw/vh 的区别

## 题目

px % em rem vw/vh 的区别

## px

像素，基本单位,绝对单位(其他的都是相对单位)

## %

相对于父元素的尺寸。

如根据 `position: absolute;` 居中显示时，需要设置 `left: 50%`

```css
.container {
    with: 200px;
    height: 200px;
    position: relative;
}
.box {
    with: 100px;
    height: 100px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-top: -50px;
    margin-left: -50px;
}
```

## em

相对于当前元素的 `font-size`。首行缩进可以使用 `text-indent: 2em`。

```html
<div style="font-size: 20px;">
        <p style="text-indent: 2em; font-size: 40px;">首行缩进</p>
        <p style="text-indent: 2em;">北宋仁宗年间，某年京师瘟疫盛行，军民伤损甚多。天子钦点洪太尉前往江西信州龙虎山，宣请张天师驱邪除祟</p>
</div>
```

## rem

rem = root em

相对于根元素的 `font-size` 。可以根据媒体查询，设置根元素的 `font-size` ，实现移动端适配。

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>rem</title>
    <style>
        @media only screen and (max-width: 374px) {
            /* iphone5 或者更小的尺寸，以 iphone5 的宽度（320px）比例设置 font-size */
            html {
                font-size: 86px;
            }
        }
        
        @media only screen and (min-width: 375px) and (max-width: 413px) {
            /* iphone6/7/8 和 iphone x */
            html {
                font-size: 100px;
            }
        }
        
        @media only screen and (min-width: 414px) {
            /* iphone6p 或者更大的尺寸，以 iphone6p 的宽度（414px）比例设置 font-size */
            html {
                font-size: 110px;
            }
        }
        
        p {
            font-size: .16rem;
        }
    </style>
</head>

<body>
    <p>北宋仁宗年间，某年京师瘟疫盛行，军民伤损甚多。天子钦点洪太尉前往江西信州龙虎山，宣请张天师驱邪除祟。洪太尉寻天师不见，却因固执走了上清宫中镇压的一百单八个魔头。转眼数十年过去，正是哲宗在位之时。破落户高俅凭借一身的奇技淫巧深得端王欢心，随即平步青云。待端王继位为徽宗，高俅更到了不可一世的地步</p>
</body>

</html>
```

## vw/vh

- vw 屏幕宽度的 1%
- vh 屏幕高度的 1%
- vmin 两者最小值
- vmax 两者最大值

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>vw vh</title>
    <style>
        div {
            border: 1px solid #ccc;
            margin-top: 20px;
        }
        
        #div1 {
            width: 10vw;
            height: 10vh;
        }
        
        #div2 {
            width: 10vmax;
            height: 10vmax;
        }
        
        #div3 {
            width: 10vmin;
            height: 10vmin;
        }
    </style>
</head>

<body>
    <div id="div1">div1</div>
    <div id="div2">div2</div>
    <div id="div3">div3</div>
</body>

</html>
```

