import {
  TEST_CASE_REQUEST,
  GET_ALL_TEST_CASE,
  TEST_CASE_FAILURE,
  DELETE_ROLE_SUCCESS,
  CREATE_TEST_CASE,
  EDIT_ROLE_SUCCESS,
  UPDATE_ROLE_PERMISSION_SUCCESS,
} from "../Actions/action-types";

const initState = {
  loading: false,
  data: [],
};

const testCaseReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case TEST_CASE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_ALL_TEST_CASE:
      return {
        ...state,
        data: payload,
        loading: false,
      };
    case TEST_CASE_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case DELETE_ROLE_SUCCESS:
      let temp = [...state.data].filter((el) => el.id !== payload);
      return {
        ...state,
        loading: false,
        data: temp,
      };
    case CREATE_TEST_CASE:
      return {
        ...state,
        loading: false,
        data: [...state.data, payload],
      };
    case EDIT_ROLE_SUCCESS:
      let editedRoles = [...state.data].map((el) => ({
        ...el,
        name: el.id === payload.id ? payload.name : el.name,
      }));
      return {
        ...state,
        loading: false,
        data: editedRoles,
      };
    case UPDATE_ROLE_PERMISSION_SUCCESS:
      let tempUpdatedRole = [...state.data].map((el) => {
        return el.id === payload.roleId
          ? { ...el, permissions: payload.data }
          : el;
      });

      return {
        ...state,
        loading: false,
        data: tempUpdatedRole,
      };
    default:
      return state;
  }
};

export default testCaseReducer;
