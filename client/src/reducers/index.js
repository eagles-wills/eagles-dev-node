import { combineReducers } from "redux";
import setAlert from "./alert";
import auth from "./auth";
import profile from "./profile";
import post from "./post";
export default combineReducers({ setAlert, auth, profile, post });
