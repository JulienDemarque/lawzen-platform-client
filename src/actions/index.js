import axios from "axios";
import { AUTH_USER, AUTH_ERROR } from "./types";
import { API_URL } from "../config.js";
export const signup = (formProps, callback) => async dispatch => {
  try {
    const response = await axios.post(
      `${API_URL}/signup`,
      formProps
    );
    dispatch({ type: AUTH_USER, payload: response.data });
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("username", response.data.username);
    callback();
  } catch (e) {
    console.log("error:", e);
    dispatch({ type: AUTH_ERROR, payload: "Email in use" });
  }
};

export const signin = (formProps, callback) => async dispatch => {
  try {
    const response = await axios.post(
    `${API_URL}/signin`,
      formProps
    );
    dispatch({ type: AUTH_USER, payload: response.data });
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("username", response.data.username);
    callback();
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: "Invalid login credentials" });
  }
};

export const addLaw = (formProps, callback) => async dispatch => {
  try {
    // console.log("localStorage token: ", localStorage.getItem("token"));
    const token = localStorage.getItem("token");
    const config = { headers: { authorization: token } };
    const response = await axios.post(
      `${API_URL}/law`,
      formProps,
      config
    );
    // console.log(response);
    callback();
  } catch (e) {
    console.log(e);
  }
};

export const signout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  return {
    type: AUTH_USER,
    payload: { token: "" }
  };
};
