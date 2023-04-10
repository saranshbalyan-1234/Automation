import axios from "axios";
import {
  MACHINES_REQUEST,
  MACHINES_FAILURE,
  GET_ALL_MACHINES,
  ADD_MACHINE,
  REMOVE_MACHINE,
} from "./action-types";
export const getAllMachines = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: MACHINES_REQUEST });
      const { data } = await axios.get(`/machines`);
      dispatch({ type: GET_ALL_MACHINES, payload: data });
      return true;
    } catch (err) {
      dispatch({ type: MACHINES_FAILURE });
      return false;
    }
  };
};

export const removeMachine = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: MACHINES_REQUEST });
      await axios.delete(`/machines/${id}`);
      dispatch({ type: REMOVE_MACHINE, payload: id });
      return true;
    } catch (err) {
      dispatch({ type: MACHINES_FAILURE });
      return false;
    }
  };
};

export const addMachine = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({ type: MACHINES_REQUEST });
      const { data } = await axios.post(`/machines`, payload);
      dispatch({ type: ADD_MACHINE, payload: data });
      return data;
    } catch (err) {
      dispatch({ type: MACHINES_FAILURE });
      return false;
    }
  };
};
