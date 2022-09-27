import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { message } from "antd";
import { getError } from "../Utils/error";
export default function VerifyEmail() {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .post("/auth/" + location.pathname)
      .then(() => {
        message.success("Email Verification Successfull");
        navigate("/signin");
      })
      .catch((err) => {
        getError(err);
      });
  }, []);

  return <div>Verifying Email, Please Wait</div>;
}
