import axios from "axios";
import {
  SIGNIN_REQUEST,
  SIGNIN_SUCCESS,
  SIGNIN_FAILURE,
  LOGOUT,
  UPDATE_USER_DETAIL,
} from "./action-types";

import { message } from "antd";

export const signIn = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({ type: SIGNIN_REQUEST });
      const { data } = await axios.post(`/auth/login`, payload);
      message.success("Logged In Successfully");
      dispatch({ type: SIGNIN_SUCCESS, payload: data });
      return true;
    } catch (err) {
      dispatch({ type: SIGNIN_FAILURE });
      return false;
    }
  };
};

export const register = (payload) => {
  return async (dispatch) => {
    try {
      await axios.post(`/auth/register`, payload);
      message.success(
        "Registered successfuly, Please check email to verify account."
      );
      return true;
    } catch (err) {
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
      await axios.put(`/user/details`, payload);
      dispatch({ type: UPDATE_USER_DETAIL, payload });
      return true;
    } catch (err) {
      return false;
    }
  };
};
