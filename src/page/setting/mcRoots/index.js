import React, {useEffect, useRef, useState} from 'react';
import {McRootsStyle} from "./style";
import {vailMcDir} from "../../../util/McFileUtil";
import useStore from "../../../store/rootStore";
import {DEFAULT_TEXT} from "../../../store/configStore";
import {Observer} from "mobx-react-lite";

const McRoots = () => {
    const gameVerSelect = useRef();
    const {ConfigStore} = useStore();

    const [gameVerList, setGameVerList] = useState([])

    useEffect(() => {
        getLatestGameVerList();
    }, []);

    // 获取最新版本列表
    const getLatestGameVerList = async () => {
        if (ConfigStore.gameRootDir) {
            // 根据游戏根目录扫描游戏版本列表
            const latestGameVerList = await window.ElectronAPI.scanGameVersion()
            if (latestGameVerList && Array.isArray(latestGameVerList)) {
                setGameVerList(latestGameVerList);
                return latestGameVerList;
            }
        }
    }

    // 用系统资源管理器打开游戏根目录
    const openDir = () => {
        // 判断是否有目录
        if (DEFAULT_TEXT.gameRootDir === ConfigStore.gameRootDir) {
            console.error("没有设定游戏根目录")
            return;
        }

        window.ElectronAPI.openMcRootDir();
    }

    // 设置游戏根目录
    const setGameRoot = async () => {
        const dir = await window.ElectronAPI.getSysDir();
        console.log(dir);

        // 是否取消选择文件夹了
        if (dir.canceled) {
            return;
        }

        // 选择的文件夹路径
        const path = dir.filePaths[0];

        // 没检测到".minecraft"文件夹则不添加
        if (!vailMcDir(path)) {
            console.error("Mc根目录有误");
        }

        // 存储在临时存储中
        ConfigStore.setGameRootDir(path)
        // 持久化根目录
        window.ElectronAPI.saveGameRootDir(path);

        // 获取最新版本列表
        const latestGameVerList = await getLatestGameVerList();

        // 设置版本
        // 临时存储当前选中版本
        ConfigStore.setActiveGameVer(latestGameVerList[0]);
        // 持久化当前选中版本
        window.ElectronAPI.saveActiveGameVer(latestGameVerList[0]);
    }

    // 更改选定的游戏版本
    const changeActiveGameVer = () => {
        let gameVer = gameVerSelect.current.value;
        if (!gameVer) {
            return;
        }

        // 临时存储当前选中版本
        ConfigStore.setActiveGameVer(gameVer);
        // 持久化当前选中版本
        window.ElectronAPI.saveActiveGameVer(gameVer);
    }

    return (
        <Observer>
            {() => (
                <McRootsStyle>
                    <h4>Minecraft根目录</h4>
                    <p className={"rootDir"} onClick={openDir}>{ConfigStore.gameRootDir}</p>
                    <button onClick={setGameRoot}>更改</button>
                    <h5>版本</h5>
                    <select ref={gameVerSelect} className={"gameVerSelector"} onChange={changeActiveGameVer}
                            value={ConfigStore.activeGameVer}>
                        {gameVerList.map(i => <option value={i} key={i}>{i}</option>)}
                    </select>
                </McRootsStyle>
            )}
        </Observer>
    );
};

export default McRoots;