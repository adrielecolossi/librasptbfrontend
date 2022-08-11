import React from "react";
import HeaderOne from "../../header/index.js";
import { useState, useEffect } from "react";
import { axiosClient } from "../../apiClient.js";
import {
  Title,
  Banner,
  Div,
  BannerQuestoes,
  ContainerBannerQuestoes,
  DivCategorias,
} from "./styles.js";
import ButtonJS from "../../components/Button/index.js";
import InputJS from "../../components/Input/index.js";
import Modal from "react-modal";
import { Redirect } from "react-router-dom";
import ThreeDotsWave from "../../components/ThreeDotsWave/index.js";
function FormDigitarLacuna() {
  const [isLoggedIn, setIsLoggedIn] = useState();
  const [categorias, setCategorias] = useState([]);
  const [apiResponse, setApiResponse] = useState([]);
  const [loadingEditar, setLoadingEditar] = useState(false);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [frase, setFrase] = useState("");
  const [resposta, setResposta] = useState("");
  const [categoriasNovaQuestao, setCategoriasNovaQuestao] = useState();
  const [categoriasDaQuestao, setCategoriasDaQuestao] = useState([]);
  const [id, setId] = useState();
  const token = localStorage.getItem("tokenLibrasPTB");
  let buttonEditarContent;
  
  const pesquisaQuestoes = async (id) => {
    axiosClient
      .get("/getQuestaoDigitarLacuna", {
        params: {
          token,
          id
        },
      })
      .then(function (response) {
        setApiResponse(response.data);
      });
  };
  const getCategoriasDaQuestao = async (id) => {
    axiosClient
      .get("/getCategoriasDaQuestao", {
        params: {
          token,
          id,
        },
      })
      .then(function (response) {
        let resp = response.data;
        setCategoriasDaQuestao(resp);
      });
  };
  const excluiQuestao = async (id) => {
    axiosClient
      .delete("/excluirQuestaoDigitarLacuna", {
        data: {
        token,
        id,
        }
      })
      .then((response) => {
        document.location.reload(true);
      })
      .catch((error) => {
        alert("Erro ao excluir");
        setLoadingEditar(false);
      });
  };
  const editaQuestao = async (e) => {
    e.preventDefault();
    setLoadingEditar(true);
    let vetor = [];
    setCategoriasNovaQuestao([]);
    for (let i = 0; i < categorias.length; i++) {
      if (document.getElementsByClassName("categoria")[i].checked) {
        vetor = [
          ...vetor,
          parseInt(document.getElementsByClassName("categoria")[i].value),
        ];
      }
    }
    setCategoriasNovaQuestao(vetor);
  };
  const editaQuestaoNoBanco = async (e) => {
    const token = localStorage.getItem("tokenLibrasPTB");
    axiosClient
      .put("/editarQuestaoDigitarLacuna", {
        token,
        id,
        categoria: categoriasNovaQuestao,
        frase,
        resposta,
      })
      .then(function(response){
        setLoadingEditar(false);
        setIsOpen(false);
        alert(response.data.message);
        document.location.reload(true);
      })
      .catch((error) => {
        alert("Erro ao editar");
        setLoadingEditar(false);
      });
  };
  function openModal(id) {
    let dadosDaQuestao;
    for (let i = 0; i < apiResponse.length; i++) {
      if (apiResponse[i].id === id) {
        dadosDaQuestao = apiResponse[i];
      }
    }
    getCategoriasDaQuestao(id);
    setId(dadosDaQuestao.id);
    setFrase(dadosDaQuestao.frase);
    setResposta(dadosDaQuestao.resposta);
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  useEffect(() => {
    categoriasDaQuestao.map((categoria) => {
      for (let i = 0; i < categorias.length; i++) {
        let value = parseInt(
          document.getElementsByClassName("categoria")[i].value
        );

        if (value === categoria.categoria) {
          document.getElementsByClassName("categoria")[i].checked = true;
        }
      }
    });
  }, [categoriasDaQuestao]);
  useEffect(() => {
    if (categoriasNovaQuestao !== undefined) {
      if (categoriasNovaQuestao !== [] && categoriasNovaQuestao.length !== 0) {
        editaQuestaoNoBanco();
      } else {
        setLoadingEditar(false);
      }
    }
  }, [categoriasNovaQuestao]);
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
  useEffect(() => {
    const getCategorias = async () => {
      const categoriasDoBanco = await axiosClient.get(
        "/categoria"
      );
      setCategorias(categoriasDoBanco.data);
    };
    getCategorias();
  }, []);
  if (loadingEditar === false) {
    buttonEditarContent = (
      <ButtonJS
        onClick={editaQuestao}
        padding={"2%"}
        width={"25vw"}
        widthResp={"30vw"}
        backgroundColor={"rgba(142, 202, 230, 0.5)"}
        borderRadius={"10px"}
        name={"Editar"}
      />
    );
  } else {
    buttonEditarContent = (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <ThreeDotsWave />
      </div>
    );
  }
  if (isLoggedIn === "loggedIn" || isLoggedIn === undefined) {
    return (
      <>
        <HeaderOne logged={true} />
        <Banner>
          <Title>
            <h1>Questões de Digitar Lacuna </h1>
            <h2>
              Pesquise para ver todas as questões de digitar lacunas de uma dada
              categoria
            </h2>
          </Title>
          <img
            src="https://drive.google.com/uc?id=1otAFn5cnK3ZZ49nmqway2TdqEmt8KlKt"
            alt=""
          />
        </Banner>
        <br></br>
        <br></br>
        <Banner>
          <h2>Escolha uma categoria para ver as questões &nbsp;</h2>
          <select onChange={(e) => pesquisaQuestoes(e.target.value)}>
            <option disabled selected value></option>
            {categorias.map((categoria) => {
              return (
                <option key={categoria.nome} value={categoria.id}>
                  {categoria.nome}
                </option>
              );
            })}
          </select>
        </Banner>
        <br></br>
        <br></br>
        <ContainerBannerQuestoes>
          {apiResponse.map((questoes) => {
            return (
              <>
                <BannerQuestoes>
                  <DivCategorias>
                    <p>Número: {questoes.id}</p>
                    <div>
                      <ButtonJS
                        onClick={() => openModal(questoes.id)}
                        width={"3vw"}
                        widthResp={"15vw"}
                        backgroundColor={"rgba(142, 202, 230, 0.0)"}
                        image={
                          "https://drive.google.com/uc?id=1vJSZWVWFwrXy4uCf5fZgycoIothyzVh_"
                        }
                      />
                      <ButtonJS
                        width={"3vw"}
                        onClick={() => excluiQuestao(questoes.id)}
                        widthResp={"15vw"}
                        backgroundColor={"rgba(142, 202, 230, 0.0)"}
                        image={
                          "https://drive.google.com/uc?id=1Ctuuoa2R8ALfwH8WBgta3auHYBkr4qiJ"
                        }
                      />
                    </div>
                  </DivCategorias>
                  <Div>
                    <p> Frase </p>
                    <p> Lacuna </p>
                  </Div>
                  <Div>
                    <p>{questoes.frase}</p>
                    <hr></hr>
                    <p>{questoes.resposta}</p>
                  </Div>
                </BannerQuestoes>
                <br></br>
              </>
            );
          })}
        </ContainerBannerQuestoes>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Example Modal"
          style={{
            overlay: {
              backgroundColor: "#000;",
              display: "flex",
              flexDirection: "column",
            },
            content: {
              top: "50%",
              left: "50%",
              right: "auto",
              bottom: "auto",
              marginRight: "-50%",
              backgroundColor: "#000;",
              transform: "translate(-50%, -50%)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              width: "30vw",
              overflow: "hidden",
            },
          }}
        >
          <h1>Editar questão</h1>
          <p>Número: {id}</p>
          <Div>
            <p>Categorias</p>
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
          </Div>
          <Div>
            <p> Frase</p>
            <p> Lacuna</p>
          </Div>
          <Div>
            <InputJS
              type="text"
              name="url"
              value={frase}
              style={{ marginTop: "3%", marginBottom: "5%" }}
              onChange={(v) => setFrase(v.target.value)}
            ></InputJS>
            <hr></hr>
            <InputJS
              type="text"
              name="url"
              value={resposta}
              style={{ marginTop: "3%", marginBottom: "5%" }}
              onChange={(v) => setResposta(v.target.value)}
            ></InputJS>
          </Div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "2%",
            }}
          >
            {buttonEditarContent}
            <ButtonJS
              onClick={closeModal}
              padding={"2%"}
              width={"25vw"}
              widthResp={"30vw"}
              backgroundColor={"rgba(229, 116, 116, 0.5)"}
              borderRadius={"10px"}
              name={"Cancelar"}
            />
          </div>
        </Modal>
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
export default FormDigitarLacuna;
