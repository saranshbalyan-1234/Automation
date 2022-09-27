import React from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout } from "antd";
import ProfileMenu from "./ProfileMenu";
const { Header } = Layout;

export default function Headers({ setCollapsed, collapsed }) {
  return (
    <Header
      className="site-layout-sub-header-background"
      style={{ padding: 0 }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          // paddingTop: "15px",
        }}
      >
        <div>
          {collapsed ? (
            <img
              alt="logo"
              src="/Logo/iconlogo.svg"
              className="logo"
              style={{
                height: "20px",
                width: "50px",
                marginTop: collapsed && "26px",
              }}
            />
          ) : (
            <img
              alt="logo"
              src="/Logo/logo.svg"
              className="logo"
              style={{
                height: "35px",
                width: "150px",
              }}
            />
          )}
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger iconWhite",
              onClick: () => setCollapsed(!collapsed),
              // style: { marginLeft: !collapsed && "30px" },
            }
          )}
        </div>
        <ProfileMenu />
      </div>
    </Header>
  );
}
