import axios from "axios";
import {
  TEST_CASE_REQUEST,
  TEST_CASE_FAILURE,
  GET_ALL_TEST_CASE,
  CREATE_TEST_CASE,
  UPDATE_CURRENT_TEST_CASE,
  DELETE_TEST_CASE,
  GET_TEST_CASE_BY_ID,
} from "./action-types";
import { message } from "antd";

export const getTestCaseByProject = (payload) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: TEST_CASE_REQUEST });
      let currentProjectId = getState().projects.currentProject.id;
      const { data } = await axios.get(`/testcase/project/${currentProjectId}`);
      dispatch({ type: GET_ALL_TEST_CASE, payload: data });
      return true;
    } catch (err) {
      dispatch({ type: TEST_CASE_FAILURE });
      return false;
    }
  };
};

export const saveTestCase = (payload) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: TEST_CASE_REQUEST });
      const { data } = await axios.post(`/testcase`, payload);
      const updatedTestCase = {
        ...data,
        createdBy: getState().auth.user,
      };
      dispatch({ type: CREATE_TEST_CASE, payload: updatedTestCase });
      return true;
    } catch (err) {
      console.log(err);
      dispatch({ type: TEST_CASE_FAILURE });
      return false;
    }
  };
};

export const editTestCase = (payload) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: TEST_CASE_REQUEST });

      let currentTestCaseId = getState().testCase.currentTestCase?.id;
      let editedTestCase = { ...payload };

      await axios.put(`/testcase/${currentTestCaseId}`, payload);
      dispatch({
        type: UPDATE_CURRENT_TEST_CASE,
        payload: { data: editedTestCase, testCaseId: currentTestCaseId },
      });

      return true;
    } catch (err) {
      console.log(err);
      dispatch({ type: TEST_CASE_FAILURE });
      return false;
    }
  };
};

export const deleteTestCase = (testCaseId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: TEST_CASE_REQUEST });

      await axios.delete(`testCase/${testCaseId}`);
      dispatch({ type: DELETE_TEST_CASE, payload: testCaseId });
      return true;
    } catch (err) {
      dispatch({ type: TEST_CASE_FAILURE });
      return false;
    }
  };
};
export const getTestCaseById = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: TEST_CASE_REQUEST });
      const { data } = await axios.get(`/testcase/${id}`);
      dispatch({ type: GET_TEST_CASE_BY_ID, payload: data });
      return true;
    } catch (err) {
      dispatch({ type: TEST_CASE_FAILURE });
      return false;
    }
  };
};
