// 多态即执行同样的方法，不同对象会有不同表现。前端用的比较少，因为这个特性一般要结合接口、重载、重写等 
class People {
    constructor(name) {
        this.name = name
    }
    saySomething() {

    }
}
class A extends People {
    constructor(name) {
        super(name)
    }
    saySomething() {
        alert('I am A')
    }
}
class B extends People {
    constructor(name) {
        super(name)
    }
    saySomething() {
        alert('I am B')
    }
}
let a = new A('a')
a.saySomething()
let b = new B('b')
b.saySomething()