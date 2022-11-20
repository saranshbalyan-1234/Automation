import { FETCH_IMAGE_SUCCESS } from "../Actions/action-types";

const initState = {};

const imageReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case FETCH_IMAGE_SUCCESS:
      return {
        ...state,
        ...payload,
      };

    default:
      return state;
  }
};

export default imageReducer;
