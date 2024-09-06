import React from 'react';
import PropTypes from 'prop-types';
import {DescriptionStyle} from "./style";

const Description = ({name, content, inline = false, clickCopy = false}) => {


    // 点击复制
    const clickDesc = () => {
        if (!clickCopy) {
            return;
        }

        window.ElectronAPI.clipboard(content.toString());
    }

    return (
        <DescriptionStyle aline={inline} clickcopy={clickCopy}>
            <h5>{name}：</h5>
            <span onClick={clickDesc}>{content}</span>
        </DescriptionStyle>
    );
};

Description.propTypes = {
    name: PropTypes.string,
    content: PropTypes.object,
    // 是否独占一行
    inline: PropTypes.bool,
    clickCopy: PropTypes.bool,
};

export default Description;