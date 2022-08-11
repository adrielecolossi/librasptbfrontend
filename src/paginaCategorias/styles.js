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
    padding: 2%;
    width: 35%;
    @media only screen and (min-width: 300px) and (max-device-width: 720px) {
      width: 80%;
    }
  }
`;

export const Div = styled.div`
  display: flex;
  padding: 2%;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
`;

export const ContainerCategorias = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  width: 60%;
  margin: auto;
  margin-top: 2%;
  @media only screen and (min-width: 300px) and (max-device-width: 700px) {
    margin-top: 3%;
    width: 100%;
  }
`;

export const DivCategorias = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 30%;
  padding: 1%;
  margin: 1%;
  justify-content: space-between;
  background-color: rgba(142, 202, 230, 0.2);
  div {
    button {
      padding: 0%;
      img {
        width: 50%;
      }
    }
  }
  @media only screen and (min-width: 300px) and (max-device-width: 700px) {
    width: 50%;
  }
`;


