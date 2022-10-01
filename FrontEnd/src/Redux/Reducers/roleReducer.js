import {
  ROLE_REQUEST,
  ROLE_SUCCESS,
  ROLE_FAILURE,
  DELETE_ROLE_SUCCESS,
} from "../Actions/action-types";

const initState = {
  loading: false,
  data: [],
};

const roleReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case ROLE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ROLE_SUCCESS:
      return {
        ...state,
        data: payload,
        loading: false,
      };
    case ROLE_FAILURE:
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
    default:
      return state;
  }
};

export default roleReducer;
