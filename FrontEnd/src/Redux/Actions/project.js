import axios from "axios";
import {
  PROJECT_REQUEST,
  PROJECT_FAILURE,
  GET_ALL_PROJECT_SUCCESS,
  ADD_PROJECT_SUCCESS,
  GET_SELECTED_PROJECT,
} from "./action-types";

export const getAllProject = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({ type: PROJECT_REQUEST });
      const { data } = await axios.get(`/project`, payload);
      dispatch({ type: GET_ALL_PROJECT_SUCCESS, payload: data });
      return data;
    } catch (err) {
      dispatch({ type: PROJECT_FAILURE });
      return false;
    }
  };
};
export const addProject = (payload) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: PROJECT_REQUEST });
      const { data } = await axios.post(`/project`, payload);
      let user = getState().auth.user;
      let newProject = { ...data, createdBy: user, members: [user] };
      dispatch({ type: ADD_PROJECT_SUCCESS, payload: newProject });
      return true;
    } catch (err) {
      dispatch({ type: PROJECT_REQUEST });
      return false;
    }
  };
};

export const getProjectById = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: PROJECT_REQUEST });
      const { data } = await axios.get(`/project/${id}`);
      dispatch({ type: GET_SELECTED_PROJECT, payload: data });
      return true;
    } catch (err) {
      dispatch({ type: PROJECT_REQUEST });
      return false;
    }
  };
};
