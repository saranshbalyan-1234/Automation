import React from "react";
import { HomeOutlined, LeftCircleOutlined } from "@ant-design/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Breadcrumb } from "antd";
import { PageHeader } from "@ant-design/pro-layout";
import { ImLocation } from "react-icons/im";
import styled from "styled-components";
export default function Container({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const breadcrumbNameMap = {
    "/setting": "Settings",
  };
  const renderTitle = () => {
    if (pathSnippets.length > 0) {
      if (pathSnippets.includes("project")) {
        if (pathSnippets.includes("details")) {
          return "Project Details";
        } else return pathSnippets[pathSnippets.length - 1];
      } else return pathSnippets[pathSnippets.length - 1];
    } else return "Dashboard";
  };

  const pathSnippets = location.pathname.split("/").filter((i) => i);

  const extraBreadcrumbItems = pathSnippets.map((value, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
    return (
      <Breadcrumb.Item key={url}>
        <a
          style={{ textTransform: "capitalize" }}
          // href={void 0}
        >
          {breadcrumbNameMap[url] || value}
        </a>
      </Breadcrumb.Item>
    );
  });

  const breadcrumbItems = [
    <Breadcrumb.Item key="home">
      <Link to="/">
        <HomeOutlined /> Home
      </Link>
    </Breadcrumb.Item>,
  ].concat(extraBreadcrumbItems);

  const renderBack = () => {
    const locArray = location.pathname.split("/");

    if (locArray.length > 2 && locArray[2] != "") {
      let name = "";
      if (locArray[1].toLowerCase().includes("reusableprocess")) {
        name = "Reusable Process";
      } else if (locArray[1].toLowerCase().includes("objectbank")) {
        name = "Objects";
      } else if (locArray[1].toLowerCase().includes("defect")) {
        name = "Defects";
      } else if (locArray[1].toLowerCase().includes("testcase")) {
        name = "Test Case";
      }
      return (
        <GoMainButton
          onClick={() => {
            navigate("/" + locArray[1]);
          }}
        >
          <LeftCircleOutlined />
          All {name}
        </GoMainButton>
      );
    }
  };
  return (
    <>
      <div>
        <PageHeader
          style={{ padding: "5px 15px 5px 15px", background: "#fff" }}
          // onBack={() => window.history.back()}
          title={
            <div
              style={{
                textTransform: "capitalize",
                display: "flex",
                // marginTop: "-10px",
              }}
            >
              <div>{renderBack()}</div>
              <ImLocation style={{ marginRight: "3px", marginTop: "5px" }} />
              <div>{renderTitle()}</div>
            </div>
          }
          subTitle={
            <Breadcrumb>
              {extraBreadcrumbItems.length && breadcrumbItems}
            </Breadcrumb>
          }
          // tags={<Tag color="blue">Sarance</Tag>}
          // extra={
          //   <div
          //     style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}
          //   ></div>
          // }
          // avatar={{
          //   icon: <></>,
          // }}
        ></PageHeader>
      </div>

      <div
        style={{
          padding: "0px 20px 20px 20px",
          minHeight: "calc(100vh - 120px)",
          marginTop: "10px",
          background: "#fff",
        }}
      >
        {children}
      </div>
    </>
  );
}

const GoMainButton = styled.div`
  background-color: rgb(229, 231, 235);
  border-radius: 15px;
  color: rgb(31, 63, 111);
  cursor: pointer;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
  margin-right: 10px;
  font-size: 16px;
  span {
    color: rgb(31, 63, 111);
    margin-right: 5px;
  }
`;
