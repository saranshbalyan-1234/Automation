import {
  ADD_USER_REQUEST,
  ADD_USER_SUCCESS,
  ADD_USER_FAILURE,
} from "../Actions/action-types";

const initState = {
  loading: false,
  user: null,
};

const userReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case ADD_USER_REQUEST:
      return {
        ...state,
        loading: true,
        user: null,
      };
    case ADD_USER_SUCCESS:
      return {
        ...state,
        loading: true,
        user: null,
      };

    case ADD_USER_FAILURE:
      return {
        ...state,
        loading: true,
        user: null,
      };

    default:
      return state;
  }
};

export default userReducer;
