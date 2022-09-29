import React from "react";
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
export default function ErrorPage({ status, title, subTitle }) {
  const navigate = useNavigate();
  return (
    <Result
      status={status}
      title={title}
      subTitle={subTitle}
      extra={
        <Button
          onClick={() => {
            navigate("/");
          }}
          type="primary"
        >
          Back Home
        </Button>
      }
    />
  );
}
