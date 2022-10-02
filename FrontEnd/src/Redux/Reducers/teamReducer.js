import {
  TEAM_REQUEST,
  TEAM_FAILURE,
  GET_TEAM_SUCCESS,
  ADD_TEAM_MEMBER_SUCCESS,
  REMOVE_TEAM_MEMBER_SUCCESS,
  TOGGLE_TEAM_USER_STATUS,
} from "../Actions/action-types";

const initState = {
  loading: false,
  data: [],
};

const teamReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case TEAM_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case TEAM_FAILURE:
      return {
        ...state,
        loading: false,
      };

    case GET_TEAM_SUCCESS:
      return {
        ...state,
        loading: false,
        data: payload,
      };
    case ADD_TEAM_MEMBER_SUCCESS:
      const { id, name, email } = payload;
      return {
        ...state,
        loading: false,
        data: [
          ...state.data,
          { id, name, email, verifiedAt: null, active: true },
        ],
      };
    case REMOVE_TEAM_MEMBER_SUCCESS:
      let temp = [...state.data].filter((el) => el.id !== payload);
      return {
        ...state,
        loading: false,
        data: temp,
      };
    case TOGGLE_TEAM_USER_STATUS:
      let updatedStatus = [...state.data].map((el) => {
        return el.id == payload.userId ? { ...el, active: payload.status } : el;
      });
      return {
        ...state,
        loading: false,
        data: updatedStatus,
      };
    default:
      return state;
  }
};

export default teamReducer;
