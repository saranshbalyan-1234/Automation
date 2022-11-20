import axios from "axios";
import { FETCH_IMAGE_SUCCESS } from "./action-types";

export const fetchProfileImage = (key) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post("/aws/object", {
        fileName: key,
      });
      let payload = {};
      payload[key] = data;
      dispatch({ type: FETCH_IMAGE_SUCCESS, payload });
      return true;
    } catch (err) {
      return false;
    }
  };
};
