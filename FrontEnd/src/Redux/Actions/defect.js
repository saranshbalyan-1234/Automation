import axios from "axios";
import {
  DEFECT_REQUEST,
  DEFECT_FAILURE,
  GET_ALL_DEFECT,
  ADD_DEFECT,
  EDIT_DEFECT,
  DELETE_DEFECT,
} from "./action-types";

export const getAllDefects = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: DEFECT_REQUEST });
      const { data } = await axios.get(`/defect`);
      dispatch({ type: GET_ALL_DEFECT, payload: data });
      return true;
    } catch (err) {
      dispatch({ type: DEFECT_FAILURE });
      return false;
    }
  };
};
