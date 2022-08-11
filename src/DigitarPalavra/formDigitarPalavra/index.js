import React, { useState, useEffect } from "react";
import { Title, DivInput, DivSelect, Divs, Div } from "./styles";
import HeaderOne from "../../header/index.js";
import ButtonJS from "../../components/Button/index.js";
import InputJS from "../../components/Input/index.js";
import ThreeDotsWave from "../../components/ThreeDotsWave/index.js";
import { Redirect } from "react-router-dom";
import { axiosClient } from "../../apiClient.js";
const token = localStorage.getItem("tokenLibrasPTB");
function FormDigitarPalavra() {
  const [categorias, setCategorias] = useState([]);
  const [imagemQuestao, setImagemQuestao] = useState();
  const [palavraQuestao, setPalavraQuestao] = useState();
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState();
  let [categoriasQuestao, setCategoriasQuestao] = useState([]);
  const [redirect, setRedirect] = useState(false);
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
      palavraQuestao === undefined ||
      palavraQuestao === "" ||
      imagemQuestao === undefined ||
      haCategoria === false
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
        const fd = new FormData();
        fd.append("file", imagemQuestao);
        const response = await axiosClient.post("/imagem", fd);
        const midia = "https://drive.google.com/uc?id=" + response.data;
        axiosClient
          .post("/questaoDigitarMidia", {
            token,
            resposta: palavraQuestao,
            midia,
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
        widthResp={"50vw"}
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
        <HeaderOne logged={true}></HeaderOne>
        <Title fontSize={2.5} color={"#000000"}>
          Digitar palavra da imagem/vídeo
        </Title>
        <Title fontSize={1} color={"#7A7A7A"}>
          Modelo em que se digita palavra do vídeo/imagem
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
              <label for="inputimg">Imagem/GIF: </label>
              <InputJS
                type="file"
                name="url"
                onChange={(v) => setImagemQuestao(v.target.files[0])}
              />
            </Div>
            <Div>
              <label for="inputpalavra">Palavra: </label>
              <InputJS
                id="inputpalavra"
                type="text"
                value={palavraQuestao}
                name="palavraQuestao"
                onChange={(v) => setPalavraQuestao(v.target.value)}
              />
            </Div>
            <Div>{buttonContent}</Div>
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
export default FormDigitarPalavra;
