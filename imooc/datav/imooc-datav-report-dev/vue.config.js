// module.exports = {
//     lintOnSave: false,
//     devServer: {
//         overlay: {
//             warning: false,
//             errors: false
//         }
//     }
// }
module.exports = {
    lintOnSave: false,
    devServer: {
        overlay: {
            warnings: true,
            errors: true
        },
        // host: 'localhost',
        // port: 8080,
        // https: false,
        // open: true,
        // hotOnly: true,
        // proxy: {
        //     '/api': {
        //         target: 'https://apis.imooc.com', //跨域接口的地址 
        //         changeOrigin: true,
        //         pathRewrite: {
        //             '^/api': ''
        //         }
        //     }
        // },
        // headers: {
        //     'Access-Control-Allow-Origin': '*',
        // }
    }
};