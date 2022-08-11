import React, { useEffect, useState } from "react";
import HeaderOne from "../../header/index.js";
import { Div, Title, DivSelect, DivInput, Divs } from "./styles.js";
import ButtonJS from "../../components/Button/index.js";
import InputJS from "../../components/Input/index.js";
import ThreeDotsWave from "../../components/ThreeDotsWave/index.js";
import { Redirect } from "react-router-dom";

import { axiosClient } from "../../apiClient.js";
function FormAlternativaFrase() {
  const [loading, setLoading] = useState(false);
  const [alternativaCerta, setAlternativaCerta] = useState();
  const [alternativaErrada1, setAlternativaErrada1] = useState();
  const [alternativaErrada2, setAlternativaErrada2] = useState();
  const [alternativaErrada3, setAlternativaErrada3] = useState();
  const [alternativaErrada4, setAlternativaErrada4] = useState();
  const [categoriasQuestao, setCategoriasQuestao] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState();
  const [redirect, setRedirect] = useState(false);
  let buttonContent;
  let token = localStorage.getItem("tokenLibrasPTB");
  const criaQuestao = async (e) => {
    e.preventDefault();
    let haCategoria = false;
    for (let i = 0; i < categorias.length; i++) {
      if (document.getElementsByClassName("categoria")[i].checked) {
        haCategoria = true;
      }
    }
    if (
     haCategoria === false ||
      alternativaCerta === undefined ||
      alternativaErrada1 === undefined ||
      alternativaErrada2 === undefined ||
      alternativaErrada3 === undefined ||
      alternativaErrada4 === undefined ||
      alternativaCerta === "" ||
      alternativaErrada1 === "" ||
      alternativaErrada2 === "" ||
      alternativaErrada3 === "" ||
      alternativaErrada4 === "" 
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
      const criaQuestaoNoBanco = () => {
        axiosClient
          .post("/questaoFraseCorreta", {
            token,
            categoria: categoriasQuestao,
            alternativaCerta,
            alternativaErrada1,
            alternativaErrada2,
            alternativaErrada3,
            alternativaErrada4,
          })
          .then((response) => {
            alert(response.data.message);
            setLoading(false);
            setRedirect(true);
          })
          .catch((error) => {
            alert(error);
          });
      };
      criaQuestaoNoBanco();
    }
  }, [categoriasQuestao]);
  useEffect(() => {
    const getCategorias = async () => {
      const categoriasDoBanco = await axiosClient.get(
        "/categoria"
      );
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
    if (redirect) {
      return <Redirect to='/home' />;
    }

    return (
      <>
        <HeaderOne logged={true}></HeaderOne>
        <Title fontSize={2.5} color={"#000000"}>
          Alternativa Correta (frase)
        </Title>
        <Title fontSize={1} color={"#7A7A7A"}>
          Modelo em que se marca uma alternativa correta
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
            <Div>
              <label for="correct">Frase Correta</label>
              <InputJS
                id="inputfrase"
                type="text"
                name="correct"
                color={"rgba(144, 230, 142, 0.5)"}
                onChange={(v) => setAlternativaCerta(v.target.value)}
                value={alternativaCerta}
              />
            </Div>
            <Div>
              <label for="wrong1">Frase Errada</label>
              <InputJS
                id="inputfrase"
                type="text"
                name="wrong1"
                color={"rgba(252, 65, 65, 0.5)"}
                onChange={(v) => setAlternativaErrada1(v.target.value)}
                value={alternativaErrada1}
              />
            </Div>
            <Div>
              <label for="wrong2">Frase Errada</label>
              <InputJS
                id="inputfrase"
                type="text"
                name="wrong2"
                color={"rgba(252, 65, 65, 0.5)"}
                onChange={(v) => setAlternativaErrada2(v.target.value)}
                value={alternativaErrada2}
              />
            </Div>
            <Div>
              <label for="wrong3">Frase Errada</label>
              <InputJS
                id="inputfrase"
                type="text"
                name="wrong3"
                color={"rgba(252, 65, 65, 0.5)"}
                onChange={(v) => setAlternativaErrada3(v.target.value)}
                value={alternativaErrada3}
              />
            </Div>
            <Div>
              <label for="wrong4">Frase Errada</label>
              <InputJS
                id="inputfrase"
                type="text"
                name="wrong4"
                color={"rgba(252, 65, 65, 0.5)"}
                onChange={(v) => setAlternativaErrada4(v.target.value)}
                value={alternativaErrada4}
              />
            </Div>
            <br />
            {buttonContent}
            <br />
          </form>
        </Divs>
      </>
    );
  } else {
    return (
      <div>
        <Redirect to="/login" />
      </div>
    );
  }
}
export default FormAlternativaFrase;
