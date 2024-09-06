// 拼接地址
const path = require("path");
const stitchingPath = (...dir) => {
    // 拼接结果
    const result = {
        success: false,
        dir: null,
    };

    console.log("dir", dir)

    if (!dir || dir.length === 0) {
        return result;
    }

    for (let i = 0; i < dir.length; i++) {
        if (!dir[i]) {
            return result;
        }
    }

    // 开始拼接
    result.success = true;
    result.dir = path.join(...dir);
    return result;
}

module.exports = {
    stitchingPath
};