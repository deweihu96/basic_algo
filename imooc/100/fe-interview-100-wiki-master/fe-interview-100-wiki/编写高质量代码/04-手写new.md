# 手写 new

## 题目

new 一个对象内部发生了什么，手写代码表示

## class 是语法糖

ES6 使用 class 代替了 ES6 的构造函数

```js
class Foo {
    constructor(name) {
        this.name = name
        this.city = '北京'
    }
    getName() {
        return this.name
    }
}
const f = new Foo('双越')
```

其实 class 就是一个语法糖，它本质上和构造函数是一样的

```js
function Foo(name) {
    this.name = name
    this.city = '北京'
}
Foo.prototype.getName = function () { // 注意，这里不可以用箭头函数
    return this.name
}
const f = new Foo('双越')
```

## new 一个对象的过程

- 创建一个空对象 obj，继承构造函数的原型
- 执行构造函数（将 obj 作为 this）
- 返回 obj

## 实现 new

代码参考 new.ts

```ts
/**
 * @description 实现 new
 * @author 双越老师
 */

export function customNew<T>(constructor: Function, ...args: any[]): T {
    // 1. 创建一个空对象，继承 constructor 的原型
    const obj = Object.create(constructor.prototype)
    // 2. 将 obj 作为 this ，执行 constructor ，传入参数
    constructor.apply(obj, args)
    // 3. 返回 obj
    return obj
}

class Foo {
    // 属性
    name: string
    city: string
    n: number

    constructor(name: string, n: number) {
        this.name = name
        this.city = '北京'
        this.n = n
    }

    getName() {
        return this.name
    }
}

// const f = new Foo('双越', 100)
const f = customNew<Foo>(Foo, '双越', 100)
console.info(f)
console.info(f.getName())
```

```ts
/**
 * @description 自定义 new test
 * @author 双越老师
 */

import { customNew } from './new'

describe('自定义 new',() => {
    it('new', () => {
        class Foo {
            // 属性
            name: string
            city: string
            n: number

            constructor(name: string, n: number) {
                this.name = name
                this.city = '北京'
                this.n = n
            }

            getName() {
                return this.name
            }
        }
        const f = customNew<Foo>(Foo, '双越', 100)
        expect(f.name).toBe('双越')
        expect(f.city).toBe('北京')
        expect(f.n).toBe(100)
        expect(f.getName()).toBe('双越')
    })
})
```

## 面试连环问：Object.create 和 {} 的区别

`Object.create` 可以指定原型，创建一个空对象。
`{}` 就相当于 `Object.create(Object.prototype)` ，即根据 `Object` 原型的空对象。

PS：对 JS 原型和原型链还不了解的需要抓紧恶补。
