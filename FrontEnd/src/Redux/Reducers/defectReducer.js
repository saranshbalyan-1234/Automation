import {
  DEFECT_REQUEST,
  DEFECT_FAILURE,
  GET_ALL_DEFECT,
  ADD_DEFECT,
  EDIT_DEFECT,
  DELETE_DEFECT,
  EMPTY_DEFECT,
} from "../Actions/action-types";

const initState = {
  loading: false,
  data: [],
};

const defectReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case DEFECT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DEFECT_FAILURE:
      return {
        ...state,
        loading: false,
      };

    case GET_ALL_DEFECT:
      return {
        ...state,
        data: payload,
        loading: false,
      };

    case EMPTY_DEFECT:
      return {
        loading: false,
        data: [],
      };
    default:
      return state;
  }
};

export default defectReducer;
