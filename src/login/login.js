import React, { useState, useEffect } from "react";
import { axiosClient } from "../apiClient.js";
import HeaderOne from "../header/index.js";
import { BackBanner } from "./styles";
import { LoginForm } from "./styles";
import {Redirect} from 'react-router-dom'
let token = "";
function Login() {
  let [email, setEmail] = useState("");
  let [senha, setSenha] = useState("");
  const [redirect, setRedirect] = useState(false);
  let header;
  const [isLoggedIn, setIsLoggedIn] = useState();
  const enviaDados = async (e) => {
    e.preventDefault();
    axiosClient
      .post("/login", {
        email: email,
        senha: senha,
      })
      .then(
        (response) => {
          token = response.data.token;
          let emailLogado = response.data.email;
          localStorage.setItem("tokenLibrasPTB", token);
          localStorage.setItem("user", emailLogado);
          alert("Autenticado");
          setRedirect(true)
        },
        (error) => {
          alert("Não autenticado, há erros na senha ou no email");
        }
      );
  };
  useEffect(() => {
    let token = localStorage.getItem("tokenLibrasPTB");
    const getLogin = async () => {
      const response = await axiosClient.get("/login", {
        params: { token },
      });
      setIsLoggedIn(response.data.msg);
    };
    getLogin();
  }, []);
  if (isLoggedIn === "loggedIn") {
    header = <HeaderOne logged={true}></HeaderOne>;
  } else {
    header = <HeaderOne logged={false}></HeaderOne>;
  }

  if (redirect) {
    return <Redirect to='/home' />;
  }



  return (
    <>
      {header}
      <BackBanner>
        <LoginForm>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="E-mail"
            onChange={(v) => setEmail(v.target.value)}
            value={email}
          />

          <input
            type="password"
            id="senha"
            name="senha"
            placeholder="Senha"
            onChange={(v) => setSenha(v.target.value)}
            value={senha}
          />
          <button
            onClick={enviaDados}
            value="Enviar"
            className="forms-button"
            id="buttonLogin"
          >
            Logar{" "}
          </button>
        </LoginForm>

        <img src="https://drive.google.com/uc?id=1JJYSNQ5xjSx8QYRRDDd7OtoiN1W7_9yS" alt="" />
      </BackBanner>
    </>
  );
}

export default Login;
