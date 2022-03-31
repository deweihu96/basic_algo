# for...in 和 for...of 的区别

# 题目

for...in 和 for...of 的区别

## key 和 value

for...in 遍历 key , for...of 遍历 value

```js
const arr = [10, 20, 30]
for (let n in arr) {
    console.log(n)  // 打印出来的就是 0、1、2
}
for (let n of arr) {
    console.log(n) // 打印出来的就是 10、20、30
}

const str = 'abc'
for (let s of str) {
    console.log(s) // 打印出来的就是 0、1、2
}
for (let s of str) {
    console.log(s) // 打印出来的就是 a、b、c
}
```

```js
// for...of 可以获取 value ，而 for...in 获取 key
function fn() {
    for (let argument in arguments) {
        console.log(argument) // 打印出来的就是 0、1、2
    }
    for (let argument of arguments) {
        console.log(argument) // for...of 可以获取 value ，而 for...in 获取 key
    }
}
fn(10, 20, 30)

const pList = document.querySelectorAll('p')
for (let p in pList) {
     console.log(p) // 打印出来的就是 0、1、2
}
for (let p of pList) {
    console.log(p) // for...of 可以获取 value ，而 for...in 获取 key
}
```

## 遍历对象

for...in 可以遍历对象，for...of 不可以

```js
const obj = {
      name: '双越',
      city: '北京'
}
for (let val of obj) {
    console.log(val) // 错误的 Uncaught TypeError: obj is not iterable
}
for (let val in obj) {
    console.log(val) // name city
}
```

## 遍历 Map/Set

for...of 可以遍历 Map/Set ，for...in 不可以

```js
const set1 = new Set([10, 20, 30])
for (let n of set1) {
    console.log(n)   // 10、20、30
}

let map1 = new Map([
    ['x', 10], ['y', 20], ['z', 3]
])
for (let n of map1) {
    console.log(n)  // ['x', 10]、['y', 20]、['z', 3]
}
```

## 遍历 generator

for...of 可遍历 generator ，for...in 不可以

```js
function* foo(){
  yield 10
  yield 20
  yield 30
}
for (let o of foo()) {
  console.log(o)  // 10、20、30
}
```

## 对象的可枚举属性

for...in 遍历一个对象的可枚举属性。对象，数组，字符传

使用 `Object.getOwnPropertyDescriptors(obj)` 可以获取对象的所有属性描述，看 ` enumerable: true` 来判断该属性是否可枚举。

```js
//Object.getOwnPropertyDescriptors(obj)
enumerable:克枚举的属性
value：
writable:
configurable:
```

## 可迭代对象

for...of 遍历一个可迭代对象。
其实就是迭代器模式，通过一个 `next` 方法返回下一个元素。

该对象要实现一个 `[Symbol.iterator]` 方法，其中返回一个 `next` 函数，用于返回下一个 value（不是 key）。
可以执行 `arr[Symbol.iterator]()` 看一下。

```js
const arr=[10,20,30];
arr[Symbol.iterator]()
```

JS 中内置迭代器的类型有 `String` `Array` `arguments` `NodeList` `Map` `Set` `generator` 等。

## 答案

- for...in 遍历一个对象的可枚举属性，如对象、数组、字符串。针对属性，所以获得 key
- for...of 遍历一个可迭代对象，如数组、字符串、Map/Set 。针对一个迭代对象，所以获得 value
- 遍历对象：for...in 可以，for...of 可以，
- 遍历Map Set：for...in 不可以，for...of 可以，
- 遍历generator: for...in 不可以，for...of 可以，

## 划重点

“枚举” “迭代” 都是计算机语言的一些基础术语，目前搞不懂也没关系。
但请一定记住 for...of 和 for...in 的不同表现。

## 连环问：for await...of

用于遍历异步请求的可迭代对象。(用于遍历多个Promise)

```js
// 像定义一个创建 promise 的函数
function createTimeoutPromise(val) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(val)
        }, 1000)
    })
}
```

如果你明确知道有几个 promise 对象，那直接处理即可

```js
(async function () {
    const p1 = createTimeoutPromise(100)
    const p2 = createTimeoutPromise(200)

    const v1 = await p1
    console.log(v1) // 100
    const v2 = await p2
    console.log(v2) // 200
})()
```

如果你有一个对象，里面有 N 个 promise 对象，你可以这样处理

```js
(async function () {
    const list = [
        createTimeoutPromise(100),
        createTimeoutPromise(200)
    ]

    // 第一，使用 Promise.all 执行
    Promise.all(list).then(res => console.log(res))  // [100,200,300]

    // 第二，使用 for await ... of 遍历执行
    for await (let p of list) {
        console.log(p)  //100、200
    }

    // 注意，如果用 for...of 只能遍历出各个 promise 对象，而不能触发 await 执行
})()
```

【注意】如果你想顺序执行，只能延迟创建 promise 对象，而不能及早创建。
即，你创建了 promise 对象，它就立刻开始执行逻辑。

```js
(async function () {
    // 一个个单独调用
    const v1 = await createTimeoutPromise(10)
    console.log(v1)
    const v2 = await createTimeoutPromise(20)
    console.log(v2)

    // 循环调用
    for (let n of [100, 200]) {
        const v = await createTimeoutPromise(n)
        console.log('v', v)
    }
})()
```
