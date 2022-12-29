import React from "react";
import { HomeOutlined } from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import { Breadcrumb } from "antd";
 import { PageHeader } from "@ant-design/pro-layout";
import { ImLocation } from "react-icons/im";

export default function Container({ children }) {
  const location = useLocation();

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

  return (
    <>
      <div>
        <PageHeader
          style={{ padding: "5px 15px 5px 15px", background: "#fff" }}
          onBack={() => window.history.back()}
          title={
            <div
              style={{
                textTransform: "capitalize",
                display: "flex",
                // marginTop: "-10px",
              }}
            >
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
