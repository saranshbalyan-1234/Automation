import axios from "axios";
import { store } from "../Redux/store";
import { message } from "antd";
import { logout } from "../Redux/Actions/auth";
import { api_base_url } from "./constants";

// eslint-disable-next-line
export default {
  setup: () => {
    axios.defaults.baseURL = api_base_url;
    function getJWT() {
      let token = store.getState().auth.user?.accessToken;
      return token;
    }
    function getCurrentProjectId() {
      let currentProjectId = store.getState().projects.currentProject?.id;
      return currentProjectId;
    }
    axios.interceptors.request.use((req) => {
      if (req.url.includes("auth") || req.url.includes("jwt")) {
        //No Authorization token
      } else {
        req.headers.Authorization = `Bearer ${getJWT()}`;
        req.headers["x-project-id"] = getCurrentProjectId();
      }
      return req;
    });

    axios.interceptors.response.use(
      (res) => {
        res.data.message && message.success(res.data.message);
        return res;
      },
      (err) => {
        let status = err.response.status;
        if (status === 403) {
          store.dispatch(logout());
        }
        let errorObj = err.response;
        if (errorObj.data) {
          let errorFormat = {
            url: errorObj.config.url,
            method: errorObj.config.method,
            status: errorObj.status,
            message: errorObj.data.error,
          };

          console.error("errorResponse", errorFormat);
          message.error(errorObj.data.error);
        } else {
          let errorFormat = {
            url: err.config.url,
            method: err.config.method,
            status: err.status,
            message: "Internal Server Error!",
          };
          console.error("errorResponse", errorFormat);
          message.error("Internal Server Error!");
        }

        return Promise.reject(err.response.data);
      }
    );
  },
};
