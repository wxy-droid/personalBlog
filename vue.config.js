// vue-cli的配置文件
module.exports = {
    // 代理
    devServer: {
        proxy: {

            "/api/articles": {
                target: "https://zhuanlan.zhihu.com"
            }
        }
    },
    // 分析打包结果
    configureWebpack: require("./webpack.config"),
}