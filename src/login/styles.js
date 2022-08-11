import styled from "styled-components";

export const LoginForm = styled.div`
  display: flex;
  flex-direction: column;
  width: 45%;
  align-content: space-between;
  button {
    border: none;
    padding: 7%;
    margin: auto;
    border-radius: 5px;
    background-color: #219ebc;
    color: white;
    width: 100%;
    margin: 30px 0px 30px 0px;
    font-size: 1em;
    &:hover{
      cursor: pointer;
      background-color: #147F99;
    }
  }
`;

export const BackBanner = styled.div`
  background-color: rgba(142, 202, 230, 0.5);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  width: 60%;
  height: 30%;
  display: flex;
  justify-content: space-between;

  margin: auto;
  padding: 5%;
  border-radius: 3px;
  img {
    width: 43%;
    height: 40%;
  }
  input {
    border: none;
    padding: 5%;
    margin: 20px 0px 20px 0px;
    &:hover{
        cursor: pointer;
        background-color: lightgray;
    }
  }

  
`;
