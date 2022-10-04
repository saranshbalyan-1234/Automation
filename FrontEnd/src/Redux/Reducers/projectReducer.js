import {
  PROJECT_REQUEST,
  PROJECT_FAILURE,
  GET_ALL_PROJECT_SUCCESS,
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
    default:
      return state;
  }
};

export default projectReducer;
