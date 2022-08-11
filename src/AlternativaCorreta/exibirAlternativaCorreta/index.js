import React from "react";
import HeaderOne from "../../header/index.js";
import { useState, useEffect} from "react";
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
import { axiosClient } from "../../apiClient.js";
function FormAlternativaCorreta() {
  const [isLoggedIn, setIsLoggedIn] = useState();
  const [apiResponse, setApiResponse] = useState([]);
  const [loadingEditar, setLoadingEditar] = useState(false);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [opcao1, setOpcao1] = useState("");
  const [novaMidia, setNovaMidia] = useState("");
  const [midia, setMidia] = useState("");
  const [opcao2, setOpcao2] = useState("");
  const [opcao3, setOpcao3] = useState("");
  const [opcao4, setOpcao4] = useState("");
  const [opcao5, setOpcao5] = useState("");
  const [categoriasQuestao, setCategoriasQuestao] = useState();
  const [categoriasDaQuestao, setCategoriasDaQuestao] = useState([]);
  const [id, setId] = useState();
  const [categorias, setCategorias] = useState([]);
  let token = localStorage.getItem("tokenLibrasPTB");
  let vetor =[];
  let buttonEditarContent;
  const pesquisaQuestoes = async (id) => {
    axiosClient
      .get("/getQuestaoMarcarMidia", {
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
          id,
          token,
        },
      })
      .then(function (response) {
        let resp = response.data;
        setCategoriasDaQuestao(resp);
      });
  };
  const excluiQuestao = async (id) => {
    axiosClient
      .delete("/excluirQuestaoMarcarMidia", {
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
  
  function ColocaCategorias() {
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
  const editaQuestao = async (e) => {
    e.preventDefault();
    setLoadingEditar(true);
    if (novaMidia !== "") {
      const fd1 = new FormData();
      fd1.append("file", novaMidia);
      const response = await axiosClient.post("/imagem", fd1);
      const midia = "https://drive.google.com/uc?id=" + response.data;
      setNovaMidia(midia);
    }
    ColocaCategorias()
  };
  
  const editaQuestaoNoBanco = async (e) => {
    axiosClient
      .put("/editarQuestaoMarcarMidia", {
        id,
        token,
        categoria: categoriasQuestao,
        midia: novaMidia,
        opcao1,
        opcao2,
        opcao3,
        opcao4,
        opcao5,
      })
      .then((response) => {
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
    setMidia(dadosDaQuestao.midia);
    setOpcao1(dadosDaQuestao.opcao1);
    setOpcao2(dadosDaQuestao.opcao2);
    setOpcao3(dadosDaQuestao.opcao3);
    setOpcao4(dadosDaQuestao.opcao4);
    setOpcao5(dadosDaQuestao.opcao5);
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  useEffect(() => {
    if (categoriasQuestao !== undefined) {
      if (categoriasQuestao !== [] && categoriasQuestao.length !== 0) {
        editaQuestaoNoBanco();
      } else {
        setLoadingEditar(true);
      }
    }
  }, [categoriasQuestao]);
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
            <h1>Questões de Alternativa Correta </h1>
            <h2>
              Pesquise para ver todas as questões de marca uma alternativa para
              palavra do(a) vídeo/imagem de uma dada categoria
            </h2>
          </Title>
          <img src="https://drive.google.com/uc?id=1tJQZFJGFNuwccRpWoSNKtx1SomeLCgRw" alt=""/>
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
                    <p> Alternativas </p>
                  </Div>
                  <Div>
                    <img
                      src={questoes.midia}
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
                      src={questoes.midia}
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
                  </Div>
                  <Div>
                    <p> ✔️:{questoes.opcao1}</p>
                  </Div>
                  <Div>
                    <p>❌:{questoes.opcao2}</p>
                  </Div>
                  <Div>
                    <p>❌:{questoes.opcao3}</p>
                  </Div>
                  <Div>
                    <p>❌:{questoes.opcao4}</p>
                  </Div>
                  <Div>
                    <p>❌:{questoes.opcao5}</p>
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
            <p> Imagens </p>
          </Div>
          <Div>
            <img src={midia} style={{ width: "30%" }} alt="" ></img>
            <br />
            <InputJS
              type="file"
              name="url"
              style={{ marginTop: "3%", marginBottom: "5%" }}
              onChange={(v) => setNovaMidia(v.target.files[0])}
            ></InputJS>
          </Div>
          <Div>
            <InputJS
              type="text"
              name="url"
              value={opcao1}
              color={"rgba(144, 230, 142, 0.5)"}
              style={{ marginTop: "3%", marginBottom: "5%" }}
              onChange={(v) => setOpcao1(v.target.value)}
            ></InputJS>
          </Div>
          <Div>
            <InputJS
              type="text"
              name="url"
              value={opcao2}
              color={"rgba(252, 65, 65, 0.5)"}
              style={{ marginTop: "3%", marginBottom: "5%" }}
              onChange={(v) => setOpcao2(v.target.value)}
            ></InputJS>
          </Div>
          <Div>
            <InputJS
              type="text"
              name="url"
              value={opcao3}
              color={"rgba(252, 65, 65, 0.5)"}
              style={{ marginTop: "3%", marginBottom: "5%" }}
              onChange={(v) => setOpcao3(v.target.value)}
            ></InputJS>
          </Div>
          <Div>
            <InputJS
              type="text"
              name="url"
              value={opcao4}
              color={"rgba(252, 65, 65, 0.5)"}
              style={{ marginTop: "3%", marginBottom: "5%" }}
              onChange={(v) => setOpcao4(v.target.value)}
            ></InputJS>
          </Div>
          <Div>
            <InputJS
              type="text"
              name="url"
              value={opcao5}
              color={"rgba(252, 65, 65, 0.5)"}
              style={{ marginTop: "3%", marginBottom: "5%" }}
              onChange={(v) => setOpcao5(v.target.value)}
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
export default FormAlternativaCorreta;
