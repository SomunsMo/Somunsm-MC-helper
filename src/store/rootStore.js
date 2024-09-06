import React from "react";
import ConfigStore from "./configStore";
import AssetViewStore from "./assetViewStore";

/**
 * 集中管理Store
 */
class RootStore {

    constructor() {
        this.ConfigStore = new ConfigStore();
        this.AssetViewStore = new AssetViewStore();
    }

}

//实例化根Store
const rootStore = new RootStore();

//使用到React的Context机制
//Store会先查询Provider标签的store中查找，如果没找到再从createContext中查找
const store = React.createContext(rootStore);

const useStore = () => (React.useContext(store));

export default useStore;