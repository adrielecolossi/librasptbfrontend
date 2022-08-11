import React from "react";
import HeaderOne from "../../header/index.js";
import { Title, DivSelect, DivInput, Divs, Div } from "./styles.js";
import ButtonJS from "../../components/Button/index.js";
import InputJS from "../../components/Input/index.js";
import { useState, useEffect } from "react";
import ThreeDotsWave from "../../components/ThreeDotsWave/index.js";
import { Redirect } from "react-router-dom";
import { axiosClient } from "../../apiClient.js";
function FormAlternativaVideo() {
  const [categoriasQuestao, setCategoriasQuestao] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [imagemQuestao, setImagemQuestao] = useState();
  const [alternativaCerta, setAlternativaCerta] = useState();
  const [alternativaErrada1, setAlternativaErrada1] = useState();
  const [alternativaErrada2, setAlternativaErrada2] = useState();
  const [alternativaErrada3, setAlternativaErrada3] = useState();
  const [alternativaErrada4, setAlternativaErrada4] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState();
  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);
  let buttonContent;
  let vetor;
  let token = localStorage.getItem("tokenLibrasPTB");
  let header = <HeaderOne logged={true}></HeaderOne>;
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
      imagemQuestao === undefined ||
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
      setLoading(true)
      setCategoriasQuestao([]);
      let vetor=[];
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
        const fd = new FormData();
        fd.append("file", imagemQuestao);
        const response = await axiosClient.post("/imagem", fd);
        const midia = "https://drive.google.com/uc?id=" + response.data;
        axiosClient
          .post("/questaoMarcarMidia", {
            token,
            midia,
            categoria: categoriasQuestao,
            alternativaCerta,
            alternativaErrada1,
            alternativaErrada2,
            alternativaErrada3,
            alternativaErrada4,
          })
          .then((response) => {
            setLoading(false);
            alert(response.data.msg)
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
        width={"25vw"}
        backgroundColor={"#219EBC"}
        color={"#FFFF"}
        borderRadius={"5px"}
        name={"Criar Questão"}
        widthResp={"40%"}
      />
    );
  } else {
    buttonContent = <ThreeDotsWave />;
  }
  if (isLoggedIn === "loggedIn" || isLoggedIn === undefined) {

    if (redirect) {
      return <Redirect to='/home' />;
    }

    return (
      <>
        {header}
        <Title fontSize={2.5} color={"#000000"}>
          Marcar Alternativa Correta
        </Title>
        <Title fontSize={1} color={"#7A7A7A"}>
          Modelo em que se marca uma alternativa para palavra do(a) vídeo/imagem
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
              <label for="frase">Vídeo/Imagem</label>
              <InputJS
                name="frase"
                type="file"
                color={"#8ECAE6"}
                onChange={(v) => setImagemQuestao(v.target.files[0])}
              ></InputJS>
            </Div>
            <Div>
              <label for="correct">Alternativa Correta</label>
              <InputJS
                id="inputfrase"
                type="text"
                name="correct"
                color={"rgba(144, 230, 142, 0.5)"}
                onChange={(v) => setAlternativaCerta(v.target.value)}
                value={alternativaCerta}
              />
            </Div>
            <br />
            <Div>
              <label for="wrong1">Alternativa Errada</label>
              <InputJS
                id="inputfrase"
                type="text"
                name="wrong1"
                color={"rgba(252, 65, 65, 0.5)"}
                onChange={(v) => setAlternativaErrada1(v.target.value)}
                value={alternativaErrada1}
              />
            </Div>
            <br />
            <Div>
              <label for="wrong2">Alternativa Errada</label>
              <InputJS
                id="inputfrase"
                type="text"
                name="wrong2"
                color={"rgba(252, 65, 65, 0.5)"}
                onChange={(v) => setAlternativaErrada2(v.target.value)}
                value={alternativaErrada2}
              />
            </Div>
            <br />
            <Div>
              <label for="wrong3">Alternativa Errada</label>
              <InputJS
                id="inputfrase"
                type="text"
                name="wrong3"
                color={"rgba(252, 65, 65, 0.5)"}
                onChange={(v) => setAlternativaErrada3(v.target.value)}
                value={alternativaErrada3}
              />
            </Div>
            <br />
            <Div>
              <label for="wrong4">Alternativa Errada</label>
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
        {header}
        <Redirect to="/login" />
      </div>
    );
  }
}
export default FormAlternativaVideo;
