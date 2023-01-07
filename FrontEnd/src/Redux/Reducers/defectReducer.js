import {
  DEFECT_REQUEST,
  DEFECT_FAILURE,
  GET_ALL_DEFECT,
  EDIT_DEFECT,
  DELETE_DEFECT,
  EMPTY_DEFECT,
  GET_DEFECT_SETTING,
  GET_SELECTED_DEFECT,
} from "../Actions/action-types";

const initState = {
  loading: false,
  data: [],
  currentDefect: {},
  setting: { status: [], priority: [], severity: [] },
};

const defectReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case DEFECT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DEFECT_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case GET_SELECTED_DEFECT:
      return {
        ...state,
        currentDefect: payload,
        loading: false,
      };
    case GET_ALL_DEFECT:
      return {
        ...state,
        data: payload,
        loading: false,
      };
    case GET_DEFECT_SETTING:
      return {
        ...state,
        setting: payload,
        loading: false,
      };
    case EMPTY_DEFECT:
      return {
        loading: false,
        data: [],
      };
    default:
      return state;
  }
};

export default defectReducer;
