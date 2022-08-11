import styled from "styled-components";
export const Title = styled.h1`
  font-size: ${(props) => `${props.fontSize}em`};
  color: ${(props) => props.color};
  font-weight: 400;
  margin-top: 1%;
  margin-left: 3%;
`;

export const Divs = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: flex-start;
  form {
    box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.25);
    background-color: rgba(142, 202, 230, 0.2);
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50%;
    @media only screen and (min-width: 300px) and (max-device-width: 720px) {
      width: 90%;
    }
  }
`;
export const Div = styled.div`
  width: 70%;
  display: flex;
  padding: 1%;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  p {
    margin: auto;
  }
  @media only screen and (min-width: 300px) and (max-device-width: 900px) {
    width: 90%;
  }
`;

export const DivInput = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  padding: 1%;
`;

export const DivSelect = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 70%;
  div {
    padding: 2%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  input {
    cursor: pointer;
  }
`;
