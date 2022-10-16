import {
  TEST_CASE_REQUEST,
  GET_ALL_TEST_CASE,
  TEST_CASE_FAILURE,
  DELETE_TEST_CASE,
  CREATE_TEST_CASE,
  UPDATE_CURRENT_TEST_CASE,
  GET_TEST_CASE_BY_ID,
} from "../Actions/action-types";

const initState = {
  loading: false,
  data: [],
  currentTestCase: {},
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
    case DELETE_TEST_CASE:
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
    case UPDATE_CURRENT_TEST_CASE:
      const updatedTestCase = payload.data;
      return {
        ...state,
        loading: false,
        currentTestCase: { ...state.currentTestCase, ...updatedTestCase },
      };
    case GET_TEST_CASE_BY_ID:
      return {
        ...state,
        currentTestCase: payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default testCaseReducer;
