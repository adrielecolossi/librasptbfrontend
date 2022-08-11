import React from "react";
import { Header } from "./styles";

import { Link } from "react-router-dom";
import ButtonJS from "../components/Button";


function HeaderOne(props) {

function removeStorage(){
  localStorage.removeItem('tokenLibrasPTB');
  localStorage.removeItem('user');
  window.location.href= "http://localhost:3000/login"
}
  if (props.logged === true) {
    return (
      <>
        <Header>
          <Link to="/home">Home</Link>
          <ButtonJS 
          onClick={removeStorage}
          padding={"0%"}
          name={"Logout"}
          color={"white"}
          backgroundColor={"#00537a"}
          fontSize={"1.1em"}/>
        </Header>
      </>
    );
  } else {
    return (
      <>
        <Header>
          <Link to="/login">Login</Link>
        </Header>
      </>
    );
  }
}

export default HeaderOne;
