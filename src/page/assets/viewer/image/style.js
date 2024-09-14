import styled from "styled-components";

export const ImageViewerStyle = styled.div`
  position: relative;
  display: flex;
  height: 100%;

  flex-grow: 1;
  align-items: center;
  justify-content: center;

  overflow: hidden;

  & > img {
    position: absolute;
    transition-property: width, height, transform;
    transition-duration: 350ms;
  }

  .imgControlPanel {
    display: flex;
    position: absolute;
    left: 10px;
    top: 10px;
    z-index: 10;
    
    flex-direction: column;
  }

  & > span {
    position: absolute;
    right: 10px;
    bottom: 10px;
    padding: 1px 5px;
    line-height: 22px;

    font-size: smaller;
    text-align: center;
    color: white;

    background-color: rgba(0, 0, 0, 0.3);

    border-radius: 5px;
  }

`;