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
        res.data.message && message.success(res.data.message);
        return res;
      },
      (err) => {
        let status = err.response.status;
        if (status === 403) {
          store.dispatch(logout());
        }
        let errorObj = err.response;
        let errorFormat = {
          url: errorObj.config.url,
          method: errorObj.config.method,
          status: errorObj.status,
          message: errorObj.data.error,
        };

        console.error("errorResponse", errorFormat);
        message.error(errorObj.data.error);
        return Promise.reject(err.response.data);
      }
    );
  },
};
