import {
  PROJECT_REQUEST,
  PROJECT_FAILURE,
  GET_ALL_PROJECT_SUCCESS,
  ADD_PROJECT_SUCCESS,
  GET_SELECTED_PROJECT,
  REMOVE_CURRENT_PROJECT_MEMBER,
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
    case REMOVE_CURRENT_PROJECT_MEMBER:
      let removed = [...state.currentProject.members].filter((el) => {
        return el.id != payload.userId;
      });
      return {
        ...state,
        currentProject: { ...state.currentProject, members: removed },
        loading: false,
      };
    default:
      return state;
  }
};

export default projectReducer;
