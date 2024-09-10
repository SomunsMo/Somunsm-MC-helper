import styled from "styled-components";

export const DescriptionStyle = styled.div`
  display: ${props => props.aline ? "block" : "inline-block"};
  min-width: 80px;
  padding: 5px 15px;
  margin: 5px;

  white-space: nowrap;

  h5 {
    display: inline-block;
    padding: 0;
    margin: 0;
  }

  & > span {
    font-size: small;
    color: grey;

    ${props => {
      if (props.clickcopy) return "cursor: pointer;";
    }}

    text-overflow: ellipsis;

    user-select: text;
    cursor: default;
  }

  & > span:hover {
    ${props => {
      if (props.clickcopy) return "text-decoration: underline grey;";
    }}
  }

`