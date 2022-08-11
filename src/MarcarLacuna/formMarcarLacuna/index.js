import React, { useEffect, useState } from "react";
import HeaderOne from "../../header/index.js";
import { Div, Title, DivSelect, DivInput, Divs } from "./styles.js";
import ButtonJS from "../../components/Button/index.js";
import InputJS from "../../components/Input/index.js";
import { Redirect } from "react-router-dom";
import ThreeDotsWave from "../../components/ThreeDotsWave/index.js";
import { axiosClient } from "../../apiClient.js";
function FormMarcarLacuna() {
  const [categorias, setCategorias] = useState([]);
  const [categoriasQuestao, setCategoriasQuestao] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fraseQuestao, setFraseQuestao] = useState();
  const [alternativaCerta, setAlternativaCerta] = useState();
  const [alternativaErrada1, setAlternativaErrada1] = useState();
  const [alternativaErrada2, setAlternativaErrada2] = useState();
  const [alternativaErrada3, setAlternativaErrada3] = useState();
  const [alternativaErrada4, setAlternativaErrada4] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState();
  const [redirect, setRedirect] = useState(false);
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
     haCategoria==false||
      fraseQuestao === undefined ||
      alternativaCerta === undefined ||
      alternativaErrada1 === undefined ||
      alternativaErrada2 === undefined ||
      alternativaErrada3 === undefined ||
      alternativaErrada4 === undefined ||
      fraseQuestao=== "" ||
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
    const token = localStorage.getItem("tokenLibrasPTB");
    if (
      categoriasQuestao !== [] &&
      categoriasQuestao !== undefined &&
      categoriasQuestao.length !== 0
    ) {
      const criaQuestaoNoBanco = async (e) => {
        axiosClient
          .post("/questaoMarcarLacuna", {
            token,
            frase: fraseQuestao,
            categoria: categoriasQuestao,
            opcao1: alternativaCerta,
            opcao2: alternativaErrada1,
            opcao3: alternativaErrada2,
            opcao4: alternativaErrada3,
            opcao5: alternativaErrada4,
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
          Marcar Lacuna com Alternativa
        </Title>
        <Title fontSize={1} color={"#7A7A7A"}>
          Modelo em que se marca uma alternativa para preencher frase
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
            <br />
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
export default FormMarcarLacuna;
