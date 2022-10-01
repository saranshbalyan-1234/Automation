import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
export default function ComingSoon() {
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "20px",
      }}
    >
      {/* <div style={{ display: "flex", flexDirection: "column" }}> */}
      <img
        style={{ width: "20%", height: "auto", paddingTop: "5%" }}
        src="/coming-soon.svg"
        alt=""
      />
      <Button
        onClick={() => {
          navigate("/");
        }}
        type="primary"
      >
        Back Home
      </Button>
      {/* </div> */}
    </div>
  );
}
