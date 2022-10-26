import axios from "axios";
import {
  REUSABLE_FLOW_REQUEST,
  REUSABLE_FLOW_FAILURE,
  GET_ALL_TEST_OBJECT,
  DELETE_TEST_OBJECT,
  EDIT_STEP,
  OBJECT_BANK_REQUEST,
  OBJECT_BANK_FAILURE,
  GET_OBJECT_DETAILS_BY_ID,
  CREATE_TEST_OBJECT,
  UPDATE_TEST_OBJECT,
  ADD_OBJECT_LOCATOR,
  GET_OBJECT_LOCATORS,
  DELETE_OBJECT_LOCATOR,
} from "./action-types";

export const getTestObjectByProject = (payload) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: OBJECT_BANK_REQUEST });
      let currentProjectId = getState().projects.currentProject.id;
      const { data } = await axios.get(
        `/testObject/project/${currentProjectId}`
      );
      dispatch({ type: GET_ALL_TEST_OBJECT, payload: data });
      return true;
    } catch (err) {
      dispatch({ type: OBJECT_BANK_FAILURE });
      return false;
    }
  };
};

export const saveObject = (payload) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: OBJECT_BANK_REQUEST });
      const { data } = await axios.post(`/testObject`, payload);
      const updatedObject = {
        ...data,
        createdBy: getState().auth.user,
      };
      dispatch({ type: CREATE_TEST_OBJECT, payload: updatedObject });
      return true;
    } catch (err) {
      console.log(err);
      dispatch({ type: OBJECT_BANK_FAILURE });
      return false;
    }
  };
};

export const editObject = (payload) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: OBJECT_BANK_REQUEST });

      let currentObjectId = getState().objectBank.currentObject?.id;
      let editedObject = { ...payload };

      await axios.put(`/testObject/${currentObjectId}`, payload);
      dispatch({
        type: UPDATE_TEST_OBJECT,
        payload: editedObject,
      });

      return true;
    } catch (err) {
      console.log(err);
      dispatch({ type: OBJECT_BANK_FAILURE });
      return false;
    }
  };
};

export const deleteObject = (testObjectId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: OBJECT_BANK_REQUEST });

      await axios.delete(`testObject/${testObjectId}`);
      dispatch({ type: DELETE_TEST_OBJECT, payload: testObjectId });
      return true;
    } catch (err) {
      dispatch({ type: OBJECT_BANK_FAILURE });
      return false;
    }
  };
};
export const getTestObjectDetailsById = (testObjectId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: OBJECT_BANK_REQUEST });
      const { data } = await axios.get(`/testObject/${testObjectId}/details`);
      dispatch({ type: GET_OBJECT_DETAILS_BY_ID, payload: data });
      return true;
    } catch (err) {
      dispatch({ type: OBJECT_BANK_FAILURE });
      return false;
    }
  };
};

//locators

export const getObjectLocator = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: OBJECT_BANK_REQUEST });
      const { data } = await axios.get(`/testObject/${id}/locator`);
      dispatch({ type: GET_OBJECT_LOCATORS, payload: data });
      return true;
    } catch (err) {
      dispatch({ type: OBJECT_BANK_FAILURE });
      return false;
    }
  };
};

export const addObjectLocator = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({ type: OBJECT_BANK_REQUEST });
      const { data } = await axios.post(`/testObject/locator`, payload);
      dispatch({ type: ADD_OBJECT_LOCATOR, payload: data });
      return true;
    } catch (err) {
      dispatch({ type: OBJECT_BANK_FAILURE });
      return false;
    }
  };
};

export const editReusableStep = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({ type: REUSABLE_FLOW_REQUEST });
      await axios.put(`/testStep/${payload.stepId}`, payload.data);
      dispatch({ type: EDIT_STEP, payload });
      return true;
    } catch (err) {
      dispatch({ type: REUSABLE_FLOW_FAILURE });
      return false;
    }
  };
};

export const deleteLocator = (locatorId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: OBJECT_BANK_REQUEST });

      await axios.delete(`/testObject/locator/${locatorId}`);
      dispatch({
        type: DELETE_OBJECT_LOCATOR,
        payload: locatorId,
      });

      return true;
    } catch (err) {
      console.log(err);
      dispatch({ type: OBJECT_BANK_FAILURE });
      return false;
    }
  };
};
