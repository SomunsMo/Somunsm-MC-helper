import React from 'react';
import {useLocation} from "react-router";
import {Error404Style} from "./style";
import {useNavigate} from "react-router-dom";
import {PAGE_MAP} from "../../../router/PageMap";

const Error404 = () => {

    // 路由信息
    let location = useLocation();
    // 路由跳转
    let navigate = useNavigate();

    // 回到主页
    const toHome = () => {
        navigate(PAGE_MAP.home.path);
    }

    return (
        <Error404Style>
            <h1>404</h1>
            <p className={"routerPath"}>"{location.pathname}"</p>
            <p>这地址你从哪搞来的</p>
            <button onClick={toHome}>快跑</button>
        </Error404Style>
    );
};

export default Error404;