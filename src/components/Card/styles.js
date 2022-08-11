import styled from "styled-components";
export const Div = styled.div`
  width: 45%;
  a {
    text-decoration: none;
  }
  @media only screen and (min-width: 300px) and (max-device-width: 900px) {
    width: 100%;
  }
`;

export const DivConfig = styled.div`
  width: 50%;
  margin: auto;
  margin-top: 2%;
  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }
  a {
    width: 100%;
    text-decoration: none;
  }
  @media only screen and (min-width: 300px) and (max-device-width: 900px) {
    width: 100%;
    margin: auto;
  }
`;

export const DivIcons = styled.div`
  display: flex;
  justify-content: flex-end;
  align-content: flex-end;
  a {
    align-self: center;
    width: 10%;
    margin-right: 5%;
    img {
      width: 100%;
    }
    &:hover {
      opacity: 0.8;
      cursor: pointer;
    }
  }
  @media only screen and (min-width: 715px) and (max-device-width: 800px) {
    a {
      width: 15%;
    }
  }
  @media only screen and (min-width: 520px) and (max-device-width: 715px) {
    a {
      width: 15%;
    }
  }
  @media only screen and (min-width: 450px) and (max-device-width: 519px) {
    a {
      width: 15%;
    }
  }
  @media only screen and (min-width: 350px) and (max-device-width: 450px) {
    a {
      width: 12.5%;
    }
  }
  @media only screen and (max-device-width: 350px) {
    a {
      width: 12.5%;
    }
  }
`;
export const DivIn = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.2em;
  justify-content: space-around;
  align-items: flex-start;
  @media only screen and (max-device-width: 1500px) {
    font-size: 1.2em;
  }
  @media only screen and (min-width: 900px) and (max-device-width: 1000px) {
    font-size: 0.8em;
  }
  @media only screen and (min-width: 800px) and (max-device-width: 900px) {
    font-size: 1em;
  }
  @media only screen and (min-width: 715px) and (max-device-width: 800px) {
    font-size: 0.9em;
  }
  @media only screen and (min-width: 520px) and (max-device-width: 715px) {
    font-size: 0.8em;
  }
  @media only screen and (min-width: 450px) and (max-device-width: 519px) {
    font-size: 0.8em;
  }
  @media only screen and (min-width: 355px) and (max-device-width: 450px) {
    font-size: 0.7em;
  }
  @media only screen and (min-width: 350px) and (max-device-width: 355px) {
    font-size: 0.5em;
  }
  @media only screen and (max-device-width: 350px) {
    font-size: 0.7em;
  }
`;

export const DivCard = styled.div`
  color: black;
  display: flex;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.25);
  width: 100%;
  margin-bottom: 2%;
  img {
    width: 40%;
    border-radius: 20px 0px 0px 20px;
  }
  h3,
  h6 {
    padding: 4px 4px 4px 4px;
    margin: 0px;
    font-weight: 400;
  }
  @media only screen and (min-width: 900px) and (max-device-width: 1000px) {
    img {
      width: 30%;
      height: 100%;
    }
  }
  @media only screen and (min-width: 800px) and (max-device-width: 900px) {
    width: 70%;
    margin: auto;
    margin-top: 5%;
    img {
      width: 40%;
      height: 100%;
    }
  }
  @media only screen and (min-width: 715px) and (max-device-width: 800px) {
    width: 70%;
    margin: auto;
    margin-top: 5%;
    img {
      width: 40%;
      height: 100%;
    }
  }
  @media only screen and (min-width: 520px) and (max-device-width: 715px) {
    width: 75%;
    margin: auto;
    margin-top: 5%;
    img {
      width: 45%;
      height: 100%;
    }
  }
  @media only screen and (min-width: 450px) and (max-device-width: 519px) {
    width: 95%;
    margin: auto;
    margin-top: 2%;
  }
  @media only screen and (min-width: 350px) and (max-device-width: 450px) {
    width: 100%;
    margin: auto;
    margin-top: 5%;
    img {
      width: 45%;
      height: 100%;
    }
  }
  @media only screen and (max-device-width: 350px) {
    margin: auto;
    margin-top: 5%;
    img {
      width: 50%;
      height: 100%;
    }
  }
`;