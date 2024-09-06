import React from 'react';
import PropTypes from 'prop-types';
import {TagStyle} from "./style";

const Tag = ({text = "-"}) => {
    return (
        <TagStyle>
            {text}
        </TagStyle>
    );
};

Tag.propTypes = {
    text: PropTypes.string,
};

export default Tag;