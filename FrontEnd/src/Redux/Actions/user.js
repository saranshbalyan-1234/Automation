import axios from "axios";
import {
  UPDATE_USER_DETAIL_FAILURE,
  UPDATE_USER_DETAIL_REQUEST,
  UPDATE_USER_DETAIL_SUCCESS,
} from "./action-types";

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

export const uploadProfilePic = async (formData) => {
  return async (dispatch) => {
    try {
      dispatch({ type: UPDATE_USER_DETAIL_REQUEST });
      await axios.put(`/user/uploadProfileImage`, formData);
      let payload = { profileImage: true };
      dispatch({ type: UPDATE_USER_DETAIL_SUCCESS, payload });
      return true;
    } catch (err) {
      dispatch({ type: UPDATE_USER_DETAIL_FAILURE });
      return false;
    }
  };
};
