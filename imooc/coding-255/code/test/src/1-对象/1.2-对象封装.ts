// ts 代码，放在在线解析器中解析为 es5
class People1 {
    name
    age
    protected weight  // 定义 protected 属性,受保护的属性，只有自己或者子类可以访问
    constructor(name, age) {
        this.name = name
        this.age = age
        this.weight = 120
    }
    eat() {
        alert(`${this.name} eat something`)
    }
    speak() {
        alert(`My name is ${this.name}, age ${this.age}`)
    }
}

class Student1 extends People1 {
    number
    private girlfriend  // 定义 private 属性
    constructor(name, age, number) {
        super(name, age)
        this.number = number
        this.girlfriend = 'xiaoli'
    }
    study() {
        alert(`${this.name} study`)
    }
    getWeight() {
        alert(`${this.weight}`)
    }
}

let xiaoming1 = new Student1('xiaoming', 10, 'A1')
xiaoming1.getWeight()
// console.log(xiaoming.girlfriend) // 注意，编译时会报错，直接会编译不通过！！！