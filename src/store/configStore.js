import {makeAutoObservable} from "mobx";
import {vailMcDir} from "../util/McFileUtil";

// 默认文本
export const DEFAULT_TEXT = {
    // 游戏版本
    gameVer: "无",
    // 游戏根目录
    gameRootDir: "-",
};

/**
 * 软件配置Store
 */
class ConfigStore {
    // 游戏根目录
    gameRootDir = DEFAULT_TEXT.gameRootDir;
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

export default ConfigStore;