import axios from "axios";
import {
  TEST_CASE_REQUEST,
  TEST_CASE_FAILURE,
  GET_ALL_TEST_CASE,
  CREATE_TEST_CASE,
  UPDATE_TEST_CASE,
} from "./action-types";

export const getTestCaseByProject = (payload) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: TEST_CASE_REQUEST });
      let currentProjectId = getState().projects.currentProject.id;
      const { data } = await axios.get(`/testcase/${currentProjectId}`);
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
