import styled from "styled-components";

export const SoundViewerStyle = styled.div`
  min-width: 360px;
  max-width: 600px;

  font-size: unset;
  letter-spacing: normal;

  .currentTime {
    margin-bottom: 2px;
  }

  .progressBar {
    height: 4px;

    background-color: grey;

    border-radius: 10px;

    overflow: hidden;
    cursor: pointer;

    .currentProgress {
      width: 100%;
      height: 100%;
      background-color: darkorange;

      transform-origin: left;

      transition-property: width;
      transition-duration: 350ms;

      pointer-events: none;
    }
  }

  button {
    margin-top: 8px;
  }

`