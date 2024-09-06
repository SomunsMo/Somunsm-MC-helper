const path = require("path");

const resolve = dir => path.resolve(__dirname, dir);

module.exports = {
    webpack: {
        alias: {
            //xx: resolve("目标路径（从根目录开始）")
            "@": resolve("src"),
        }
    },
    babel: {
        plugins: [
            ["@babel/plugin-proposal-decorators", {"legacy": true}]
        ]
    }
}