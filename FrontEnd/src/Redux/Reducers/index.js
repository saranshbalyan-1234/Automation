import authReducer from "./authReducer";
import { combineReducers } from "redux";
import userReducer from "./userReducer";

export default combineReducers({
  auth: authReducer,
  user: userReducer,
});
