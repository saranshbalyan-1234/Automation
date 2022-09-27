import { message } from "antd";
export const getError = (err) => {
  err.response.data.errors.map((el) => {
    return message.error(el);
  });
};
