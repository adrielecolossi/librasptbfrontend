import axios from 'axios';


//axios.defaults.baseURL = 'https://bancolibrasptb.herokuapp.com'
axios.defaults.baseURL = 'http://localhost:3001'
axios.defaults.headers.get['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';



axios.interceptors.response.use(
    function (response) {
      return response;
    }, 
    function (error) {
     return error.response;
    }
  );


export const axiosClient = axios;
