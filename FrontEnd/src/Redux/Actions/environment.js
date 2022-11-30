import axios from "axios";
import {
  ENVIRONMENT_FAILURE,
  ENVIRONMENT_REQUEST,
  GET_ALL_ENVIRONMENT,
  ADD_ENVIRONMENT,
  ADD_COLUMN,
} from "./action-types";
export const addEnvironment = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({ type: ENVIRONMENT_REQUEST });
      let { data } = await axios.post(`/environment`, payload);
      data.Environment = data.name;
      delete data.name;
      delete data.message;
      dispatch({
        type: ADD_ENVIRONMENT,
        payload: data,
      });
      return true;
    } catch (err) {
      dispatch({ type: ENVIRONMENT_FAILURE });
      return false;
    }
  };
};
export const addColumn = (payload) => {
  return async (dispatch, getState) => {
    try {
      let testCaseId = getState().testCase.currentTestCase?.id;
      dispatch({ type: ENVIRONMENT_REQUEST });
      await axios.post(`/environment/column/testCase/${testCaseId}`, payload);
      dispatch({ type: ADD_COLUMN, payload: payload.name });
      return true;
    } catch (err) {
      dispatch({ type: ENVIRONMENT_FAILURE });
      return false;
    }
  };
};
export const getAllEnvironments = (testCaseId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: ENVIRONMENT_REQUEST });
      const { data } = await axios.get(`/environment/testCase/${testCaseId}`);
      dispatch({ type: GET_ALL_ENVIRONMENT, payload: data });
      return true;
    } catch (err) {
      dispatch({ type: ENVIRONMENT_FAILURE });
      return false;
    }
  };
};
