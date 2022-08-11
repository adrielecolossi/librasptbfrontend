import React, { useState } from "react";
export default function App() {
  const [file, setFile] = useState();
/*
  const enviaDados = async (e) => {
    e.preventDefault(); 
    const requestConfig = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data'
      }
    }
    axios.post('http://localhost:3001/imagem', {file: file}, requestConfig);
   
    }
    
    import axios from "axios";
*/

/*
const enviaDados = async (e) => {
  e.preventDefault()
  const fd= new FormData()
  fd.append('file', file,'file')
  var options = {
    method: 'POST',
    url: 'http://localhost:3003/imagem',
    headers: {'Content-Type': 'multipart/form-data; boundary=---011000010111000001101001'},
    data: '-----011000010111000001101001\r\nContent-Disposition: form-data; name="file"; filename="image (1).jpg"\r\nContent-Type: image/jpeg\r\n\r\n\r\n-----011000010111000001101001--\r\n'
  };
axios.post('http://localhost:3001/imagem', fd, options).then(res =>{
})
}
*/

/*


  var options = {
    method: 'POST',
    url: 'http://localhost:3003/imagem',
    headers: {'Content-Type': 'multipart/form-data; boundary=---011000010111000001101001'},
    data: '-----011000010111000001101001\r\nContent-Disposition: form-data; name="file"; filename="image (1).jpg"\r\nContent-Type: image/jpeg\r\n\r\n\r\n-----011000010111000001101001--\r\n'
  };
  
  axios.request(options).then(function (response) {
  }).catch(function (error) {
  });
*/
var axios = require("axios").default;
async function enviaDados(e){

  e.preventDefault()
  const fd = new FormData()
  fd.append('file', file)
  const response = await axios.post('http://localhost:3001/imagem', fd)
alert(response.status);


}

/*
const response = await fetch('http://localhost:3001/imagem',{
  method: 'POST',
  headers: {'Content-Type': 'multipart/form-data; boundary=---011000010111000001101001'},
  body: form
})
*/

/*
var options = {
  method: 'POST',
  url: 'http://localhost:3001/imagem',
  headers: {'Content-Type': 'multipart/form-data; boundary=---011000010111000001101001'},
  data: '-----011000010111000001101001\r\nContent-Disposition: form-data; name="file"; filename="image (1).jpg"\r\nContent-Type: image/jpeg\r\n\r\n\r\n-----011000010111000001101001--\r\n'
};

axios.request(options).then(function (response) {
}).catch(function (error) {
});
}
*/
/*
<form  method="post" enctype="multipart/form-data">
  <input type="file" name="file" id="file" onChange={(v)=> setFile(v.target.files[0])} />
  <input type="submit" value="submit" onClick={enviaDados}/>
</form>
*/


    return (
  
 <form enctype="multipart/form-data" method="POST"> 
 <input type="file" name="myImage" accept="image/*"  onChange={(v)=> setFile('')}/>
 <input type="submit" value="Upload Photo" onClick={enviaDados} />
</form>
     );
    }
