import {
  REUSABLE_FLOW_REQUEST,
  REUSABLE_FLOW_FAILURE,
  GET_ALL_REUSABLE_FLOW,
  CREATE_REUSABLE_FLOW,
  UPDATE_CURRENT_REUSABLE_FLOW,
  DELETE_REUSABLE_FLOW,
  GET_REUSABLE_FLOW_DETAILS_BY_ID,
  GET_REUSABLE_FLOW_STEPS_BY_ID,
  ADD_REUSABLE_STEP,
  DELETE_REUSABLE_STEP,
} from "../Actions/action-types";
import { orderBy } from "lodash";
const initState = {
  loading: false,
  data: [],
  currentReusableFlow: { testSteps: [] },
};

const reusableFlowReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case REUSABLE_FLOW_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_ALL_REUSABLE_FLOW:
      return {
        ...state,
        data: payload,
        loading: false,
      };
    case REUSABLE_FLOW_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case DELETE_REUSABLE_FLOW:
      let temp = [...state.data].filter((el) => el.id !== payload);
      return {
        ...state,
        loading: false,
        data: temp,
      };
    case CREATE_REUSABLE_FLOW:
      return {
        ...state,
        loading: false,
        data: [...state.data, payload],
      };
    case UPDATE_CURRENT_REUSABLE_FLOW:
      return {
        ...state,
        loading: false,
        currentReusableFlow: {
          ...state.currentReusableFlow,
          ...payload,
        },
      };
    case GET_REUSABLE_FLOW_DETAILS_BY_ID:
      return {
        ...state,
        currentReusableFlow: { ...payload, testSteps: [] },
        loading: false,
      };
    case GET_REUSABLE_FLOW_STEPS_BY_ID:
      return {
        ...state,
        currentReusableFlow: {
          ...state.currentReusableFlow,
          testSteps: payload,
        },
        loading: false,
      };
    case ADD_REUSABLE_STEP:
      const editedStep = [
        ...[...state.currentReusableFlow.testSteps].map((step) => {
          return step.step >= payload.step
            ? { ...step, step: step.step + 1 }
            : step;
        }),
        payload,
      ];

      const orderedStepProcess = orderBy([...editedStep], ["step"], ["asc"]);

      return {
        ...state,
        currentReusableFlow: {
          ...state.currentReusableFlow,
          testSteps: orderedStepProcess,
        },
        loading: false,
      };
    case DELETE_REUSABLE_STEP:
      const deletedStep = [...state.currentReusableFlow.testSteps]
        .filter((step) => {
          return step.id !== payload.testStepId;
        })
        .map((el) => {
          return el.step > payload.step ? { ...el, step: el.step - 1 } : el;
        });

      return {
        ...state,
        currentReusableFlow: {
          ...state.currentReusableFlow,
          testSteps: deletedStep,
        },
        loading: false,
      };
    default:
      return state;
  }
};

export default reusableFlowReducer;
