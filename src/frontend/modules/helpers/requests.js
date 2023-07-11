import axios from "axios";

const baseURL = "http://localhost:5542";

let config = {
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
};

export const getService = async (route = '', body = {}, localUrl = true) => {
  config = await setTokenAuth(config, localUrl, route);
  let url = localUrl ? baseURL + route : route;
  return axios.get(url, {
    ...config,
    params: body
  }).then(response => {
    return response.data;
  }).catch(error => {
    console.log(error);
    return [];
  });
};

export const postService = async (route = '', body = {}, localUrl = true) => {
  config = await setTokenAuth(config, localUrl, route);  
  let url = localUrl ? baseURL + route : route;
  return axios.post(url, body, config).then(response => {
    return response.data;
  }).catch(error => {
    console.log(error);
    return false;
  });
};


const setTokenAuth = async (config, localUrl, route) => {
  if (localUrl && route !== '/login') {
    config.headers['Authorization'] = 'Bearer ' + await sessionStorage.getItem('authToken');
  }
  return config;
} 