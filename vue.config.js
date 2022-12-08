module.exports = {
    lintOnSave: false,
    devServer: {
        port: 9090,//配置前台运行端口
        proxy: { //配置代理服务器
            '/api': {
                target: 'http://1.15.115.81:8080', //代理的目标地址
                pathRewrite: { //路径重写
                    '^/api': '' //选择忽略拦截器里面的单词
                }
            }
        }
    },
    productionSourceMap: false, //打包不生成map
}
