import {
  CLEAR_PROFILE,
  GET_PROFILE,
  GET_PROFILES,
  GET_REPOS,
  PROFILE_ERROR,
} from "../actions/types";

const initState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {},
};

const profile = (state = initState, { type, payload }) => {
  switch (type) {
    case GET_PROFILE:
      return { ...state, profile: payload, loading: false };
    case GET_PROFILES:
      return { ...state, profiles: payload, loading: false };
    case GET_REPOS:
      return { ...state, loading: false, repos: payload };
    case PROFILE_ERROR:
      return { ...state, loading: false, error: payload };
    case CLEAR_PROFILE:
      return { ...state, loading: false, profile: null, repos: [] };
    default:
      return state;
  }
};
export default profile;
