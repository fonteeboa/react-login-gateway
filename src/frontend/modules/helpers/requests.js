import axios from "axios";

const baseURL = "http://localhost:3001";

const config = {
  headers: {
    'Authorization': 'Bearer ' + sessionStorage.getItem('authToken'),
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
};

export const getService = (route = '', body = {}, localUrl = true) => {
  let url = localUrl ? baseURL + route : route;
  return axios.get(url, {
    ...config,
    params: body
  }).then(response => {
    return response.data;
  }).catch(error => {
    console.log(error);
    return false;
  });
};

export const postService = (route = '', body = {}, localUrl = true) => {
  let url = localUrl ? baseURL + route : route;
  return axios.post(url, body, config).then(response => {
    return response.data;
  }).catch(error => {
    console.log(error);
    return false;
  });
};
