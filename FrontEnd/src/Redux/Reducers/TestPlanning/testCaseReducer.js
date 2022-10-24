import {
  TEST_CASE_REQUEST,
  GET_ALL_TEST_CASE,
  TEST_CASE_FAILURE,
  DELETE_TEST_CASE,
  CREATE_TEST_CASE,
  UPDATE_CURRENT_TEST_CASE,
  GET_TEST_CASE_DETAILS_BY_ID,
  GET_TEST_CASE_STEPS_BY_ID,
  ADD_PROCESS,
  EDIT_PROCESS,
  DELETE_PROCESS,
  ADD_STEP,
  DELETE_STEP,
} from "../../Actions/action-types";
import { orderBy } from "lodash";
const initState = {
  loading: false,
  data: [],
  currentTestCase: { testProcess: [] },
};

const testCaseReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case TEST_CASE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_ALL_TEST_CASE:
      return {
        ...state,
        data: payload,
        loading: false,
      };
    case TEST_CASE_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case DELETE_TEST_CASE:
      let temp = [...state.data].filter((el) => el.id !== payload);
      return {
        ...state,
        loading: false,
        data: temp,
      };
    case CREATE_TEST_CASE:
      return {
        ...state,
        loading: false,
        data: [...state.data, payload],
      };
    case UPDATE_CURRENT_TEST_CASE:
      return {
        ...state,
        loading: false,
        currentTestCase: { ...state.currentTestCase, ...payload },
      };
    case GET_TEST_CASE_DETAILS_BY_ID:
      return {
        ...state,
        currentTestCase: { ...payload, testProcess: [] },
        loading: false,
      };
    case GET_TEST_CASE_STEPS_BY_ID:
      return {
        ...state,
        currentTestCase: { ...state.currentTestCase, testProcess: payload },
        loading: false,
      };
    case ADD_PROCESS:
      const changedStepProcess = [...state.currentTestCase.testProcess].map(
        (el) => {
          return el.step >= payload.step ? { ...el, step: el.step + 1 } : el;
        }
      );
      const orderedProcess = orderBy(
        [...changedStepProcess, { ...payload, testSteps: [] }],
        ["step"],
        ["asc"]
      );

      return {
        ...state,
        currentTestCase: {
          ...state.currentTestCase,
          testProcess: orderedProcess,
        },
        loading: false,
      };
    case EDIT_PROCESS:
      const editedProcess = [...state.currentTestCase.testProcess].map((el) => {
        const newData = payload.data;
        return el.id === payload.processId ? { ...el, ...newData } : el;
      });
      return {
        ...state,
        currentTestCase: {
          ...state.currentTestCase,
          testProcess: editedProcess,
        },
        loading: false,
      };

    case DELETE_PROCESS:
      let deletedProcess = [...state.currentTestCase.testProcess]
        .filter((el) => {
          return el.id !== payload.testProcessId;
        })
        .map((el) => {
          return el.step > payload.step ? { ...el, step: el.step - 1 } : el;
        });
      return {
        ...state,
        currentTestCase: {
          ...state.currentTestCase,
          testProcess: deletedProcess,
        },
        loading: false,
      };
    case ADD_STEP:
      const editedStep = [...state.currentTestCase.testProcess].map((el) => {
        return el.id === payload.testProcessId
          ? {
              ...el,
              testSteps: orderBy(
                [
                  ...[...el.testSteps].map((step) => {
                    return step.step >= payload.step
                      ? { ...step, step: step.step + 1 }
                      : step;
                  }),
                  payload,
                ],
                ["step"],
                ["asc"]
              ),
            }
          : el;
      });
      const orderedStepProcess = orderBy([...editedStep], ["step"], ["asc"]);

      return {
        ...state,
        currentTestCase: {
          ...state.currentTestCase,
          testProcess: orderedStepProcess,
        },
        loading: false,
      };
    case DELETE_STEP:
      const deletedStep = [...state.currentTestCase.testProcess].map((el) => {
        return el.id === payload.testProcessId
          ? {
              ...el,
              testSteps: [...el.testSteps]
                .filter((step) => {
                  return step.id !== payload.testStepId;
                })
                .map((el1) => {
                  return el1.step > payload.step
                    ? { ...el1, step: el1.step - 1 }
                    : el1;
                }),
            }
          : el;
      });

      return {
        ...state,
        currentTestCase: {
          ...state.currentTestCase,
          testProcess: deletedStep,
        },
        loading: false,
      };
    default:
      return state;
  }
};

export default testCaseReducer;
