import React, { useState, useEffect } from "react";
import HeaderOne from "../header/index.js";
import { Banner, BannerCards, Title } from "./styles";
import Card from "../components/Card";
import {axiosClient} from "../apiClient";
function SplashScreen() {
  let header;
  const [isLoggedIn, setIsLoggedIn] = useState();
  const cardsContent = [
    {
      image: "https://drive.google.com/uc?id=1--GhiQKm9xojTvq2yPNwPBFQVLm5b8D6",
      title: "Associar colunas",
      subtitle: "Modelo em que se associa duas respostas de colunas",
      linkCriar: "./FormAssociarColunas",
      linkExibir: "./ExibirAssociarColunas",
    },
    {
      image: "https://drive.google.com/uc?id=1hw9NhdbmhwB0jcaegsAXYkGYcHnnKUoe",
      title: "Ordenar frase",
      subtitle: "Modelo em que se ordena palavras de uma frase",
      linkCriar: "./FormOrdenarFrase",
      linkExibir: "./ExibirOrdenarFrase",
    },
    {
      image: "https://drive.google.com/uc?id=1RhfgdrfXiRkPFZP7tpgTUHxuaXVcsDL8",
      title: "Digitar palavra (imagem/vídeo)",
      subtitle: "Modelo em que se digita o que aparece na imagem/vídeo",
      linkCriar: "./FormDigitarPalavra",
      linkExibir: "./ExibirDigitarPalavra",
    },
    {
      image: "https://drive.google.com/uc?id=1otAFn5cnK3ZZ49nmqway2TdqEmt8KlKt",
      title: "Digitar lacuna",
      subtitle: "Modelo em que se digita uma palavra para preencher uma frase",
      linkCriar: "./FormDigitarLacuna",
      linkExibir: "./ExibirDigitarLacuna",
    },
    {
      image: "https://drive.google.com/uc?id=169RNcKlK-Cbba4sb99Z1LgBL1atLjjd6",
      title: "Marcar Lacuna",
      subtitle: "Modelo em que se marca uma alternativa para preencher frase",
      linkCriar: "./FormMarcarLacuna",
      linkExibir: "./ExibirMarcarLacuna",
    },
    {
      image: "https://drive.google.com/uc?id=1tJQZFJGFNuwccRpWoSNKtx1SomeLCgRw",
      title: "Alternativa correta (imagem/vídeo)",
      subtitle:
        "Modelo em que se marca uma alternativa para palavra da imagem/vídeo",
      linkCriar: "./FormAlternativaCorreta",
      linkExibir: "./ExibirAlternativaCorreta",
    },
    {
      image: "https://drive.google.com/uc?id=1DrU1sE3HiSclK8mQl9jyWj1dvoKQJxKb",
      title: "Alternativa correta (frase)",
      subtitle:
        "Modelo em que se marca uma alternativa correta de qual é a frase",
      linkCriar: "./FormAlternativaFrase",
      linkExibir: "./ExibirAlternativaFrase",
    },
  ];
  useEffect(() => {
    let token = localStorage.getItem("tokenLibrasPTB");
    const getLogin = async () => {
      const response = await axiosClient.get("login", {
        params: { token },
      });
      
    };
    try{getLogin()
    } catch (error){
      console.log(error)
    };
  }, []);
  if (isLoggedIn === "loggedIn") {
    header = <HeaderOne logged={true}></HeaderOne>;
  } else {
    header = <HeaderOne logged={false}></HeaderOne>;
  }
  return (
    <>
      {header}
      <Banner>
        <Title>
          <h1>Crie, edite e exclua questões para o LIBRAS-PTB!</h1>
          <h2>Basta fazer login para começar a desenvolver!</h2>
        </Title>
        <img
          src="https://drive.google.com/uc?id=1JJYSNQ5xjSx8QYRRDDd7OtoiN1W7_9yS"
          alt=""
        />
      </Banner>
      <BannerCards>
        {cardsContent.map((cardsContent) => {
          return (
            <>
              <Card
                image={cardsContent.image}
                title={cardsContent.title}
                subtitle={cardsContent.subtitle}
                linkCriar={cardsContent.linkCriar}
                linkExibir={cardsContent.linkExibir}
                categories={false}
              />
            </>
          );
        })}
      </BannerCards>
      <BannerCards>
        <Card
          image={
            "https://drive.google.com/uc?id=1WyXbqSIOrg0hX9ECfWgDGJJaNZ2YSG-7"
          }
          title={" Crie, edite, e exclua categorias do LibrasPTB"}
          subtitle={" Basta fazer login!"}
          link={"./categorias"}
          categories={true}
        />
      </BannerCards>
    </>
  );
}

export default SplashScreen;
