import {
  ACCOUNT_DELETED,
  AUTH_ERROR,
  LOAD_USER,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
} from "../actions/types";

const initState = {
  token: localStorage.getItem("token"),
  loading: true,
  authenticated: false,
  user: null,
};

const auth = (state = initState, { type, payload }) => {
  switch (type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return { ...state, ...payload, authenticated: true, loading: false };
    case LOAD_USER:
      return { ...state, authenticated: true, loading: false, user: payload };
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
    case ACCOUNT_DELETED:
      localStorage.removeItem("token");
      return { ...state, token: null, authenticated: false, loading: false };
    default:
      return state;
  }
};

export default auth;
