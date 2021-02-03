import { GET_PROFILE, PROFILE_ERROR } from "../actions/types";

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
    case PROFILE_ERROR:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
};
export default profile;
