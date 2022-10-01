import {
  ROLE_REQUEST,
  ROLE_SUCCESS,
  ROLE_FAILURE,
  DELETE_ROLE_SUCCESS,
  ADD_ROLE_SUCCESS,
  EDIT_ROLE_SUCCESS,
  ADD_PERMISSION_TO_ROLE_SUCCESS,
  REMOVE_PERMISSION_FROM_ROLE_SUCCESS,
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
    case ADD_ROLE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: [...state.data, { ...payload, permissions: [] }],
      };
    case EDIT_ROLE_SUCCESS:
      let editedRoles = [...state.data].map((el) => ({
        ...el,
        name: el.id == payload.id ? payload.name : el.name,
      }));
      return {
        ...state,
        loading: false,
        data: editedRoles,
      };
    case REMOVE_PERMISSION_FROM_ROLE_SUCCESS:
      let tempRole = [...state.data].map((el) => {
        return el.id == payload.roleId
          ? {
              ...el,
              permissions: el.permissions.filter((el1) => {
                return el1.id != payload.permissionId;
              }),
            }
          : el;
      });

      return {
        ...state,
        loading: false,
        data: tempRole,
      };
    case ADD_PERMISSION_TO_ROLE_SUCCESS:
      let tempAddedRole = [...state.data].map((el) => {
        return el.id == payload.roleId
          ? { ...el, permissions: [...el.permissions, ...payload.data] }
          : el;
      });

      return {
        ...state,
        loading: false,
        data: tempAddedRole,
      };
    default:
      return state;
  }
};

export default roleReducer;
