import { REMOVE_ALERT, SET_ALERT } from "../actions/types";

const initState = [];
const setAlert = (state = initState, { type, payload }) => {
  switch (type) {
    case SET_ALERT:
      return [...state, payload];
    case REMOVE_ALERT:
      return state.filter((item) => item.id !== payload);
    default:
      return state;
  }
};

export default setAlert;
