# nodejs 多进程

## 题目

nodejs 如何开启一个进程，进程之间如何通讯

## 进程 process 和线程 thread

进程，是操作系统进行资源调度和分配的基本单位，每个进程都拥有自己独立的内存区域（参考“堆栈模型”）。
一个进程无法直接访问另一个进程的内存数据，除非通过合法的进程通讯。

执行一个 nodejs 文件，即开启了一个进程，可以通过 `process.pid` 查看进程 id 。

线程，是操作系统进行运算调度的最小单位，线程是附属于进程的。

一个进程可以包含多个线程（至少一个），多线程之间可共用进程的内存数据。如操作系统是一个工厂，进程就是一个车间，线程就是一个一个的工人。

JS 是单线程的，即执行 JS 时启动一个进程（如 JS 引擎，nodejs 等），然后其中再开启一个线程来执行。
虽然单线程，JS 是基于事件驱动的，它不会阻塞执行，适合高并发的场景。

## 为何需要多进程

现代服务器都是多核 CPU ，适合同时处理多进程。即，一个进程无法充分利用 CPU 性能，进程数要等于 CPU 核数。

服务器一般内存比较大，但操作系统对于一个进程的内存分配是有上限的（2G），所以多进程才能充分利用服务器内存。(单进程有内存上限)

## nodejs 开启多进程

`child_process.fork` 可开启子进程执行单独的计算（源码参考 process-fork.js）
- `fork('xxx.js')` 开启一个子进程
- 使用 `send` 发送信息，使用 `on` 接收信息

`cluster.fork` 可针对当前代码，开启多个进程来执行（源码参考 cluster.js）

### fork的方式开启子进程

访问地址:http://localhost:3000/get-sum

```js
// process-fork.js

const http = require('http')
const fork = require('child_process').fork

const server = http.createServer((req, res) => {
    if (req.url === '/get-sum') {
        console.info('主进程 id', process.pid)

        // 开启子进程
        const computeProcess = fork('./compute.js')
        computeProcess.send('开始计算')

        computeProcess.on('message', data => {
            console.info('主进程接受到的信息：', data) // sum is 49995000
            res.end('sum is ' + data)
        })

        computeProcess.on('close', () => {
            console.info('子进程因报错而退出')
            computeProcess.kill()
            res.end('error')
        })
    }
})
server.listen(3000, () => {
    console.info('localhost: 3000')
})
```

```js
// comoute.js

/**
 * @description 子进程，计算
 * @author 双越老师
 */

function getSum() {
    let sum = 0
    for (let i = 0; i < 10000; i++) {
        sum += i
    }
    return sum
}

process.on('message', data => {
    console.log('子进程 id', process.pid)
    console.log('子进程接受到的信息: ', data) // 开始计算

    const sum = getSum()

    // 发送消息给主进程
    process.send(sum)
})
```

### cluster的方式开启子进程

```js
const http = require('http')
const cpuCoreLength = require('os').cpus().length
const cluster = require('cluster')

if (cluster.isMaster) {
    for (let i = 0; i < cpuCoreLength; i++) {
        cluster.fork() // 开启子进程
    }

    cluster.on('exit', worker => {
        console.log('子进程退出')
        cluster.fork() // 进程守护
    })
} else {
    // 多个子进程会共享一个 TCP 连接，提供一份网络服务
    const server = http.createServer((req, res) => {
        res.writeHead(200)
        res.end('done')
    })
    server.listen(3000)
}


// 工作中 PM2工具
```

## 答案

- 可使用 `child_process.fork` 和 `cluster.fork` 开启子进程
- 使用 `send` `on` 传递消息

## 扩展：使用 PM2

nodejs 服务开启多进程、进程守护，可使用 [pm2](https://www.npmjs.com/package/pm2) ，不需要自己写。代码参考 koa2-code
- 全局安装 pm2 `yarn global add pm2`
- 增加 pm2 配置文件
- 修改 package.json scripts
