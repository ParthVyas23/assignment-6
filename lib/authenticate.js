import jwt_decode from "jwt-decode";
const axios = require("axios");

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export function setToken(token) {
  localStorage.setItem("token", token);
}

export function getToken() {
  try {
    return localStorage.getItem("token");
  } catch (err) {
    return null;
  }
}

export function removeToken() {
  localStorage.removeItem("token");
}

export function readToken() {
  try {
    const token = getToken();
    return token ? jwt_decode(token) : null;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export function isAuthenticated() {
  const token = readToken();
  return token ? true : false;
}

export function authenticateUser(userName, password) {
  return axios
    .post(`${API_URL}/api/user/login`, { userName, password })
    .then((response) => {
      const token = response.data.token;

      if (token) {
        setToken(token);
        return true;
      } else {
        return false;
      }
    })
    .catch((error) => {
      return false;
    });
}

export function registerUser(userName, password, password2) {
  return axios
    .post(`${API_URL}/api/user/register`, {
      userName,
      password,
      password2,
    })
    .then((response) => {
      if (response.status === 200) {
        return true;
      } else {
        return false;
      }
    })
    .catch((error) => {
      return false;
    });
}
