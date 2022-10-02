import axios from "axios";
import {
  TEAM_REQUEST,
  TEAM_FAILURE,
  GET_TEAM_SUCCESS,
  ADD_TEAM_MEMBER_SUCCESS,
  REMOVE_TEAM_MEMBER_SUCCESS,
  TOGGLE_TEAM_USER_STATUS,
} from "./action-types";

export const getTeam = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({ type: TEAM_REQUEST });
      const { data } = await axios.get(`/user/team`, payload);
      dispatch({ type: GET_TEAM_SUCCESS, payload: data });
      return true;
    } catch (err) {
      dispatch({ type: TEAM_FAILURE });
      return false;
    }
  };
};
export const addTeamMember = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({ type: TEAM_REQUEST });
      await axios.post(`/user/add`, payload);
      dispatch({ type: ADD_TEAM_MEMBER_SUCCESS, payload });
      return true;
    } catch (err) {
      dispatch({ type: TEAM_FAILURE });
      return false;
    }
  };
};
export const removeTeamMember = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({ type: TEAM_REQUEST });
      await axios.delete(`/user/${payload}`, payload);
      dispatch({ type: REMOVE_TEAM_MEMBER_SUCCESS, payload });
      return true;
    } catch (err) {
      dispatch({ type: TEAM_FAILURE });
      return false;
    }
  };
};
export const toggleUserActiveInactive = (status, userId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: TEAM_REQUEST });
      await axios.put(`/user/${userId}/status`, { active: status });
      dispatch({ type: TOGGLE_TEAM_USER_STATUS, payload: { userId, status } });
      return true;
    } catch (err) {
      dispatch({ type: TEAM_FAILURE });
      return false;
    }
  };
};
