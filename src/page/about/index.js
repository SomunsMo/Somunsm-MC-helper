import React, {useEffect, useState} from 'react';
import {AboutStyle} from "./style";
import Description from "../../components/description";
import useStore from "../../store/rootStore";

// 地址列表
const URL = {
    // 创建人B站主页
    creatorBilibili: "https://space.bilibili.com/66932246",
    // 开源地址
    openSource: "https://github.com/SomunsMo/Somunsm-MC-helper",

};

const About = () => {
    const {ConfigStore} = useStore();

    // 软件及依赖的版本信息
    const [appVer, setAppVer] = useState({})

    useEffect(() => {
        setAppVer(ConfigStore.getAppVer());
    }, []);

    // 默认浏览器打开链接
    const openUrl = (url) => {
        window.ElectronAPI.openUrl(url);
    }

    // 获取一个自定义超链接
    const getLink = (url, text, title) => {
        return (
            <span className={"link"} onClick={() => openUrl(url)} title={title}>
                {text}
            </span>
        );
    };

    return (
        <AboutStyle>
            <h4>关于</h4>
            <Description name={"创建人"}
                         content={getLink(URL.creatorBilibili, "索姆斯小鼠", "前往创建人的B站主页")}
                         inline={true}/>
            <Description name={"开源地址"}
                         content={getLink(URL.openSource, "Somunsm-MC-helper", "前往开源仓库")}
                         inline={true}/>
            <Description name={"开源协议"} content={"MIT (The Massachusetts Institute of TechnologyLicense)"}
                         inline={true}/>
            <Description name={"软件版本"} content={appVer.app} inline={true}/>
            <hr/>
            <Description name={"NodeJs"} content={appVer.node} inline={true}/>
            <Description name={"Chrome"} content={appVer.chrome} inline={true}/>
            <Description name={"Electron"} content={appVer.electron} inline={true}/>
        </AboutStyle>
    );
};

export default About;