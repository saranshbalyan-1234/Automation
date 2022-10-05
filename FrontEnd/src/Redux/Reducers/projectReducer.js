import {
  PROJECT_REQUEST,
  PROJECT_FAILURE,
  GET_ALL_PROJECT_SUCCESS,
  ADD_PROJECT_SUCCESS,
  GET_SELECTED_PROJECT,
} from "../Actions/action-types";

const initState = {
  loading: false,
  data: [],
  currentProject: {},
};

const projectReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case PROJECT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PROJECT_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case GET_ALL_PROJECT_SUCCESS:
      return {
        ...state,
        loading: false,
        data: payload,
      };
    case ADD_PROJECT_SUCCESS:
      return {
        ...state,
        loading: false,
        data: [...state.data, payload],
      };
    case GET_SELECTED_PROJECT:
      return {
        ...state,
        currentProject: payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default projectReducer;
