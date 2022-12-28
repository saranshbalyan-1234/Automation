import axios from "axios";
import {
  GET_ALL_TEST_OBJECT,
  DELETE_TEST_OBJECT,
  OBJECT_BANK_REQUEST,
  OBJECT_BANK_FAILURE,
  GET_OBJECT_DETAILS_BY_ID,
  CREATE_TEST_OBJECT,
  UPDATE_TEST_OBJECT,
  ADD_OBJECT_LOCATOR,
  GET_OBJECT_LOCATORS,
  DELETE_OBJECT_LOCATOR,
  GET_OBJECT_LOGS,
} from "./action-types";

export const getObjectByProject = (payload) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: OBJECT_BANK_REQUEST });

      const { data } = await axios.get(`/object`);
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
      const { data } = await axios.post(`/object`, payload);
      const updatedObject = {
        ...data,
        createdBy: getState().auth.user,
      };
      dispatch({ type: CREATE_TEST_OBJECT, payload: updatedObject });
      return data;
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

      await axios.put(`/object/${currentObjectId}`, payload);
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

export const deleteObject = (objectId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: OBJECT_BANK_REQUEST });

      await axios.delete(`object/${objectId}`);
      dispatch({ type: DELETE_TEST_OBJECT, payload: objectId });
      return true;
    } catch (err) {
      dispatch({ type: OBJECT_BANK_FAILURE });
      return false;
    }
  };
};
export const getObjectDetailsById = (objectId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: OBJECT_BANK_REQUEST });
      const { data } = await axios.get(`/object/${objectId}/details`);
      dispatch({ type: GET_OBJECT_DETAILS_BY_ID, payload: data });
      return true;
    } catch (err) {
      dispatch({ type: OBJECT_BANK_FAILURE });
      return false;
    }
  };
};

export const getObjectLogsById = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: OBJECT_BANK_REQUEST });
      const { data } = await axios.get(`/object/${id}/logs`);
      dispatch({ type: GET_OBJECT_LOGS, payload: data });
      return true;
    } catch (err) {
      dispatch({ type: OBJECT_BANK_FAILURE });
      return false;
    }
  };
};

export const createObjectLogs = async (id, logs) => {
  try {
    await axios.post(`/object/${id}/logs`, { logs });
    return true;
  } catch (err) {
    return false;
  }
};

//locators

export const getObjectLocator = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: OBJECT_BANK_REQUEST });
      const { data } = await axios.get(`/object/${id}/locator`);
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
      const { data } = await axios.post(`/object/locator`, payload);
      dispatch({ type: ADD_OBJECT_LOCATOR, payload: data });
      return true;
    } catch (err) {
      dispatch({ type: OBJECT_BANK_FAILURE });
      return false;
    }
  };
};

export const deleteLocator = (locatorId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: OBJECT_BANK_REQUEST });

      await axios.delete(`/object/locator/${locatorId}`);
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
