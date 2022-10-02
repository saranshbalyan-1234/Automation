import axios from "axios";
import {
  ROLE_REQUEST,
  ROLE_SUCCESS,
  ROLE_FAILURE,
  DELETE_ROLE_SUCCESS,
  ADD_ROLE_SUCCESS,
  EDIT_ROLE_SUCCESS,
  UPDATE_ROLE_PERMISSION_SUCCESS,
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
export const updateUserRole = (payload, userId) => {
  return async (dispatch) => {
    try {
      await axios.put(`/userRole/user/${userId}`, payload);
      return true;
    } catch (err) {
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

export const updateRolePermission = (permissions, roleId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: ROLE_REQUEST });
      const { data } = await axios.put(
        `role/${roleId}/permission`,
        permissions
      );
      dispatch({
        type: UPDATE_ROLE_PERMISSION_SUCCESS,
        payload: { data, roleId },
      });
      return true;
    } catch (err) {
      dispatch({ type: ROLE_FAILURE });
      return false;
    }
  };
};
