import axios from "axios";
import {
  PROJECT_REQUEST,
  PROJECT_FAILURE,
  GET_ALL_PROJECT_SUCCESS,
  ADD_PROJECT_SUCCESS,
} from "./action-types";

export const getAllProject = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({ type: PROJECT_REQUEST });
      const { data } = await axios.get(`/project/all`, payload);
      dispatch({ type: GET_ALL_PROJECT_SUCCESS, payload: data });
      return true;
    } catch (err) {
      dispatch({ type: PROJECT_FAILURE });
      return false;
    }
  };
};
export const addProject = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({ type: PROJECT_REQUEST });
      await axios.post(`/project`, payload);
      dispatch({ type: ADD_PROJECT_SUCCESS, payload });
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
      const { data } = await axios.post(`/project/${id}`);
      dispatch({ type: ADD_PROJECT_SUCCESS, data });
      return true;
    } catch (err) {
      dispatch({ type: PROJECT_REQUEST });
      return false;
    }
  };
};
