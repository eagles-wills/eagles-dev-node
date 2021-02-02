import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducers from "./reducers";
const middleware = [thunk];
const initState = {};

const store = createStore(
  rootReducers,
  initState,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
