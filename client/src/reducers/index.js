import { combineReducers } from "redux";
import setAlert from "./alert";
import auth from "./auth";
export default combineReducers({ setAlert, auth });
