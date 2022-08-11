import axios from 'axios';


axios.defaults.baseURL = 'https://bancolibrasptb.herokuapp.com'


axios.interceptors.response.use(
    function (response) {
      return response;
    }, 
    function (error) {
     return error.response;
    }
  );


export const axiosClient = axios;
