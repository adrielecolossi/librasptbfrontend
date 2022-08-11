import React, { useState, useEffect } from "react";
import { Title, DivInput, DivSelect, Div, Divs } from "./styles";
import HeaderOne from "../../header/index.js";
import ButtonJS from "../../components/Button/index.js";
import InputJS from "../../components/Input/index.js";
import ThreeDotsWave from "../../components/ThreeDotsWave/index.js";
import { Redirect } from "react-router-dom";
import { axiosClient } from "../../apiClient.js";
function FormOrdenarFrase() {
  const [categoriasQuestao, setCategoriasQuestao] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [fraseQuestao, setFraseQuestao] = useState();
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState();
  const [redirect, setRedirect] = useState(false);
  let header = <HeaderOne logged={true}></HeaderOne>;
  let buttonContent;
  let token = localStorage.getItem("tokenLibrasPTB");
  const criaQuestao = async (e) => {
    let haCategoria = false;
    for (let i = 0; i < categorias.length; i++) {
      if (document.getElementsByClassName("categoria")[i].checked) {
        haCategoria = true;
      }
    }
    e.preventDefault();
    if (
      haCategoria === false ||
      fraseQuestao === undefined || fraseQuestao===""
    ) {
      alert("Dados incompletos");

    } else {
      setLoading(true);
      let vetor = [];
      setCategoriasQuestao([]);
      for (let i = 0; i < categorias.length; i++) {
        if (document.getElementsByClassName("categoria")[i].checked) {
          vetor = [
            ...vetor,
            parseInt(document.getElementsByClassName("categoria")[i].value),
          ];
        }
      }
      setCategoriasQuestao(vetor);
    }
  };
  useEffect(() => {
    if (
      categoriasQuestao !== [] &&
      categoriasQuestao !== undefined &&
      categoriasQuestao.length !== 0
    ) {
      const criaQuestaoNoBanco = async (e) => {
        axiosClient
          .post("/questaoOrdenarFrase", {
            token,
            resposta: fraseQuestao,
            categoria: categoriasQuestao,
          })
          .then((response) => {
            setLoading(false);
            alert("Questao criada com sucesso");
            setRedirect(true);
          })
          .catch((error) => {
            alert("Erro ao criar questão");
            setLoading(false);
          });
      };
      criaQuestaoNoBanco();
    }
  }, [categoriasQuestao]);
  useEffect(() => {
    const getCategorias = async () => {
      const categoriasDoBanco = await axiosClient.get("/categoria");
      setCategorias(categoriasDoBanco.data);
    };
    getCategorias();
  }, []);
  useEffect(() => {
    let token = localStorage.getItem("tokenLibrasPTB");
    const getLogin = async () => {
      const response = await axiosClient.get("/login", {
        params: { token },
      });
      setIsLoggedIn(response.data.msg);
    };
    try {
      getLogin();
    } catch (error) {
      setIsLoggedIn("notLoggedIn");
    }
  }, []);
  if (loading === false) {
    buttonContent = (
      <ButtonJS
        onClick={criaQuestao}
        padding={"3%"}
        width={"30vw"}
        widthResp={"40%"}
        backgroundColor={"#219EBC"}
        color={"#FFFF"}
        borderRadius={"5px"}
        name={"Criar Questão"}
      />
    );
  } else {
    buttonContent = (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <ThreeDotsWave />
      </div>
    );
  }
  if (isLoggedIn === "loggedIn" || isLoggedIn === undefined) {
    if (redirect) {
      return <Redirect to='/home' />;
    }

    return (
      <>
        {header}
        <Title fontSize={2.5} color={"#000000"}>
          Ordenar frase
        </Title>
        <Title fontSize={1} color={"#7A7A7A"}>
          Modelo em que se ordena palavras de uma frase
        </Title>
        <br />
        <Divs>
          <form enctype="multipart/form-data" method="POST">
            <DivInput>
              <p>Categoria(s):</p>
              <DivSelect>
                  {categorias.map((categoria) => {
                    return (
                      <div>
                        <input
                          class="categoria"
                          key={categoria.nome}
                          value={categoria.id}
                          type="checkbox"
                        /> 
                        <label for="categoria">{categoria.nome}</label>
                      </div>
                    );
                  })}
              </DivSelect>
            </DivInput>
            <br />
            <Div>
              <label for="inputfrase">Frase </label>
              <InputJS
                id="inputfrase"
                type="text"
                name="fraseQuestao"
                color="rgba(142, 202, 230, 0.5)"
                onChange={(v) => setFraseQuestao(v.target.value)}
                value={fraseQuestao}
              />
            </Div>
            {buttonContent}
            <br />
          </form>
        </Divs>
      </>
    );
  } else {
    return (
      <div>
        {header}
        <Redirect to="/login" />
      </div>
    );
  }
}

export default FormOrdenarFrase;
