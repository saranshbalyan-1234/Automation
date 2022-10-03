import authReducer from "./authReducer";
import { combineReducers } from "redux";
import teamReducer from "./teamReducer";
import roleReducer from "./roleReducer";
import projectReducer from "./projectReducer";
export default combineReducers({
  auth: authReducer,
  team: teamReducer,
  roles: roleReducer,
  projects: projectReducer,
});
