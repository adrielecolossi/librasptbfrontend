import React, { useState } from "react";
import "./form.css";
import HeaderOne from "../header/index.js";
import axios, {post} from 'axios'
const   token= localStorage.getItem("token");

const categ= new Array()
const printAddress = async () => {
const a=  await axios.get('http://localhost:3001/categoria')

for(let i=0; i<a.data.length; i++){  
categ.push(a.data[i].nome)
//document.querySelector('datalist').innerHTML+=`<option value=${categ[i]}></option>` 
}

callPrintAdress()
};

function callPrintAdress(){
  for(let i=0; i< categ.length;i++){
    if(document.querySelector('datalist')!=null){
    document.querySelector('datalist').innerHTML+=`<option value="${categ[i]}"></option>`;
  }
  
}
}
printAddress()

function Home() {
  let formData;
  const [tipo, setTipo] = useState("");
  const [categoria, setCategoria] = useState("")
  const [imagem, setImagem] = useState("");  
  let x;


let categorias= new Array()

  const enviaDados = async (e) => {
    e.preventDefault(); 
    
    axios //faz chamada http
    .post('http://localhost:3001/questao', 
    {
     token, tipo,categoria   // nome: nome
    })
      .then((response) => {
        
      
      })
      .catch((error) => {
      });
    }

    const enviaImagem = async (e) => {
      e.preventDefault(); 
      
      axios //faz chamada http
      .post('http://localhost:3001/imagem', 
      {
      file: imagem // nome: nome
      })
        .then((response) => {
          
        
        })
        .catch((error) => {
        });
      }
      /*
    function onChange(e){
   let files=e.target.files;
  let reader= new FileReader();
  reader.readAsDataURL(files[0]);    
  reader.onload =(e) =>{
    console.warn(e.target.result)
    const url="http://localhost:3001/"
    formData={file: e.target.result}
  //  var a = document.createElement("a"); //Create <a>
   // a.href = "data:image/png;base64," +e.target.result //Image Base64 Goes here
    //a.download = "Image.png"; //File name Here
  //  a.click(); //Downloaded file
  }

  var link = document.createElement('a');
*/
  //link.href = e;
//link.download = 'Download.jpg';
//document.body.appendChild(link);
//link.click();
//document.body.removeChild(link);
  
  return (
    <div>
      <HeaderOne one="-"></HeaderOne>
      <br />
      <br />
      <div className="topic">
        <h1>Escolha o tipo de questão</h1>
        <br />
        <div>
          <input
            type="radio"
            className="Tipo"
            name="AC"
            onChange={(v) => setTipo('AC')}
            value={tipo}
            onClick={() => desmarcar(0)}
          />{" "}
          Associar Colunas
          <br />
          <input
            type="radio"
            className="Tipo"
            name="OP"
            onChange={(v) => setTipo('OP')}
            value={tipo}
            onClick={() => desmarcar(1)}
          />
          Ordenar palavras de uma frase
          <br />
          <input
            type="radio"
            className="Tipo"
            name="DPV"
            onChange={(v) => setTipo('DPV')}
            value={tipo}
            onClick={() => desmarcar(2)}
          />
          Digitar palavra da imagem
          <br />
          <input
            type="radio"
            className="Tipo"
            name="OP"
            onChange={(v) => setTipo('OP')}
            value={tipo}
            onClick={() => desmarcar(3)}
          />
          Digitar palavra do vídeo
          <br />
          <input
            type="radio"
            className="Tipo"
            name="DPF"
            onChange={(v) => setTipo('DPF')}
            value={tipo}
            onClick={() => desmarcar(4)}
          />
          Digitar frase de um vídeo em libras
          <br />
          <input
            type="radio"
            className="Tipo"
            name="PLFD"
            onChange={(v) => setTipo('PLFD')}
            value={tipo}
            onClick={() => desmarcar(5)}
          />
          Preencher lacuna da frase digitando
          <br />
          <input
            type="radio"
            className="Tipo"
            name="PLFA"
            onChange={(v) => setTipo('PLFA')}
            value={tipo}
            onClick={() => desmarcar(6)}
          />
          Preencher lacuna da frase com alternativa
          <br />
          <input
            type="radio"
            className="Tipo"
            name="MAPV"
            onChange={(v) => setTipo('MAPV')}
            value={tipo}
            onClick={() => desmarcar(7)}
          />
          Marcar alternativa da palavra do vídeo
          <br />
          <input
            type="radio"
            className="Tipo"
            name="MAPI"
            onChange={(v) => setTipo('MAPI')}
            value={tipo}
            onClick={() => desmarcar(8)}
          />
          Marcar alternativa da palavra da imagem
          <br />
          <input
            type="radio"
            className="Tipo"
            name="MAF"
            onChange={(v) => setTipo('MAF')}
            value={tipo}
            onClick={() => desmarcar(9)}
          />
          Marcar alternativa da frase
        </div>
      </div>
      <br />
      <br />
      <div className="topic3">
        <h1>Selecione a categoria</h1>
        <br />
        </div>
        <input list="datalist"/>


        <datalist id="datalist">
  
  </datalist>
  
      
      <br />
      <br />
      <div className="topic3">
        <div className="topic3" id="frase">
          <h1>Frase</h1>

          <input type="text" name="frase" placeholder="Frase" />
        </div>

        <div className="topic3" id="colunas">
          <h1>Colunas</h1>
          <br />
          <input
            type="text"
            name="coluna2"
            class="coluna"
            placeholder="Alternativa 2"
          />
          <input
            type="text"
            name="coluna3"
            class="coluna"
            placeholder="Alternativa 3"
          />
          <input
            type="text"
            name="coluna4"
            class="coluna"
            placeholder="Alternativa 4"
          />
          <input
            type="text"
            name="coluna5"
            class="coluna"
            placeholder="Alternativa 5"
          />
          <input
            type="text"
            name="coluna6"
            class="coluna"
            placeholder="Par da alternativa 1"
          />
          <input
            type="text"
            name="coluna7"
            class="coluna"
            placeholder="Par da alternativa 2"
          />
          <input
            type="text"
            name="coluna8"
            class="coluna"
            placeholder="Par da alternativa 3"
          />
          <input
            type="text"
            name="coluna9"
            class="coluna"
            placeholder="Par da alternativa 4"
          />
          <input
            type="text"
            name="coluna10"
            class="coluna"
            placeholder="Par da alternativa 5"
          />
        </div>

        <div className="topic3" id="alternativas">
          <h1>Alternativas</h1>
          <br />
          <input
            type="text"
            name="altcerta"
            id="altcerta"
            class="altcerta"
            placeholder="Alternativa correta"
          />
          <input
            type="text"
            name="alterrada1"
            id="alterrada1"
            class="alterrada"
            placeholder="Alternativa errada"
          />
          <input
            type="text"
            name="alterrada2"
            id="alterrada2"
            class="alterrada"
            placeholder="Alternativa errada"
          />
          <input
            type="text"
            name="alterrada3"
            id="alterrada3"
            class="alterrada"
            placeholder="Alternativa errada"
          />
          <input
            type="text"
            name="alterrada4"
            id="alterrada4"
            class="alterrada"
            placeholder="Alternativa errada"
          />
        </div>

        <div className="topic3" id="resposta">
          <h1>Resposta correta</h1>

          <input type="text" name="resposta" placeholder="resposta" />
        </div>

        <div className="topic3" id='url'>
            <h1>Imagem/vídeo</h1>
            <input type='file' name='url' onChange={(v) => setImagem(v)}></input>
            <button onClick={enviaImagem} value="Enviar">
          Enviar{" "}
          </button>
        </div>
        <br/>
        <br/>
        <button onClick={enviaDados} value="Enviar">
          Enviar{" "}
          </button>
      </div>
     
      
    </div>
  );
  function desmarcar(num) {
    let frase = document.getElementById("frase");
    let alternativas = document.getElementById("alternativas");
    let colunas = document.getElementById("colunas");
    var resposta= document.getElementById("resposta");
    
    let url = document.getElementById("url");
   
    //desmarca todos os botoes menos o num
    let tipo;
    for (let i = 0; i < 10; i++) {
      if (i !== num) {
        tipo = document.getElementsByClassName("Tipo")[i];
        tipo.checked = false;
      }
    }
    switch (num) {
      case 0:
        frase.style.display = "none";
        alternativas.style.display = "none";
        colunas.style.display = "unset";
        resposta.style.display="none"
        url.style.display = "none"
        break;
      case 1:

      case "Papayas":
        // expected output: "Mangoes and papayas are $2.79 a pound."
        break;
    }
  }
}

export default Home;
