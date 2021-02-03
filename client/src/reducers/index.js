import { combineReducers } from "redux";
import setAlert from "./alert";
import auth from "./auth";
import profile from "./profile";
export default combineReducers({ setAlert, auth, profile });
