import styled from "styled-components";

export const HomeNavigationStyle = styled.div`
  width: ${props => props.navWidth}px;
  height: 100%;

  //background-color: white;

  transition-property: width;
  transition-duration: 350ms;

  .resizeBtn {
    width: 100%;
    height: 40px;
    margin: 0;

    color: black;
    font-size: 20px;
    background: none;

    border: none;
    cursor: pointer;
  }


  nav {

    & > a {
      display: flex;
      height: 26px;
      padding: 5px 15px;
      margin: 4px 5px 0;

      align-items: center;

      color: #1d1d1d;
      font-size: 16px;
      //font-weight: bold;
      letter-spacing: 1px;
      text-decoration: none;

      border-radius: 6px;
      cursor: pointer;
      overflow: hidden;


      white-space: nowrap;

      & > img {
        width: 18px;
        height: auto;
        margin-right: 6px;
      }

      & > .navTitle {
        opacity: ${props => props.navTileOpacity ? 0 : 1};
        transition-property: opacity;
        transition-duration: 300ms;
      }

    }

    & > a:first-child {
      margin-top: 0;
    }

    & > a:hover {
      background-color: ghostwhite;
    }

    & > a:active {
      background-color: whitesmoke;
    }
  }



`