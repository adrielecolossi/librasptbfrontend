import React from "react";
import HeaderOne from "../../header/index.js";
import { useState, useEffect } from "react";
import { Div, Title, DivInput, DivSelect, Divs } from "./styles.js";
import ButtonJS from "../../components/Button/index.js";
import InputJS from "../../components/Input/index.js";
import { Redirect } from "react-router-dom";
import ThreeDotsWave from "../../components/ThreeDotsWave/index.js";
import { axiosClient } from "../../apiClient.js";
function FormAssociarColunas() {
  const [imagem1, setImagem1] = useState();
  const [imagem2, setImagem2] = useState();
  const [imagem3, setImagem3] = useState();
  const [imagem4, setImagem4] = useState();
  const [imagem5, setImagem5] = useState();
  const [alternativa1, setAlternativa1] = useState();
  const [alternativa2, setAlternativa2] = useState();
  const [alternativa3, setAlternativa3] = useState();
  const [alternativa4, setAlternativa4] = useState();
  const [alternativa5, setAlternativa5] = useState();
  const [categoriasQuestao, setCategoriasQuestao] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState();
  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);
  let buttonContent;
  let header;
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
      imagem1 === undefined ||
      imagem2 === undefined ||
      imagem3 === undefined ||
      imagem4 === undefined ||
      imagem5 === undefined ||
      alternativa1 === undefined ||
      alternativa2 === undefined ||
      alternativa3 === undefined ||
      alternativa4 === undefined ||
      alternativa5 === undefined ||
      alternativa1 === "" ||
      alternativa2 === "" ||
      alternativa3 === "" ||
      alternativa4 === "" ||
      alternativa5 === "" 
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
        const fd1 = new FormData();
        fd1.append("file", imagem1);
        const response1 = await axiosClient.post("/imagem", fd1);
        const midia1 = "https://drive.google.com/uc?id=" + response1.data;
        const fd2 = new FormData();
        fd2.append("file", imagem2);
        const response2 = await axiosClient.post("/imagem", fd2);
        const midia2 = "https://drive.google.com/uc?id=" + response2.data;
        const fd3 = new FormData();
        fd3.append("file", imagem3);
        const response3 = await axiosClient.post("/imagem", fd3);
        const midia3 = "https://drive.google.com/uc?id=" + response3.data;
        const fd4 = new FormData();
        fd4.append("file", imagem4);
        const response4 = await axiosClient.post("/imagem", fd4);
        const midia4 = "https://drive.google.com/uc?id=" + response4.data;
        const fd5 = new FormData();
        fd5.append("file", imagem5);
        const response5 = await axiosClient.post("/imagem", fd5);
        const midia5 = "https://drive.google.com/uc?id=" + response5.data;
        const token = localStorage.getItem("tokenLibrasPTB");
        axiosClient
          .post("/questaoAssociarColunas", {
            token,
            categoria: categoriasQuestao,
            opcao1: midia1,
            opcao2: alternativa1,
            opcao3: midia2,
            opcao4: alternativa2,
            opcao5: midia3,
            opcao6: alternativa3,
            opcao7: midia4,
            opcao8: alternativa4,
            opcao9: midia5,
            opcao10: alternativa5,
          })
          .then((response) => {
            alert("Questao criada com sucesso");
            setLoading(false);
            setRedirect(true);
          })
          .catch((error) => {
            alert("Erro ao cadastrar uma questão");
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
        <HeaderOne logged={true}></HeaderOne>
        <Title fontSize={2.5} color={"#000000"}>
          Associar Colunas
        </Title>
        <Title fontSize={1} color={"#7A7A7A"}>
          Modelo em que se associa duas respostas de colunas
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
              <p> Imagem/Gif/Video </p>
              <p> Palavras </p>
            </Div>
            <Div>
              <InputJS
                type="file"
                name="url"
                onChange={(v) => setImagem1(v.target.files[0])}
              ></InputJS>
              <hr></hr>
              <InputJS
                type="text"
                value={alternativa1}
                name="alternativa1"
                onChange={(v) => setAlternativa1(v.target.value)}
              ></InputJS>
            </Div>
            <Div>
              <InputJS
                type="file"
                onChange={(v) => setImagem2(v.target.files[0])}
              ></InputJS>
              <hr></hr>
              <InputJS
                type="text"
                value={alternativa2}
                name="alternativa2"
                onChange={(v) => setAlternativa2(v.target.value)}
              ></InputJS>
            </Div>
            <Div>
              <InputJS
                type="file"
                onChange={(v) => setImagem3(v.target.files[0])}
              ></InputJS>
              <hr></hr>
              <InputJS
                type="text"
                value={alternativa3}
                name="alternativa3"
                onChange={(v) => setAlternativa3(v.target.value)}
              ></InputJS>
            </Div>
            <Div>
              <InputJS
                type="file"
                onChange={(v) => setImagem4(v.target.files[0])}
              ></InputJS>
              <hr></hr>
              <InputJS
                type="text"
                value={alternativa4}
                name="alternativa4"
                onChange={(v) => setAlternativa4(v.target.value)}
              ></InputJS>
            </Div>
            <Div>
              <InputJS
                type="file"
                onChange={(v) => setImagem5(v.target.files[0])}
              ></InputJS>
              <hr></hr>
              <InputJS
                type="text"
                value={alternativa5}
                name="alternativa5"
                onChange={(v) => setAlternativa5(v.target.value)}
              ></InputJS>
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
export default FormAssociarColunas;
