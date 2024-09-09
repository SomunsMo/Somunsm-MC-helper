const path = require("path");

const resolve = dir => path.resolve(__dirname, dir);

module.exports = {
    webpack: {
        alias: {
            //xx: resolve("目标路径（从根目录开始）")
            "@": resolve("src"),
        },
        // 修改craco打包后存放的位置
        configure: (webpackConfig, {env, paths}) => {
            // 修改build的生成文件名称
            paths.appBuild = 'out';
            webpackConfig.output = {
                ...webpackConfig.output,
                path: path.resolve(__dirname, 'out'),
            }
            return webpackConfig;
        }
    },
    babel: {
        plugins: [
            ["@babel/plugin-proposal-decorators", {"legacy": true}]
        ]
    }
}