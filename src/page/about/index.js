import React from 'react';
import {AboutStyle} from "./style";
import Description from "../../components/description";

const About = () => {

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
            <Description name={"创建人"} content={<span onClick={toBilibili}>索姆斯小鼠</span>} inline={true}/>
            <Description name={"开源地址"} inline={true}/>
            <Description name={"开源协议"} inline={true}/>
            <Description name={"当前版本"} content={"1.0.0"} inline={true}/>

            <a href="javascript:void(0)" onClick={toBilibili}>创建人B站</a>
        </AboutStyle>
    );
};

export default About;