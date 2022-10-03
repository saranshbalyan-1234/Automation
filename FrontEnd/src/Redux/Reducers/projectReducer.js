import { ROLE_REQUEST } from "../Actions/action-types";

const initState = {
  loading: false,
  data: [],
};

const projectReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case ROLE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default projectReducer;
