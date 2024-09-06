import {makeAutoObservable} from "mobx";
import {vailMcDir} from "../util/McFileUtil";

// 默认文本
export const DEFAULT_TEXT = {
    // 当前预览的资源信息
    assetInfo: null,

};

/**
 * 资源查看Store
 */
class AssetViewStore {
    // 当前预览的资源信息
    assetInfo = DEFAULT_TEXT.assetInfo;
    // 工具选定的游戏版本
    activeGameVer = DEFAULT_TEXT.gameVer;

    constructor() {
        //自动把数据改为响应式
        makeAutoObservable(this);
    }

    //Action

    setGameRootDir(dir) {
        if (!vailMcDir(dir)) {
            return;
        }

        this.gameRootDir = dir;
        this.activeGameVer = DEFAULT_TEXT.gameVer;
    }

    setActiveGameVer(ver) {
        // 判空
        if (!ver) {
            return;
        }

        this.activeGameVer = ver;
    }

    setAssetId(id) {

    }

}

export default AssetViewStore;