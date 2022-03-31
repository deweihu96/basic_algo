// 处理千分号的问题
function format(v) {
    const reg = /\d{1,3}(?=(\d{3})+$)/g;
    // ``可以把数字转为string的类型
    return `${v}`.replace(reg, '$&,')
}

function wrapperObject(o, k) {
    if (o && k.indexOf('.') >= 0) {
        const keys = k.split('.')
        keys.forEach(key => {
            o = o[key]
        })
        return o
    } else {
        return o && o[k] ? o[k] : {}
    }
}

function wrapperArray(o, k) {
    return o && o[k] ? o[k] : []
}

// 处理金钱的问题
function wrapperMoney(o, k) {
    return o && o[k] ? `¥ ${format(o[k])}` : '¥ 0.00'
}

function wrapperOriginalNumber(o, k) {
    return o && o[k] ? o[k] : 0
}

function wrapperNumber(o, k) {
    return o && o[k] ? format(o[k]) : 0
}

// 处理%
function wrapperPercentage(o, k) {
    return o && o[k] ? `${o[k]}%` : '0%'
}

export default {
    computed: {
        reportData() {
            return this.getReportData()
        },
        // 累计销售额
        salesToday() {
            return wrapperMoney(this.reportData, 'salesToday')
        },
        // 累计销售额 日同比
        salesGrowthLastDay() {
            return wrapperPercentage(this.reportData, 'salesGrowthLastDay')
        },
        // 累计销售额 月同比
        salesGrowthLastMonth() {
            return wrapperPercentage(this.reportData, 'salesGrowthLastMonth')
        },
        // 累计销售额 昨日销售额
        salesLastDay() {
            return wrapperMoney(this.reportData, 'salesLastDay')
        },
        // 累计订单量
        orderToday() {
            return wrapperNumber(this.reportData, 'orderToday')
        },
        // 累计订单量 昨日订单量
        orderLastDay() {
            return wrapperNumber(this.reportData, 'orderLastDay')
        },
        // 累计订单量 曲线图
        orderTrend() {
            return wrapperArray(this.reportData, 'orderTrend')
        },
        // 今日交易用户数
        orderUser() {
            return wrapperNumber(this.reportData, 'orderUser')
        },
        // 今日交易用户数 退货率
        returnRate() {
            return wrapperPercentage(this.reportData, 'returnRate')
        },
        // 今日交易用户数 曲线图
        orderUserTrend() {
            return wrapperArray(this.reportData, 'orderUserTrend')
        },
        // 今日交易用户数 曲线图 x轴
        orderUserTrendAxis() {
            return wrapperArray(this.reportData, 'orderUserTrendAxis')
        },
        // 累计用户数
        userToday() {
            return wrapperNumber(this.reportData, 'userToday')
        },
        // 累计用户数 柱状图 今日用户数
        userTodayNumber() {
            return wrapperOriginalNumber(this.reportData, 'userToday')
        },
        // 累计用户数 柱状图 上月用户数
        userLastMonth() {
            return wrapperOriginalNumber(this.reportData, 'userLastMonth')
        },
        // 累计用户数 日同比
        userGrowthLastDay() {
            return wrapperNumber(this.reportData, 'userGrowthLastDay')
        },
        // 累计用户数 月同比
        userGrowthLastMonth() {
            return wrapperNumber(this.reportData, 'userGrowthLastMonth')
        },
        orderFullYear() {
            return wrapperArray(this.reportData, 'orderFullYear')
        },
        orderFullYearAxis() {
            return wrapperArray(this.reportData, 'orderFullYearAxis')
        },
        // 排行榜数据
        orderRank() {
            return wrapperArray(this.reportData, 'orderRank')
        },
        userFullYear() {
            return wrapperArray(this.reportData, 'userFullYear')
        },
        userFullYearAxis() {
            return wrapperArray(this.reportData, 'userFullYearAxis')
        },
        userRank() {
            return wrapperArray(this.reportData, 'userRank')
        },
        wordCloud() {
            return this.getWordCloud()
        },
        category1() {
            return wrapperObject(this.reportData, 'category.data1')
        },
        category2() {
            return wrapperObject(this.reportData, 'category.data2')
        },
        mapData() {
            return this.getMapData()
        }
    },
    filters: {
        format(v) {
            return format(v)
        }
    },
    inject: ['getReportData', 'getWordCloud', 'getMapData']
}