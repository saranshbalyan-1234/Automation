import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { getError } from "../Utils/error";
import { message } from "antd";
export default function VerifyEmail() {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    message.info("Verifying, please wait!");
    axios
      .get(location.pathname)
      .then(() => {
        navigate("/signin");
      })
      .catch((err) => {
        getError(err);
      });
  }, [location.pathname, navigate]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img src="/verifying.gif" />
    </div>
  );
}
