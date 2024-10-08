import React, {useEffect} from 'react';
import HomeNavigation from "./navigation";
import {HomeStyle} from "./style";
import {Outlet} from "react-router";

import {ReactComponent as Close} from "../../resource/close.svg"
import {ReactComponent as Minus} from "../../resource/minus.svg"
import useStore from "../../store/rootStore";
import {Observer} from "mobx-react-lite";

const Home = () => {
    const {ConfigStore} = useStore();

    useEffect(() => {

        // 获取软件信息
        window.ElectronAPI.getAppVer()
            .then(res => {
                console.log(res);
                ConfigStore.setAppVer(res);
            });

        // 屏蔽刷新快捷键
        window.addEventListener('keydown', (ev) => {
            const isHotkey1 = ev.key === "F5";
            const isHotkey2 = ev.ctrlKey && (ev.key === "R" || ev.key === "r");
            if (isHotkey1 || isHotkey2) {
                ev.preventDefault();
            }
        });
    }, []);

    const minimizeWindow = () => {
        window.ElectronAPI.minimizeWindow();
    }
    const closeWindow = () => {
        window.ElectronAPI.closeWindow();
    }

    return (
        <HomeStyle>
            <div className={"titleBar"}>
                <div className={"softTitle"}>Somunsm MC Helper</div>
                <div className={"ctrlBtnArea"}>
                    <Observer>
                        {() => (
                            <div className={"gameVer"}>游戏版本 - {ConfigStore.activeGameVer}</div>
                        )}
                    </Observer>
                    <button onClick={minimizeWindow}><Minus/></button>
                    <button className={"closeWindow"} onClick={closeWindow}><Close/></button>
                </div>
            </div>
            <div className={"mainContentArea"}>
                <div className={"homeNavigation"}>
                    <HomeNavigation/>
                </div>
                <div className={"content"}>
                    <Outlet/>
                </div>
            </div>
        </HomeStyle>
    );
};

export default Home;