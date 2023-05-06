import axios from "axios";

const baseURL = "http://localhost:3001";

export const getService = (route = '', body = [], headers = []) => {
    return axios.get(baseURL + route, {
      data: body
    }).then(response => {
      return response.data;
    }).catch(error => {
      console.log(error);
      return false;
    });
};

export const postService = (route = '', body = [], headers = []) => {
    return axios.post(baseURL + route, {
      data: body
    }).then(response => {
      return response.data;
    }).catch(error => {
      console.log(error);
      return false;
    });
};
