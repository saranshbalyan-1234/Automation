import React from "react";
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
export default function ErrorPage({ status, title, subTitle, showBtn = true }) {
  const navigate = useNavigate();
  return (
    <Result
      style={{ paddingTop: "10px" }}
      status={status}
      title={title}
      subTitle={subTitle}
      extra={
        showBtn && (
          <Button
            onClick={() => {
              navigate("/");
            }}
            type="primary"
          >
            Back Home
          </Button>
        )
      }
    />
  );
}
