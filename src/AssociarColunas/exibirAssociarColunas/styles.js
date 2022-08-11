import styled from "styled-components";

export const Title = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 20px 30px 20px 30px;
`;
export const Banner = styled.div`
  background-color: rgba(142, 202, 230, 0.5);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  width: 80%;
  height: 50%;
  display: flex;
  margin: auto;
  padding: 2%;
  border-radius: 3px;
  h1 {
    font-weight: 400;
    font-size: 2em;
  }
  h2 {
    font-size: 1em;
    font-weight: 200;
  }
  img {
    width: 27.5%;
  }
  @media only screen and (min-width: 600px) and (max-device-width: 800px) {
    img {
      width: 30%;
      height: 100%;
    }
  }
  @media only screen and (min-width: 300px) and (max-device-width: 600px) {
    width: 90%;
    img {
      width: 35%;
      height: 100%;
    }
  }
`;
export const ContainerBannerQuestoes = styled.div`
  display: flex;
  width: 90%;
  flex-wrap: wrap;
  margin: auto;
  justify-content: center;
`;

export const Div = styled.div`
  width: 100%;
  display: flex;
  padding: 2%;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  p {
    margin: auto;
  }
  input {
    background-color: rgba(142, 202, 230, 0.4);
    border: none;
    padding: 10px;
    width: 30%;
  }
  hr {
    -webkit-transform: rotate(180deg);
    width: 5%;
    height: 2%;
    color: black;
    align-self: center;
  }
  video {
    margin-left: -30%;
  }
  @media only screen and (min-width: 300px) and (max-device-width: 700px) {
    width: 90%;
    input{ width: 10%;}
  }
`;
export const DivCategorias = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 90%;
  padding: 1%;
  margin: 1%;
  justify-content: space-between;
  div {
    display: flex;
    align-items: center;
    button {
      padding: 0%;
      img {
        width: 50%;
      }
    }
  }
  @media only screen and (min-width: 300px) and (max-device-width: 700px) {
    div {
      width: 40%;
      button {
        img {
          width: 30%;
        }
      }
    }
  }
`;

export const BannerQuestoes = styled.div`
  background-color: rgba(33, 158, 188, 0.7);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  flex-wrap: wrap;
  width: 30%;
  margin: auto;
  height: 40%;
  display: flex;
  margin: 2%;
  padding: 2%;
  border-radius: 3px;
  h1 {
    font-weight: 400;
    font-size: 2em;
  }
  h2 {
    font-size: 1em;
    font-weight: 200;
  }
  img {
    width: 27.5%;
  }

  @media only screen and (min-width: 300px) and (max-device-width: 700px) {
    width: 70%;
  }
  @media only screen and (min-width: 600px) and (max-device-width: 800px) {
    img {
      width: 30%;
      height: 100%;
    }
  }
  @media only screen and (min-width: 450px) and (max-device-width: 600px) {
    img {
      width: 35%;
      height: 100%;
    }
  }
  @media only screen and (min-width: 300px) and (max-device-width: 450px) {
    img {
      width: 20%;
      height: 100%;
    }
  }
`;


