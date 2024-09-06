import React, {useEffect, useRef, useState} from 'react';
import {HomeNavigationStyle} from "./style";
import {Link, useNavigate} from "react-router-dom";

import folder from "../../../resource/nav/folder.svg"
import circleInfo from "../../../resource/nav/circle-info.svg"
import gear from "../../../resource/nav/gear.svg"

// 导航栏宽度
const AREA_WIDTH = {
    // 小尺寸
    minimal: {text: "…", width: 60},
    // 默认尺寸
    df: {text: "≡", width: 160}
}

// 导航栏导航项
const navContent = [
    {ico: folder, title: "资源读取", to: "/assets"},
    {ico: gear, title: "设置", to: "/setting"},
    {ico: circleInfo, title: "关于", to: "/about"},
]

const HomeNavigation = () => {
    const navRoot = useRef();

    let navigate = useNavigate();

    const [miniSize, setMiniSize] = useState(true)
    const [navWidth, setNavWidth] = useState(AREA_WIDTH.minimal.width);

    useEffect(() => {
        // 进入页面后默认路由到第一个子页面
        navigate(navContent[0].to);
    }, []);

    // 改变导航栏伸缩状态
    const resize = () => {
        if (miniSize) {
            setNavWidth(AREA_WIDTH.df.width);
        } else {
            setNavWidth(AREA_WIDTH.minimal.width);
        }

        // 更新取反
        setMiniSize(!miniSize);
    }

    return (
        <HomeNavigationStyle navWidth={navWidth} ref={navRoot} navTileOpacity={miniSize}>
            <button className={"resizeBtn"} onClick={resize}>
                {miniSize ? AREA_WIDTH.df.text : AREA_WIDTH.minimal.text}
            </button>
            <nav>
                {navContent.map((i) => {
                    return (
                        <Link to={i.to} key={i.to}>
                            <img src={i.ico} alt={i.title}/>
                            <p className={"navTitle"}>{i.title}</p>
                        </Link>
                    )
                })}
            </nav>
        </HomeNavigationStyle>
    );
};

export default HomeNavigation;