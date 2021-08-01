const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
    .BundleAnalyzerPlugin;

if (process.env.NODE_ENV === "production") {
    // 生产阶段 npm run build
    module.exports = {
        devtool: "none",
        plugins: [new BundleAnalyzerPlugin()],
        externals: {
            vue: "Vue",
            vuex: "Vuex",
            "vue-router": "VueRouter",
            axios : "axios",
        }
    };
} else {
    module.exports = {};
}