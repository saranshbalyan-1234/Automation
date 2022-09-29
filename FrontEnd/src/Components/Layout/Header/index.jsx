import React from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout } from "antd";
import ProfileMenu from "./ProfileMenu";
import { useNavigate } from "react-router-dom";
const { Header } = Layout;

export default function Headers({ setCollapsed, collapsed }) {
  const navigate = useNavigate();
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
                cursor: "pointer",
              }}
              onClick={() => {
                navigate("/");
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
                cursor: "pointer",
              }}
              onClick={() => {
                navigate("/");
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
        <div style={{ marginRight: "20px" }}>
          <ProfileMenu />
        </div>
      </div>
    </Header>
  );
}
