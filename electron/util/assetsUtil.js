const {appConfig, MC_FILE_PATH} = require("../appConfig");
const {stitchingPath} = require("./pathUtil");


// 拼接出资源路径
const stitchingAssetPath = (gameRootDir, hashName) => {
    const hashFileDir = hashName.substring(0, 2);
    return stitchingPath(gameRootDir, MC_FILE_PATH.assets.path, hashFileDir, hashName);
}

// 根据资源hash查找资源名称
const getAssetNameByAssetName = (assetName) => {
    const assetsIndex = appConfig.getAssetsIndex();
    return assetsIndex[assetName];
}

module.exports = {
    stitchingAssetPath,
    getAssetNameByAssetName
};