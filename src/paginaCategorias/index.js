import React from "react";
import HeaderOne from "../header/index.js";
import { useState, useEffect } from "react";
import Modal from "react-modal";
import {
  Div,
  Title,
  DivCategorias,
  Divs,
  ContainerCategorias,
} from "./styles.js";
import ButtonJS from "../components/Button/index.js";
import { Redirect} from "react-router-dom";
import { axiosClient } from "../apiClient";
import InputJS from "../components/Input/index.js";
import ThreeDotsWave from "../components/ThreeDotsWave/index.js";
function PaginaCategorias() {
  const [loadingCriarCategoria, setLoadingCriarCategoria] = useState(false);
  const [loadingEditarCategoria, setLoadingEditarCategoria] = useState(false);
  const [imagemCategoria, setImagemCategoria] = useState();
  const [imagemNovaCategoria, setImagemNovaCategoria] = useState();
  const [nomeCategoria, setNomeCategoria] = useState();
  const [imagemNovaEditarCategoria, setImagemNovaEditarCategoria] = useState();
  const [nomeEditarCategoria, setNomeEditarCategoria] = useState();
  const [categorias, setCategorias] = useState([]);
  const [idCategoria, setIdCategoria] = useState();
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState();
  let token = localStorage.getItem("tokenLibrasPTB");
  let buttonContent;
  let buttonEditarContent;
  const criaCategoria = async (e) => {
    e.preventDefault();
    if (nomeCategoria === undefined || imagemNovaCategoria === undefined) {
      alert("Dados incompletos");
    } else {
      setLoadingCriarCategoria(true);
      const fd = new FormData();
      fd.append("file", imagemNovaCategoria);
      const response = await axiosClient.post("/imagem", fd);
      const midia = "https://drive.google.com/uc?id=" + response.data;
      axiosClient
        .post("/categoria", {
          nome: nomeCategoria,
          midia,
          token,
        })
        .then((response) => {
          setLoadingCriarCategoria(false);
          alert("Categoria criada com sucesso");
          document.location.reload(true);
        })
        .catch((error) => {
          alert(error);
        });
    }
  };
  const editaCategoria = async (e) => {
    setLoadingEditarCategoria(true);
    let midiaEditar;
    e.preventDefault();
    if (imagemNovaEditarCategoria !== undefined) {
      const fd = new FormData();
      fd.append("file", imagemNovaEditarCategoria);
      const response = await axiosClient.post("/imagem", fd);
      midiaEditar = "https://drive.google.com/uc?id=" + response.data;
    }
    if (imagemNovaEditarCategoria === undefined) {
      midiaEditar = "";
    }
    axiosClient
      .put("/editarCategoria", {
        id: idCategoria,
        token,
        nome: nomeEditarCategoria,
        midia: midiaEditar,
      })
      .then((response) => {
        setLoadingEditarCategoria(false);
        alert(response.data.message);
        document.location.reload(true);
      })
      .catch((error) => {
        alert(error);
      });
  };
  const excluiCategoria = async (id) => {
    axiosClient
      .delete("/excluirCategoria", {
        data:{
        id,
        token,
        }
      })
      .then((response) => {
        document.location.reload(true);
      })
      .catch((error) => {
        alert(error);
      });
  };
  function openModal(id) {
    setIdCategoria(id);
    let dadosDaCategoria;
    for (let i = 0; i < categorias.length; i++) {
      if (categorias[i].id === id) {
        dadosDaCategoria = categorias[i];
      }
    }
    setImagemCategoria(dadosDaCategoria.midia);
    setNomeEditarCategoria(dadosDaCategoria.nome);
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
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

  if (loadingCriarCategoria === false) {
    buttonContent = (
      <ButtonJS
        onClick={criaCategoria}
        padding={"1.5%"}
        width={"15vw"}
        widthResp={"40%"}
        backgroundColor={"#219EBC"}
        color={"#FFFF"}
        borderRadius={"5px"}
        name={"Criar Categoria"}
      />
    );
  } else {
    buttonContent = (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <ThreeDotsWave />
      </div>
    );
  }
  if (loadingEditarCategoria === false) {
    buttonEditarContent = (
      <ButtonJS
        onClick={editaCategoria}
        padding={"2%"}
        width={"25vw"}
        widthResp={"40%"}
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
        <HeaderOne logged={true}></HeaderOne>
        <Title fontSize={2.5} color={"#000000"}>
          Criar categoria
        </Title>
        <Title fontSize={1} color={"#7A7A7A"}>
          Abaixo o formulário para criar uma categoria
        </Title>
        <br />
        <Divs>
          <form enctype="multipart/form-data" method="POST">
            <Div>
              <label for="inputnome">Nome da categoria: &nbsp; </label>
              <InputJS
                id="inputnome"
                type="text"
                value={nomeCategoria}
                name="nomeCategoria"
                onChange={(v) => setNomeCategoria(v.target.value)}
                color={"rgba(142, 202, 230, 0.5)"}
              />
            </Div>
            <Div>
              <label for="inputimagem">Imagem: </label>
              <InputJS
                id="inputimagem"
                type="file"
                name="imagemCategoria"
                onChange={(v) => setImagemNovaCategoria(v.target.files[0])}
              />
            </Div>
            {buttonContent}
          </form>
        </Divs>
        <Title fontSize={2.5} color={"#000000"}>
          Editar/Excluir categoria
        </Title>
        <Title fontSize={1} color={"#7A7A7A"}>
          Clique nas opções das categorias abaixo para editar ou excluir
        </Title>
        <ContainerCategorias>
          {categorias.map((categoria) => {
            return (
              <DivCategorias>
                <label for="categoria">{categoria.nome}</label>
                <div style={{ display: "flex", alignContent: "flex-end" }}>
                  <ButtonJS
                    onClick={() => openModal(categoria.id)}
                    width={"3vw"}
                    widthResp={"6vw"}
                    backgroundColor={"rgba(142, 202, 230, 0.0)"}
                    image={
                      "https://drive.google.com/uc?id=1vJSZWVWFwrXy4uCf5fZgycoIothyzVh_"
                    }
                  />
                  <ButtonJS
                    onClick={() => excluiCategoria(categoria.id)}
                    width={"3vw"}
                    widthResp={"6vw"}
                    backgroundColor={"rgba(142, 202, 230, 0.0)"}
                    image={
                      "https://drive.google.com/uc?id=1Ctuuoa2R8ALfwH8WBgta3auHYBkr4qiJ"
                    }
                  />
                </div>
              </DivCategorias>
            );
          })}
        </ContainerCategorias>

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
              alignItems: "center",
            },
          }}
        >
          <h1>Editar categoria</h1>
          <form enctype="multipart/form-data" method="POST">
            <p>Imagem atual da categoria:</p>
            <img src={imagemCategoria} style={{ width: "50px" }} alt=""></img>
            <br></br>
            <br></br>
            <label for="nome">Nome da categoria:</label>
            <br></br>
            <InputJS
              type="text"
              name="nomeCategoria"
              onChange={(v) => setNomeEditarCategoria(v.target.value)}
              value={nomeEditarCategoria}
              color={"#EDEDEDED"}
            />
            <br></br>
            <br></br>
            <label for="url">Logo da categoria:</label>
            <br></br>
            <InputJS
              type="file"
              name="url"
              style={{ marginTop: "3%", marginBottom: "5%" }}
              onChange={(v) => setImagemNovaEditarCategoria(v.target.files[0])}
            ></InputJS>
            <br></br>
            <br></br>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {buttonEditarContent}
              <ButtonJS
                onClick={closeModal}
                padding={"2%"}
                width={"25vw"}
                widthResp={"40%"}
                backgroundColor={"rgba(229, 116, 116, 0.5)"}
                borderRadius={"10px"}
                name={"Cancelar"}
              />
            </div>
          </form>
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
export default PaginaCategorias;
