# 手写 instanceof

## 题目

instanceof 的原理是什么，请用代码来表示

## 原型链

![](./img/原型链.png)

## instanceof 原理

例如 `f instanceof Foo` 就是：顺着 `f` 的 `__proto__` 链向上找，能否找到 `Foo.prototype`

代码参考 instanceof.ts

```ts
/**
 * @description 手写 instanceof
 * @author 双越老师
 */

/**
 * 自定义 instanceof
 * @param instance instance
 * @param origin class or function
 */
export function myInstanceof(instance: any, origin: any): boolean {
    if (instance == null) return false // null undefined

    const type = typeof instance
    if (type !== 'object' && type !== 'function') {
        // 值类型 所有的值类型instance都返回false
        return false
    }

    let tempInstance = instance // 为了防止修改 instance
    while (tempInstance) {
        if (tempInstance.__proto__ === origin.prototype) {
            return true // 配上了
        }
        // 未匹配
        tempInstance = tempInstance.__proto__ // 顺着原型链，往上找
    }

    return false
}

// // 功能测试
console.info(myInstanceof({}, Object))
console.info(myInstanceof([], Object))
console.info(myInstanceof([], Array))
console.info(myInstanceof({}, Array))
console.info(myInstanceof('abc', String))
```

```ts
/**
 * @description 自定义 instanceof test
 * @author 双越老师
 */

import { myInstanceof } from './instanceof'

describe('自定义 instanceof', () => {
    it('null undefined', () => {
        const res1 = myInstanceof(null, Object)
        expect(res1).toBe(false)

        const res2 = myInstanceof(undefined, Object)
        expect(res2).toBe(false)
    })
    it('值类型', () => {
        const res1 = myInstanceof(100, Number)
        expect(res1).toBe(false)

        const res2 = myInstanceof('a', String)
        expect(res2).toBe(false)
    })
    it('引用类型', () => {
        const res1 = myInstanceof([], Array)
        expect(res1).toBe(true)

        const res2 = myInstanceof({}, Object)
        expect(res2).toBe(true)

        const res3 = myInstanceof({}, Array)
        expect(res3).toBe(false)
    })
    it('函数', () => {
        function fn() {}
        const res = myInstanceof(fn, Function)
        expect(res).toBe(true)
    })
    it('自定义', () => {
        class Foo {}
        const f = new Foo()
        const res1 = myInstanceof(f, Foo)
        expect(res1).toBe(true)

        const res2 = myInstanceof(f, Object)
        expect(res2).toBe(true)
    })
})
```

## 总结

- 原型链
- 循环判断
