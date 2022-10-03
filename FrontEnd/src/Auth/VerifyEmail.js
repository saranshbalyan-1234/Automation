import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { getError } from "../Utils/error";
import { message } from "antd";
import ErrorPage from "../Views/ErrorPage";
export default function VerifyEmail() {
  const [error, setError] = useState("");
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
        setError(err.error);
        getError(err);
      });
  }, [location.pathname, navigate]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <center>
        {error ? (
          <ErrorPage
            status={"403"}
            title={error}
            subTitle={"Please contact your Administrator!"}
            showBtn={false}
          />
        ) : (
          <img src="/verifying.gif" />
        )}
      </center>
    </div>
  );
}
