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

    image-rendering: pixelated;
  }

  .resetImg {
    position: absolute;
    left: 10px;
    top: 10px;
    z-index: 10;
  }

  & > span {
    position: absolute;
    right: 10px;
    bottom: 10px;
    padding: 1px 5px;

    text-align: center;
    color: white;

    background-color: rgba(0, 0, 0, 0.3);

    border-radius: 5px;
  }

`;