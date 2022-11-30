import {
  ENVIRONMENT_REQUEST,
  ENVIRONMENT_FAILURE,
  GET_ALL_ENVIRONMENT,
  DELETE_ENVIRONMENT,
  ADD_ENVIRONMENT,
  ADD_COLUMN,
} from "../Actions/action-types";

const initState = {
  loading: false,
  data: [],
};

const environmentReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case ENVIRONMENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ENVIRONMENT_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case GET_ALL_ENVIRONMENT:
      return {
        ...state,
        data: payload,
        loading: false,
      };
    case ADD_ENVIRONMENT:
      return {
        ...state,
        loading: false,
        data: [...state.data, payload],
      };
    case ADD_COLUMN:
      let addedColumn = [...state.data].map((el) => {
        let temp = { ...el };
        temp[payload] = null;
        return temp;
      });
      return { ...state, loading: false, data: addedColumn };
    case DELETE_ENVIRONMENT:
      let temp = [...state.data].filter((el) => el.id !== payload);
      return {
        ...state,
        loading: false,
        data: temp,
      };

    default:
      return state;
  }
};

export default environmentReducer;
