import { Card } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
export default function Documentation() {
  const navigate = useNavigate();

  const data = [
    {
      title: "Basic Product",
      link: "/documentation/basic",
      description: (
        <>
          <div>Know basics about our product.</div>
          <br />
          <div>How it works and some basic terminology</div>
        </>
      ),
    },
    {
      title: "Settings",
      link: "/documentation/settings",
      description: (
        <>
          <div>Know about user Settings</div>
          <br />
          <div>Customer, User, Roles, Permissions</div>
        </>
      ),
    },
    {
      title: "Execution",
      link: "/documentation/execution",
      description: (
        <>
          <div>Everything about Executions!</div>
          <br />
          <div>Executions and Histories</div>
        </>
      ),
    },
    {
      title: "Action Keywords",
      link: "/documentation/actionKeywords",
      description: (
        <>
          <div>We support over 100 Action Keywords.</div>
          <br />
          <div>Know each one of them in detail!</div>
        </>
      ),
    },
  ];
  return (
    <div style={{ display: "flex", gap: 20, paddingTop: 20, flexWrap: "wrap" }}>
      {data.map((el) => {
        return (
          <Card
            bordered
            hoverable
            onClick={() => {
              navigate(el.link);
            }}
            style={{ width: 400 }}
          >
            <Card.Meta title={el.title} description={el.description} />
          </Card>
        );
      })}
    </div>
  );
}
