import React, { useState, useEffect } from "react";
import HeaderOne from "../../header/index.js";
import { Div, Title, DivSelect, DivInput, Divs } from "./styles.js";
import ButtonJS from "../../components/Button/index.js";
import InputJS from "../../components/Input/index.js";
import ThreeDotsWave from "../../components/ThreeDotsWave/index.js";
import { Redirect } from "react-router-dom";
import { axiosClient } from "../../apiClient.js";
function FormDigitarLacuna() {
  const [fraseQuestao, setFraseQuestao] = useState();
  const [palavraQuestao, setPalavraQuestao] = useState();
  const [loading, setLoading] = useState(false);
  const [categoriasQuestao, setCategoriasQuestao] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState();
  const [redirect, setRedirect] = useState(false);
  const token = localStorage.getItem("tokenLibrasPTB");
  let header;
  let buttonContent;
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
      palavraQuestao === undefined ||
      fraseQuestao === undefined || 
      palavraQuestao === "" || 
      fraseQuestao === "" 
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
    if (categoriasQuestao !== [] && categoriasQuestao !== undefined && categoriasQuestao.length!==0) {
      const criaQuestaoNoBanco = async (e) => {
        axiosClient
          .post("/questaoDigitarLacuna", {
            token,
            frase: fraseQuestao,
            resposta: palavraQuestao,
            categoria: categoriasQuestao,
          })
          .then((response) => {
            setLoading(false);
            alert("Questao criada com sucesso");
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
    let token = localStorage.getItem("tokenLibrasPTB");
    const getLogin = async () => {
      const response = await axiosClient.get("/login", { params: { token } });
      setIsLoggedIn(response.data.msg);
    };
    try {
      getLogin();
    } catch (error) {
      setIsLoggedIn("notLoggedIn");
    }
  }, []);
  useEffect(() => {
    const getCategorias = async () => {
      const categoriasDoBanco = await axiosClient.get("/categoria");
      setCategorias(categoriasDoBanco.data);
    };
    getCategorias();
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
  if (isLoggedIn === "loggedIn") {
    header = <HeaderOne logged={true}></HeaderOne>;
  } else {
    header = <HeaderOne logged={false}></HeaderOne>;
  }
  if (isLoggedIn === "loggedIn" || isLoggedIn === undefined) {
    if (redirect) {
      return <Redirect to='/home' />;
    }

    return (
      <>
        <HeaderOne logged={true}></HeaderOne>
        <Title fontSize={2.5} color={"#000000"}>
          Digitar lacuna
        </Title>
        <Title fontSize={1} color={"#7A7A7A"}>
          Modelo em que se digita uma palavra para preencher uma frase
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
              <Div>
                <label for="frase">Frase</label>
                <InputJS
                  id="inputfrase"
                  type="text"
                  name="frase"
                  color={"rgba(142, 202, 230, 0.5)"}
                  onChange={(v) => setFraseQuestao(v.target.value)}
                  value={fraseQuestao}
                />
              </Div>
              <Div>
                <label for="lacuna">Palavra que será a lacuna</label>
                <InputJS
                  id="inputfrase"
                  type="text"
                  name="frase"
                  color={"rgba(142, 202, 230, 0.5)"}
                  onChange={(v) => setPalavraQuestao(v.target.value)}
                  value={palavraQuestao}
                />
              </Div>
              <br />
              {buttonContent}
            </DivInput>
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
export default FormDigitarLacuna;
