import axios from "axios";
import { setAlert } from "./alertActions";
import {
  ADD_COMMENT,
  ADD_POST,
  DELETE_POST,
  GET_POST,
  GET_POST_ID,
  POST_ERROR,
  UPDATE_LIKES,
} from "./types";

// get post
export const getPost = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/api/v1/post");
    dispatch({ type: GET_POST, payload: data });
  } catch (err) {
    console.log(err.response);

    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};
export const getPostById = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/v1/post/${id}`);
    dispatch({ type: GET_POST_ID, payload: data });
  } catch (err) {
    console.log(err.response);

    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};
export const addPost = (formData) => async (dispatch) => {
  try {
    const config = { headers: { "Content-Type": "application/json" } };
    const res = await axios.post("/api/v1/post", formData, config);
    dispatch({ type: ADD_POST, payload: res.data });
    dispatch(setAlert("Post Created", "Success"));
  } catch (err) {
    console.log(err.response);
    const errors = err.response.data.errors;
    if (errors) {
      return errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};
// update like
export const addLike = (id) => async (dispatch) => {
  try {
    const { data } = await axios.put(`/api/v1/post/likes/${id}`);
    console.log(data);
    dispatch({ type: UPDATE_LIKES, payload: { id, likes: data } });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};
export const removeLike = (id) => async (dispatch) => {
  try {
    const { data } = await axios.put(`/api/v1/post/unlikes/${id}`);

    dispatch({ type: UPDATE_LIKES, payload: { id, likes: data } });
    console.log(data);
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};
export const deletePost = (id) => async (dispatch) => {
  try {
    const { data } = await axios.delete(`/api/v1/post/${id}`);
    console.log(data);
    dispatch({ type: DELETE_POST, payload: id });
    dispatch(setAlert("post deleted successfully", "success"));
  } catch (err) {
    console.log(err.response);
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

export const addComment = (postId, formData) => async (dispatch) => {
  try {
    const config = { headers: { "Content-Type": "application/json" } };
    const res = await axios.put(
      `/api/v1/post/comment/${postId}`,
      formData,
      config
    );
    console.log(res);
    dispatch({ type: ADD_COMMENT, payload: res.data });
    dispatch(setAlert("Comment Created", "Success"));
  } catch (err) {
    console.log(err.response);
    const errors = err.response.data.errors;
    if (errors) {
      return errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};
export const deleteComment = (postId, commentId) => async (dispatch) => {
  try {
    const { data } = await axios.delete(
      `/api/v1/post/comment/${postId}/${commentId}`
    );
    console.log(data);
    dispatch({ type: ADD_COMMENT, payload: commentId });
    dispatch(setAlert("Comment Deleted", "Success"));
  } catch (err) {
    console.log(err.response);
    const errors = err.response.data.errors;
    if (errors) {
      return errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};
