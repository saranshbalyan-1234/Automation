import axios from "axios";
import { store } from "../Redux/store";

import { logout } from "../Redux/Actions/auth";
import { api_base_url } from "./constants";
import { getError } from "./error";
// eslint-disable-next-line
export default {
  setup: () => {
    axios.defaults.baseURL = api_base_url;
    function getJWT() {
      let token = store.getState().auth.user?.accessToken;
      return token;
    }
    axios.interceptors.request.use((req) => {
      if (req.url.includes("auth") || req.url.includes("jwt")) {
        //No Authorization token
      } else {
        req.headers.Authorization = `Bearer ${getJWT()}`;
      }
      return req;
    });

    axios.interceptors.response.use(
      (res) => {
        return res;
      },
      (err) => {
        let status = err.response.status;
        if (status === 401) {
          store.dispatch(logout());
        }

        // let errors = err.response.data.errors;
        let errorFormat = {
          url: err.response.config.url,
          method: err.response.config.method,
          status: err.response.status,
          data: err.response.data.errors,
        };
        getError(err);

        console.error("errorResponse", errorFormat);
        return Promise.reject(err.response.data);
      }
    );
  },
};
