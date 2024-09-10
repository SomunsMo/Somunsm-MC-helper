import {makeAutoObservable} from "mobx";
import {vailMcDir} from "../util/McFileUtil";

// 默认文本
export const DEFAULT_TEXT = {
    appVer: {
        node: "unknown",
        chrome: "unknown",
        electron: "unknown",
        app: "unknown",
    },
    gameVer: "无",
    // 游戏根目录
    gameRootDir: "-",
};

/**
 * 软件配置Store
 */
class ConfigStore {
    // 软件及依赖的版本信息
    appVer = DEFAULT_TEXT.appVer;
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

    // 获取软件及依赖的版本信息
    getAppVer = () => {
        console.log(this.appVer);
        return this.appVer;
    }

    // 缓存软件及依赖的版本信息
    setAppVer = (ver) => {
        if (!ver) {
            return;
        }
        this.appVer = ver;
    }

}

export default ConfigStore;