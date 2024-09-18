import styled from "styled-components";

export const AssetsStyle = styled.div`
  display: flex;
  height: 100%;

  .assetsList {
    display: flex;
    height: 100%;
    min-width: 200px;
    max-width: 300px;
    padding-right: 15px;
    margin-right: 15px;

    flex-direction: column;

    border-right: 1px solid lightgrey;

    h4 {
      margin-top: 5px;
    }

    input[type="text"] {
      flex-shrink: 0;
    }

    .ulList {
      margin: 5px 0 0;
      padding: 0;

      flex-grow: 1;
      list-style-type: none;

      li {
        padding: 0 5px;
        margin: 0;

        box-sizing: border-box;
        line-height: 36px;
        border-radius: 3px;
        white-space: nowrap;

        cursor: pointer;
      }

      li:hover {
        color: orange;
      }

    }

    .refreshAssetList {
      margin-top: 10px;
    }
  }


  .assetInfo {
    display: flex;
    min-width: 400px;

    flex-direction: column;
    flex-grow: 1;
    flex-shrink: 0;

    .assetOverview {
      position: relative;
      max-width: 600px;
      min-height: 230px;

      border: 1px solid whitesmoke;
      border-radius: 5px;

      //overflow: hidden;

      .assetSaveAs {
        position: absolute;
        right: 20px;
        bottom: 10px;
      }
    }

    .assetBrowseArea {
      display: flex;
      max-width: 100%;
      margin-top: 8px;

      flex-grow: 1;

      justify-content: center;
      align-items: center;

      color: darkgrey;
      background-color: whitesmoke;

      border-radius: 5px;

      overflow: hidden;
    }
  }
`