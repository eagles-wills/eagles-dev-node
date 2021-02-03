import axios from "axios";
import { setAuthToken } from "../token/setToken";
import { setAlert } from "./alertActions";
import {
  AUTH_ERROR,
  LOAD_USER,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
} from "./types";
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    let res = await axios.get("/api/v1/auth");
    console.log(res);
    dispatch({
      type: LOAD_USER,
      payload: res.data,
    });
  } catch (err) {
    console.log(err.response);
    dispatch({ type: AUTH_ERROR });
  }
};
export const register = ({ name, email, password }) => async (dispatch) => {
  const config = { headers: { "Content-Type": "application/json" } };
  const body = JSON.stringify({ name, email, password });
  try {
    const res = await axios.post("/api/v1/user", body, config);
    if (res.data) {
      dispatch(setAlert("Registration Successful", "success"));
    }
    console.log(res.data);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({ type: REGISTER_FAIL });
  }
};
export const login = (email, password) => async (dispatch) => {
  const config = { headers: { "Content-Type": "application/json" } };
  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post("/api/v1/auth", body, config);
    if (res.data) {
      dispatch(setAlert("Login Successful", "success"));
    }
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({ type: LOGIN_FAIL });
  }
};
