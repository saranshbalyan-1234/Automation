import axios from "axios";
import {
  ADD_USER,
  ADD_USER_FAILURE,
  ADD_USER_REQUEST,
  ADD_USER_SUCCESS,
  UPDATE_USER_DETAIL,
  UPDATE_USER_DETAIL_FAILURE,
  UPDATE_USER_DETAIL_REQUEST,
  UPDATE_USER_DETAIL_SUCCESS,
} from "./action-types";

export const addUser = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({ type: ADD_USER_REQUEST });
      await axios.post(`/user/add`, payload);
      dispatch({ type: ADD_USER_SUCCESS, payload });
      return true;
    } catch (err) {
      dispatch({ type: ADD_USER_FAILURE });
      return false;
    }
  };
};

export const changePassword = (payload) => {
  return async (dispatch) => {
    try {
      await axios.put(`/user/change-password`, payload);
      return true;
    } catch (err) {
      return false;
    }
  };
};
export const editDetails = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({ type: UPDATE_USER_DETAIL_REQUEST });
      await axios.put(`/user/details`, payload);
      dispatch({ type: UPDATE_USER_DETAIL_SUCCESS, payload });
      return true;
    } catch (err) {
      dispatch({ type: UPDATE_USER_DETAIL_FAILURE });
      return false;
    }
  };
};
