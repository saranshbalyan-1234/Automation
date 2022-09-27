import {
  SIGNIN_REQUEST,
  SIGNIN_SUCCESS,
  SIGNIN_FAILURE,
  LOGOUT,
} from "../Actions/action-types";

const initState = {
  loading: false,
  user: null,
};

const authReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case SIGNIN_REQUEST:
      return {
        ...state,
        loading: true,
        user: null,
      };
    case SIGNIN_SUCCESS:
      return {
        ...state,
        user: payload,
        loading: false,
      };
    case SIGNIN_FAILURE:
      return {
        ...state,
        loading: false,
        user: null,
      };
    case LOGOUT:
      return {
        ...state,
        loading: false,
        user: null,
      };

    default:
      return state;
  }
};

export default authReducer;
