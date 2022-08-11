import React from "react";
import HeaderOne from "../../header/index.js";
import { useState, useEffect } from "react";
import { axiosClient } from "../../apiClient.js";
import axios from "axios";
import { Title, Banner, Div, BannerQuestoes, ContainerBannerQuestoes, DivCategorias, } from "./styles.js";
import ButtonJS from "../../components/Button/index.js";
import InputJS from "../../components/Input/index.js";
import Modal from "react-modal";
import { Redirect } from "react-router-dom";
import ThreeDotsWave from "../../components/ThreeDotsWave/index.js";

function FormAssociarColunas() {
  const [isLoggedIn, setIsLoggedIn] = useState();
  const [apiResponse, setApiResponse] = useState([]);
  const [loadingEditar, setLoadingEditar] = useState(false);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [novaOpcao1, setNovaOpcao1] = useState();
  const [opcao2, setOpcao2] = useState();
  const [novaOpcao3, setNovaOpcao3] = useState();
  const [opcao4, setOpcao4] = useState();
  const [novaOpcao5, setNovaOpcao5] = useState();
  const [opcao6, setOpcao6] = useState();
  const [novaOpcao7, setNovaOpcao7] = useState();
  const [opcao8, setOpcao8] = useState();
  const [novaOpcao9, setNovaOpcao9] = useState();
  const [opcao10, setOpcao10] = useState();
  const [categoriasNovaQuestao, setCategoriasNovaQuestao] = useState();
  const [categoriasDaQuestao, setCategoriasDaQuestao] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [id, setId] = useState();
  function ColocaCategorias() {
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
  }
  function openModal(id) {
    let dadosDaQuestao;
    for (let i = 0; i < apiResponse.length; i++) {
      if (apiResponse[i].id === id) {
        dadosDaQuestao = apiResponse[i];
      }
    }
    getCategoriasDaQuestao(id);
    setId(dadosDaQuestao.id);
    setOpcao2(dadosDaQuestao.opcao2);
    setOpcao4(dadosDaQuestao.opcao4);
    setOpcao6(dadosDaQuestao.opcao6);
    setOpcao8(dadosDaQuestao.opcao8);
    setOpcao10(dadosDaQuestao.opcao10);
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  let vetor = [];
  let token = localStorage.getItem("tokenLibrasPTB");
  let buttonEditarContent;
  const pesquisaQuestoes = async (id) => {
    axiosClient
      .get("/getQuestaoAssociarColunas", {
        params: {
          id,
          token,
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
      .delete("/excluirQuestaoAssociarColunas", {
        data: {
          token,
          id,
        },
      })
      .then((response) => {
        document.location.reload(true);
      })
      .catch((error) => {
        alert("Erro ao excluir");
        setLoadingEditar(false);
      });
  };
  const editaQuestaoNoBanco = async (e) => {
    if (categoriasNovaQuestao !== [] && categoriasNovaQuestao.length !== 0) {
      axiosClient
        .put("/editarQuestaoAssociarColunas", {
          token,
          id,
          categoria: categoriasNovaQuestao,
          novaOpcao1,
          opcao2,
          novaOpcao3,
          opcao4,
          novaOpcao5,
          opcao6,
          novaOpcao7,
          opcao8,
          novaOpcao9,
          opcao10,
        })
        .then((response) => {
          alert(response.data.message);
          window.location.reload(false);
          setLoadingEditar(false);
          setIsOpen(false);
        })
        .catch((error) => {
          alert("Erro ao editar");
          setLoadingEditar(false);
        });
    } else {
      alert("Faltaram categorias");
    }
  };
  const editaQuestao = async (e) => {
    e.preventDefault();
    setLoadingEditar(true);
    const fd1 = new FormData();
    fd1.append("file", novaOpcao1);
    const fd2 = new FormData();
    fd2.append("file", novaOpcao3);
    const fd3 = new FormData();
    fd3.append("file", novaOpcao5);
    const fd4 = new FormData();
    fd4.append("file", novaOpcao7);
    const fd5 = new FormData();
    fd5.append("file", novaOpcao9);
    await axios
      .all([
        axiosClient.post("/imagem", fd1),
        axiosClient.post("/imagem", fd2),
        axiosClient.post("/imagem", fd3),
        axiosClient.post("/imagem", fd4),
        axiosClient.post("/imagem", fd5),
      ])
      .then((responseArr) => {
        if (!responseArr[0].data.msg) {
          const midia1 =
            "https://drive.google.com/uc?id=" + responseArr[0].data;
          setNovaOpcao1(midia1);
        }
        if (!responseArr[1].data.msg) {
          const midia2 =
            "https://drive.google.com/uc?id=" + responseArr[1].data;
          setNovaOpcao3(midia2);
        }
        if (!responseArr[2].data.msg) {
          const midia3 =
            "https://drive.google.com/uc?id=" + responseArr[2].data;
          setNovaOpcao5(midia3);
        }
        if (!responseArr[3].data.msg) {
          const midia4 =
            "https://drive.google.com/uc?id=" + responseArr[3].data;
          setNovaOpcao7(midia4);
        }
        if (!responseArr[4].data.msg) {
          const midia5 =
            "https://drive.google.com/uc?id=" + responseArr[4].data;
          setNovaOpcao9(midia5);
        }
      });
    await ColocaCategorias();
  };
  useEffect(() => {
    if (categoriasNovaQuestao !== undefined) {
      if (categoriasNovaQuestao !== [] && categoriasNovaQuestao.length !== 0) {
        editaQuestaoNoBanco();
      }
    }
  }, [categoriasNovaQuestao]);
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
      const categoriasDoBanco = await axiosClient.get("/categoria");
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
            <h1>Questões de Associar Colunas</h1>
            <h2>
              Pesquise para ver todas as questões de associar colunas de uma
              dada categoria
            </h2>
          </Title>
          <img src="https://drive.google.com/uc?id=1--GhiQKm9xojTvq2yPNwPBFQVLm5b8D6" alt=""/>
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
                    <p> Imagens </p>
                    <p> Palavras </p>
                  </Div>
                  <Div>
                    <img
                      src={questoes.opcao1}
                      id={questoes.id}
                      style={{ display: "block" }}
                      onLoad={(v) => {
                        if (v.target.naturalWidth !== 0) {
                          v.target.style.display = "block";
                        } else {
                          v.target.style.display = "none";
                        }
                      }}
                      alt=""
                    ></img>
                    <video
                      src={questoes.opcao1}
                      style={{ width: "150px", display: "block" }}
                      id={questoes.id}
                      controls
                      onLoadedMetadata={(v) => {
                        v.target.style.display = "block";
                      }}
                      onError={(v) => {
                        v.target.style.display = "none";
                      }}
                    ></video>
                    <hr></hr>
                    <p>{questoes.opcao2}</p>
                  </Div>
                  <Div>
                    <img
                      src={questoes.opcao3}
                      id={questoes.id}
                      style={{ display: "block" }}
                      onLoad={(v) => {
                        if (v.target.naturalWidth !== 0) {
                          v.target.style.display = "block";
                        } else {
                          v.target.style.display = "none";
                        }
                      }}
                      alt=""
                    ></img>
                    <video
                      src={questoes.opcao3}
                      style={{ width: "150px", display: "block" }}
                      id={questoes.id}
                      controls
                      onLoadedMetadata={(v) => {
                        v.target.style.display = "block";
                      }}
                      onError={(v) => {
                        v.target.style.display = "none";
                      }}
                    ></video>
                    <hr></hr>
                    <p>{questoes.opcao4}</p>
                  </Div>
                  <Div>
                    <img
                      src={questoes.opcao5}
                      id={questoes.id}
                      style={{ display: "block" }}
                      onLoad={(v) => {
                        if (v.target.naturalWidth !== 0) {
                          v.target.style.display = "block";
                        } else {
                          v.target.style.display = "none";
                        }
                      }}
                      alt=""
                    ></img>
                    <video
                      src={questoes.opcao5}
                      style={{ width: "150px", display: "block" }}
                      id={questoes.id}
                      controls
                      onLoadedMetadata={(v) => {
                        v.target.style.display = "block";
                      }}
                      onError={(v) => {
                        v.target.style.display = "none";
                      }}
                    ></video>
                    <hr></hr>
                    <p>{questoes.opcao6}</p>
                  </Div>
                  <Div>
                    <img
                      src={questoes.opcao7}
                      id={questoes.id}
                      style={{ display: "block" }}
                      onLoad={(v) => {
                        if (v.target.naturalWidth !== 0) {
                          v.target.style.display = "block";
                        } else {
                          v.target.style.display = "none";
                        }
                      }}
                      alt=""
                    ></img>
                    <video
                      src={questoes.opcao7}
                      style={{ width: "150px", display: "block" }}
                      id={questoes.id}
                      controls
                      onLoadedMetadata={(v) => {
                        v.target.style.display = "block";
                      }}
                      onError={(v) => {
                        v.target.style.display = "none";
                      }}
                    ></video>
                    <hr></hr>
                    <p>{questoes.opcao8}</p>
                  </Div>
                  <Div>
                    <img
                      src={questoes.opcao9}
                      id={questoes.id}
                      style={{ display: "block" }}
                      onLoad={(v) => {
                        if (v.target.naturalWidth !== 0) {
                          v.target.style.display = "block";
                        } else {
                          v.target.style.display = "none";
                        }
                      }}
                      alt=""
                    ></img>
                    <video
                      src={questoes.opcao9}
                      style={{ width: "150px", display: "block" }}
                      id={questoes.id}
                      controls
                      onLoadedMetadata={(v) => {
                        v.target.style.display = "block";
                      }}
                      onError={(v) => {
                        v.target.style.display = "none";
                      }}
                    ></video>
                    <hr></hr>
                    <p>{questoes.opcao10}</p>
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
              width: "35vw",
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
            <p> Imagens </p>
            <p> Palavras </p>
          </Div>
          <Div>
            <InputJS
              type="file"
              name="url"
              style={{ marginTop: "3%", marginBottom: "5%" }}
              onChange={(v) => setNovaOpcao1(v.target.files[0])}
            ></InputJS>
            <hr></hr>
            <InputJS
              type="text"
              name="url"
              value={opcao2}
              style={{ marginTop: "3%", marginBottom: "5%" }}
              onChange={(v) => setOpcao2(v.target.value)}
            ></InputJS>
          </Div>
          <Div>
            <InputJS
              type="file"
              name="url"
              style={{ marginTop: "3%", marginBottom: "5%" }}
              onChange={(v) => setNovaOpcao3(v.target.files[0])}
            ></InputJS>
            <hr></hr>
            <InputJS
              type="text"
              name="url"
              value={opcao4}
              style={{ marginTop: "3%", marginBottom: "5%" }}
              onChange={(v) => setOpcao4(v.target.value)}
            ></InputJS>
          </Div>
          <Div>
            <InputJS
              type="file"
              name="url"
              style={{ marginTop: "3%", marginBottom: "5%" }}
              onChange={(v) => setNovaOpcao5(v.target.files[0])}
            ></InputJS>
            <hr></hr>
            <InputJS
              type="text"
              name="url"
              value={opcao6}
              style={{ marginTop: "3%", marginBottom: "5%" }}
              onChange={(v) => setOpcao6(v.target.value)}
            ></InputJS>
          </Div>
          <Div>
            <InputJS
              type="file"
              name="url"
              style={{ marginTop: "3%", marginBottom: "5%" }}
              onChange={(v) => setNovaOpcao7(v.target.files[0])}
            ></InputJS>
            <hr></hr>
            <InputJS
              type="text"
              name="url"
              value={opcao8}
              style={{ marginTop: "3%", marginBottom: "5%" }}
              onChange={(v) => setOpcao8(v.target.value)}
            ></InputJS>
          </Div>
          <Div>
            <InputJS
              type="file"
              name="url"
              style={{ marginTop: "3%", marginBottom: "5%" }}
              onChange={(v) => setNovaOpcao9(v.target.files[0])}
            ></InputJS>
            <hr></hr>
            <InputJS
              type="text"
              name="url"
              value={opcao10}
              style={{ marginTop: "3%", marginBottom: "5%" }}
              onChange={(v) => setOpcao10(v.target.value)}
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
export default FormAssociarColunas;
