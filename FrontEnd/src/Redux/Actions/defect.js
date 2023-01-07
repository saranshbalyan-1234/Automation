import axios from "axios";
import {
  DEFECT_REQUEST,
  DEFECT_FAILURE,
  GET_ALL_DEFECT,
  ADD_DEFECT,
  EDIT_DEFECT,
  DELETE_DEFECT,
  GET_SELECTED_DEFECT,
  GET_DEFECT_SETTING,
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
export const getDefectById = (defectId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: DEFECT_REQUEST });
      const { data } = await axios.get(`/defect/${defectId}`);
      dispatch({ type: GET_SELECTED_DEFECT, payload: data });
      return true;
    } catch (err) {
      dispatch({ type: DEFECT_FAILURE });
      return false;
    }
  };
};

export const getDefectSetting = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: DEFECT_REQUEST });
      const { data } = await axios.get(`/defect/settings`);
      dispatch({ type: GET_DEFECT_SETTING, payload: data });
      return true;
    } catch (err) {
      dispatch({ type: DEFECT_FAILURE });
      return false;
    }
  };
};

export const saveDefect = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({ type: DEFECT_REQUEST });
      const { data } = await axios.post(`/defect`, payload);
      dispatch({ type: ADD_DEFECT, payload: data });
      return data;
    } catch (err) {
      console.log(err);
      dispatch({ type: DEFECT_FAILURE });
      return false;
    }
  };
};
