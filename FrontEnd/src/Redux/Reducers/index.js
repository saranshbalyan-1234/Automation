import authReducer from "./authReducer";
import { combineReducers } from "redux";
import teamReducer from "./teamReducer";
import roleReducer from "./roleReducer";

export default combineReducers({
  auth: authReducer,
  team: teamReducer,
  roles: roleReducer,
});
