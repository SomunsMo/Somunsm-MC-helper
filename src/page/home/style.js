import styled from "styled-components";

export const HomeStyle = styled.div`
  display: flex;
  height: 100vh;
  margin: 0;
  padding: 0;

  flex-direction: column;

  overflow: hidden;

  .titleBar {
    display: flex;
    height: 40px;
    padding: 10px 0 10px 10px;
    margin: 0;

    flex-shrink: 0;

    align-items: center;

    box-sizing: border-box;
    overflow: hidden;

    // 为了让标题栏能拖动窗口位置
    -webkit-app-region: drag;

    .softTitle {
      margin-left: 6px;
      color: dodgerblue;
    }

    .ctrlBtnArea {
      display: flex;
      height: 40px;
      margin-left: auto;
      margin-right: 0;

      align-items: center;

      // 确保可以正常点击
      -webkit-app-region: no-drag;

      .gameVer {
        margin-right: 10px;
        color: grey;
        font-size: small;
      }


      button {
        width: 40px;
        height: 100%;
        margin: 0;

        color: dimgrey;
        background: none;
        font-size: 30px;
        font-weight: 1;

        border: none;
        border-radius: unset;

        cursor: pointer;
      }

      button:hover {
        color: black;
        background-color: whitesmoke;
      }

      .closeWindow:hover {
        fill: white;
        color: white;
        background-color: #c42b1c;
      }

      .closeWindow::before {
        transform: translate(-50%, -50%) rotate(45deg); /* 旋转45度 */
      }

      .closeWindow::after {
        transform: translate(-50%, -50%) rotate(-45deg); /* 旋转-45度 */
      }

    }
  }

  .mainContentArea {
    display: flex;
    height: calc(100% - 40px);
  }

  .homeNavigation {
    height: 100%;
  }

  .content {
    height: 100%;
    padding: 10px;

    flex-grow: 1;

    box-sizing: border-box;

    border-top: 1px solid #eaeaea;
    border-left: 1px solid #eaeaea;

    border-radius: 5px 0 0 0;

    overflow: hidden;

  }

`