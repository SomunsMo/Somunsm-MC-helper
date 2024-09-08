import React, {useEffect} from 'react';
import HomeNavigation from "./navigation";
import {HomeStyle} from "./style";
import {Outlet} from "react-router";

import close from "../../resource/close.svg"
import {ReactComponent as Minus} from "../../resource/minus.svg"
import useStore from "../../store/rootStore";
import {Observer} from "mobx-react-lite";

const Home = () => {
    const {ConfigStore} = useStore();

    useEffect(() => {
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
        <Observer>
            {() => (
                <HomeStyle>
                    <div className={"titleBar"}>
                        <div className={"softTitle"}>Somunsm MC Helper</div>
                        <div className={"ctrlBtnArea"}>
                            <div className={"gameVer"}>游戏版本 - {ConfigStore.activeGameVer}</div>
                            <button onClick={minimizeWindow}><Minus fill={"green"}/></button>
                            <button className={"closeWindow"} onClick={closeWindow}><img src={close} alt={"关闭窗口"}/>
                            </button>
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
            )}
        </Observer>
    );
};

export default Home;