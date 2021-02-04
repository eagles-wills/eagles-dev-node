import {
  ACCOUNT_DELETED,
  CLEAR_PROFILE,
  GET_PROFILE,
  PROFILE_ERROR,
} from "./types";
import axios from "axios";
import { setAlert } from "./alertActions";
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/v1/profile/me");

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const createProfile = (formData, history, edit = false) => async (
  dispatch
) => {
  try {
    const config = { headers: { "Content-Type": "application/json" } };
    const res = await axios.post("/api/v1/profile", formData, config);
    console.log(res);

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert(edit ? "profile updated" : "profile created", "success"));

    if (!edit) {
      history.push("/dashboard");
    }
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    console.log(err);
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const addExperience = (formData, history) => async (dispatch) => {
  console.log(formData);
  try {
    const config = { headers: { "Content-Type": "application/json" } };
    const res = await axios.post(
      "/api/v1/profile/experience",
      formData,
      config
    );
    console.log(res);
    history.push("/dashboard");
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    console.log(err);
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
export const addEducation = (formData, history) => async (dispatch) => {
  console.log(formData);
  try {
    const config = { headers: { "Content-Type": "application/json" } };
    const res = await axios.post("/api/v1/profile/education", formData, config);
    console.log(res);
    history.push("/dashboard");
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    console.log(err);
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const deleteExperience = (id) => async (dispatch) => {
  try {
    let res = await axios.delete(`/api/v1/profile/experience/${id}`);
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("Experience Deleted", "Success"));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
export const deleteEducation = (id) => async (dispatch) => {
  try {
    let res = await axios.delete(`/api/v1/profile/education/${id}`);
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("Education Deleted", "Success"));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
export const deleteAccount = () => async (dispatch) => {
  if (
    window.confirm(
      "Are You Sure You Want To Delete Your Accout ?, It cannot Be undone"
    )
  ) {
    try {
      let res = await axios.delete(`/api/v1/profile`);
      console.log(res);
      dispatch({
        type: CLEAR_PROFILE,
      });
      dispatch({
        type: ACCOUNT_DELETED,
      });

      dispatch(setAlert("Account Permanently Deleted", "Success"));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};
