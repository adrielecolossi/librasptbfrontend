import styled from "styled-components";

export const Input = styled.input`
  background-color: ${(props) => props.color};
  border: none;
  padding: 10px;
  margin: 2px 2px 2px 2px;
  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }
`;