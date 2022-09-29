import axios from "axios";
import {
  SIGNIN_REQUEST,
  SIGNIN_SUCCESS,
  SIGNIN_FAILURE,
  LOGOUT,
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

export const sendResetPasswordMail = (payload) => {
  return async (dispatch) => {
    try {
      await axios.post(`/auth/reset-password/send-mail`, payload);
      message.info("Please check email to reset your password.");
      return true;
    } catch (err) {
      return false;
    }
  };
};

export const resetPassword = (token, password) => {
  return async (dispatch) => {
    try {
      await axios.post(`/auth/reset-password/${token}`, {
        password,
      });
      message.success("Password Reset Successfully");
      return true;
    } catch (err) {
      return false;
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    dispatch({ type: LOGOUT });
  };
};
