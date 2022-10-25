import {
  GET_ALL_TEST_OBJECT,
  CREATE_TEST_OBJECT,
  UPDATE_TEST_OBJECT,
  GET_REUSABLE_FLOW_STEPS_BY_ID,
  ADD_REUSABLE_STEP,
  DELETE_REUSABLE_STEP,
  OBJECT_BANK_REQUEST,
  OBJECT_BANK_FAILURE,
  GET_OBJECT_DETAILS_BY_ID,
  DELETE_TEST_OBJECT,
} from "../../Actions/action-types";
import { orderBy } from "lodash";
const initState = {
  loading: false,
  data: [],
  currentObject: {},
};

const objectBankReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case OBJECT_BANK_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_ALL_TEST_OBJECT:
      return {
        ...state,
        data: payload,
        loading: false,
      };
    case OBJECT_BANK_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case DELETE_TEST_OBJECT:
      let temp = [...state.data].filter((el) => el.id !== payload);
      return {
        ...state,
        loading: false,
        data: temp,
      };
    case CREATE_TEST_OBJECT:
      return {
        ...state,
        loading: false,
        data: [...state.data, payload],
      };
    case UPDATE_TEST_OBJECT:
      return {
        ...state,
        loading: false,
        currentObject: {
          ...state.currentObject,
          ...payload,
        },
      };
    case GET_OBJECT_DETAILS_BY_ID:
      return {
        ...state,
        currentObject: { ...payload, testSteps: [] },
        loading: false,
      };
    case GET_REUSABLE_FLOW_STEPS_BY_ID:
      return {
        ...state,
        currentObject: {
          ...state.currentObject,
          testSteps: payload,
        },
        loading: false,
      };
    case ADD_REUSABLE_STEP:
      const editedStep = [
        ...[...state.currentObject.testSteps].map((step) => {
          return step.step >= payload.step
            ? { ...step, step: step.step + 1 }
            : step;
        }),
        payload,
      ];

      const orderedStepProcess = orderBy([...editedStep], ["step"], ["asc"]);

      return {
        ...state,
        currentObject: {
          ...state.currentObject,
          testSteps: orderedStepProcess,
        },
        loading: false,
      };
    case DELETE_REUSABLE_STEP:
      const deletedStep = [...state.currentObject.testSteps]
        .filter((step) => {
          return step.id !== payload.testStepId;
        })
        .map((el) => {
          return el.step > payload.step ? { ...el, step: el.step - 1 } : el;
        });

      return {
        ...state,
        currentObject: {
          ...state.currentObject,
          testSteps: deletedStep,
        },
        loading: false,
      };
    default:
      return state;
  }
};

export default objectBankReducer;
