import axios from 'axios';


axios.defaults.baseURL = 'http://localhost:3001/'


axios.interceptors.response.use(
    function (response) {
      return response;
    }, 
    function (error) {
     return error.response;
    }
  );


export const axiosClient = axios;