import {makeAutoObservable, toJS} from "mobx";

// 默认文本
export const DEFAULT_TEXT = {
    // 资源列表
    assets: null,
    // 当前预览的资源信息
    assetInfo: null,

};

/**
 * 资源查看Store
 */
class AssetStore {
    // 资源列表 - 从文件中读取的数据
    assets = DEFAULT_TEXT.assets;
    // 当前预览的资源信息
    assetInfo = DEFAULT_TEXT.assetInfo;

    constructor() {
        //自动把数据改为响应式
        makeAutoObservable(this);
    }

    //Action

    // 判断资源列表是否是空的
    assetsIsNull = () => {
        return DEFAULT_TEXT.assets === toJS(this.assets);
    }

    getAssets = () => {
        if (this.assetsIsNull()) {
            return {};
        }
        return this.assets;
    }

    setAssets = (latestAssets) => {
        this.assets = latestAssets;
    }

}

export default AssetStore;