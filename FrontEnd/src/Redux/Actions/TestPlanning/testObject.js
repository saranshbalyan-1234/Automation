import axios from "axios";
import {
  REUSABLE_FLOW_REQUEST,
  REUSABLE_FLOW_FAILURE,
  GET_ALL_TEST_OBJECT,
  CREATE_REUSABLE_FLOW,
  UPDATE_CURRENT_REUSABLE_FLOW,
  DELETE_REUSABLE_FLOW,
  GET_REUSABLE_FLOW_DETAILS_BY_ID,
  GET_REUSABLE_FLOW_STEPS_BY_ID,
  ADD_REUSABLE_STEP,
  EDIT_STEP,
  DELETE_REUSABLE_STEP,
  OBJECT_BANK_REQUEST,
  OBJECT_BANK_FAILURE,
} from "../action-types";

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

export const saveReusableFlow = (payload) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: REUSABLE_FLOW_REQUEST });
      const { data } = await axios.post(`/reusableFlow`, payload);
      const updatedReusableFlow = {
        ...data,
        createdBy: getState().auth.user,
      };
      dispatch({ type: CREATE_REUSABLE_FLOW, payload: updatedReusableFlow });
      return true;
    } catch (err) {
      console.log(err);
      dispatch({ type: REUSABLE_FLOW_FAILURE });
      return false;
    }
  };
};

export const editReusableFlow = (payload) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: REUSABLE_FLOW_REQUEST });

      let currentReusableFlowId =
        getState().reusableFlow.currentReusableFlow?.id;
      let editedReusableFlow = { ...payload };

      await axios.put(`/reusableFlow/${currentReusableFlowId}`, payload);
      dispatch({
        type: UPDATE_CURRENT_REUSABLE_FLOW,
        payload: editedReusableFlow,
      });

      return true;
    } catch (err) {
      console.log(err);
      dispatch({ type: REUSABLE_FLOW_FAILURE });
      return false;
    }
  };
};

export const deleteReusableFlow = (reusableFlowId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: REUSABLE_FLOW_REQUEST });

      await axios.delete(`reusableFlow/${reusableFlowId}`);
      dispatch({ type: DELETE_REUSABLE_FLOW, payload: reusableFlowId });
      return true;
    } catch (err) {
      dispatch({ type: REUSABLE_FLOW_FAILURE });
      return false;
    }
  };
};
export const getReusableFlowDetailsById = (reusableFlowId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: REUSABLE_FLOW_REQUEST });
      const { data } = await axios.get(
        `/reusableFlow/${reusableFlowId}/details`
      );
      dispatch({ type: GET_REUSABLE_FLOW_DETAILS_BY_ID, payload: data });
      return true;
    } catch (err) {
      dispatch({ type: REUSABLE_FLOW_FAILURE });
      return false;
    }
  };
};

export const getReusableFlowStepsById = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: REUSABLE_FLOW_REQUEST });
      const { data } = await axios.get(`/reusableFlow/${id}/testSteps`);
      dispatch({ type: GET_REUSABLE_FLOW_STEPS_BY_ID, payload: data });
      return true;
    } catch (err) {
      dispatch({ type: REUSABLE_FLOW_FAILURE });
      return false;
    }
  };
};

//Step
export const addReusableStep = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({ type: REUSABLE_FLOW_REQUEST });
      const { data } = await axios.post(`/testStep`, payload);
      dispatch({ type: ADD_REUSABLE_STEP, payload: data });
      return true;
    } catch (err) {
      console.log("saransh", err);
      dispatch({ type: REUSABLE_FLOW_FAILURE });
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

export const deleteStep = (testStepId, step) => {
  return async (dispatch) => {
    try {
      dispatch({ type: REUSABLE_FLOW_REQUEST });

      await axios.delete(`/testStep/${testStepId}`);
      dispatch({
        type: DELETE_REUSABLE_STEP,
        payload: { testStepId, step },
      });

      return true;
    } catch (err) {
      console.log(err);
      dispatch({ type: REUSABLE_FLOW_FAILURE });
      return false;
    }
  };
};
