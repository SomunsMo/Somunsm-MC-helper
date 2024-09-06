import './App.css';
import {useRoutes} from "react-router";
import {RouterMap} from "./router";
import {useEffect} from "react";
import useStore from "./store/rootStore";

function App() {
    const {ConfigStore} = useStore();

    // 加载软件配置
    useEffect(() => {
        console.log("软件配置加载中")

        window.ElectronAPI.getConfigs().then(appConfigs => {
            console.log("appConfigs:", appConfigs);

            ConfigStore.setGameRootDir(appConfigs.gameRootDir);
            ConfigStore.setActiveGameVer(appConfigs.activeGameVer);
        })

    }, []);

    return useRoutes(RouterMap);
}

export default App;
