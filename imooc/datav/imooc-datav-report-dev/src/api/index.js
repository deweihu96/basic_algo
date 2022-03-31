import request from '../utils/request'

// const icode = '13926EAFCAA16CC3'   C2CE489D152F6DD7
const icode = 'C2CE489D152F6DD7'

export function wordcloud() {
    return request({
        // url: '/api/screen/wordcloud',
        url: "./wordcloud.json",
        method: 'get',
        params: { icode }
    })
}

export function mapScatter() {
    return request({
        url: '/api/screen/map/scatter',
        method: 'get',
        params: { icode }
    })
}

export function screenData() {
    return request({
        url: '/api/screen/data',
        method: 'get',
        params: { icode }
    })
}