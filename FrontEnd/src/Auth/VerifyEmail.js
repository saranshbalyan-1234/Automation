import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { getError } from "../Utils/error";
import { Alert } from "antd";
import ErrorPage from "../Views/ErrorPage";
export default function VerifyEmail() {
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
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
        paddingTop: 30,
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
          <>
            <Alert
              message={
                <div style={{ fontWeight: 500, fontSize: 18 }}>
                  Verifying, Please Wait!
                </div>
              }
              type="info"
              showIcon
            />
            <img
              alt="verifying"
              src="https://qualitycuredmain.s3.ap-south-1.amazonaws.com/Public/verifying.gif"
            />
          </>
        )}
      </center>
    </div>
  );
}
