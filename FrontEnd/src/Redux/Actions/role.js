import axios from "axios";
import {
  ROLE_REQUEST,
  ROLE_SUCCESS,
  ROLE_FAILURE,
  DELETE_ROLE_SUCCESS,
  ADD_ROLE_SUCCESS,
  EDIT_ROLE_SUCCESS,
  ADD_PERMISSION_TO_ROLE_SUCCESS,
  REMOVE_PERMISSION_FROM_ROLE_SUCCESS,
} from "./action-types";

export const getAllRole = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({ type: ROLE_REQUEST });
      const { data } = await axios.get(`/role`, payload);
      dispatch({ type: ROLE_SUCCESS, payload: data });
      return true;
    } catch (err) {
      dispatch({ type: ROLE_FAILURE });
      return false;
    }
  };
};

export const deleteRole = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: ROLE_REQUEST });
      await axios.delete(`role/${id}`);
      dispatch({ type: DELETE_ROLE_SUCCESS, payload: id });
      return true;
    } catch (err) {
      dispatch({ type: ROLE_FAILURE });
      return false;
    }
  };
};

export const addRole = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({ type: ROLE_REQUEST });
      const { data } = await axios.post(`/role`, payload);
      dispatch({ type: ADD_ROLE_SUCCESS, payload: data });
      return data;
    } catch (err) {
      dispatch({ type: ROLE_FAILURE });
      return false;
    }
  };
};

export const editRole = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({ type: ROLE_REQUEST });
      const { data } = await axios.put(`/role/${payload.id}`, {
        name: payload.name,
      });
      dispatch({ type: EDIT_ROLE_SUCCESS, payload: data });
      return true;
    } catch (err) {
      dispatch({ type: ROLE_FAILURE });
      return false;
    }
  };
};

export const addPermissionToRole = (permissions, roleId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: ROLE_REQUEST });
      const { data } = await axios.post("/permission", permissions);
      dispatch({
        type: ADD_PERMISSION_TO_ROLE_SUCCESS,
        payload: { data, roleId },
      });
      return true;
    } catch (err) {
      console.log("saransh", err);
      dispatch({ type: ROLE_FAILURE });
      return false;
    }
  };
};
export const removePermissionFromRole = (roleId, permissionId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: ROLE_REQUEST });
      const { data } = await axios.delete(`/permission/${permissionId}`);
      dispatch({
        type: REMOVE_PERMISSION_FROM_ROLE_SUCCESS,
        payload: { roleId, permissionId },
      });
      return true;
    } catch (err) {
      console.log("saransh", err);
      dispatch({ type: ROLE_FAILURE });
      return false;
    }
  };
};
