import axios from "axios";
import { AUTH_USER, AUTH_ERROR, LAW_SUBMIT } from "./types";

export const signup = (formProps, callback) => async dispatch => {
  try {
    const response = await axios.post(
      "http://localhost:3090/signup",
      formProps
    );
    dispatch({ type: AUTH_USER, payload: response.data });
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("username", response.data.username);
    callback();
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: "Email in use" });
  }
};

export const signin = (formProps, callback) => async dispatch => {
  try {
    const response = await axios.post(
      "http://localhost:3090/signin",
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
    console.log("localStorage token: ", localStorage.getItem("token"));
    const token = localStorage.getItem("token");
    const config = { headers: { authorization: token } };

    const response = await axios.post(
      "http://localhost:3090/law",
      formProps,
      config
    );
    console.log(response);
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
