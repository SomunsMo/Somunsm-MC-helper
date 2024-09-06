import React from 'react';
import {useLocation} from "react-router";
import {TextViewerStyle} from "./style";

const TextViewer = () => {


    const location = useLocation();
    const {state} = location;

    return (
        <TextViewerStyle>
            <textarea disabled={true}>
                {state.text}
            </textarea>
        </TextViewerStyle>
    );
};

export default TextViewer;