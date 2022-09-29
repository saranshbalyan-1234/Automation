import React from "react";
import { HomeOutlined } from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import { Breadcrumb, PageHeader } from "antd";
import { ImLocation } from "react-icons/im";

export default function Container({ children }) {
  const location = useLocation();

  const breadcrumbNameMap = {
    "/setting": "Settings",
  };

  const pathSnippets = location.pathname.split("/").filter((i) => i);

  const extraBreadcrumbItems = pathSnippets.map((value, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
    return (
      <Breadcrumb.Item key={url}>
        <a
          style={{ textTransform: "capitalize" }}
          href={() => {
            return false;
          }}
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
      <div className="site-layout-background">
        {" "}
        <PageHeader
          onBack={() => window.history.back()}
          title={
            <div style={{ textTransform: "capitalize", display: "flex" }}>
              <ImLocation style={{ marginRight: "3px", marginTop: "5px" }} />
              <div>
                {pathSnippets.length > 0
                  ? pathSnippets[pathSnippets.length - 1]
                  : "Dashboard"}
              </div>
            </div>
          }
          className="site-page-header"
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
        className="site-layout-background"
        style={{
          padding: 24,

          minHeight: "calc(100vh - 120px)",
          marginTop: "15px",
        }}
      >
        {console.log("saransh", children)}
        {children}
      </div>
    </>
  );
}
