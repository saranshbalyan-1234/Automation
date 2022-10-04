import React from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Dropdown, Menu } from "antd";
import ProfileMenu from "./ProfileMenu";
import { useNavigate } from "react-router-dom";
const { Header } = Layout;

export default function Headers({ setCollapsed, collapsed }) {
  const navigate = useNavigate();

  const ProjectMenu = (
    <Menu
      items={[
        {
          key: "1",
          label: (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.antgroup.com"
            >
              1st menu item
            </a>
          ),
        },
        {
          key: "2",
          label: (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.aliyun.com"
            >
              2nd menu item
            </a>
          ),
        },
        {
          key: "3",
          label: (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.luohanacademy.com"
            >
              3rd menu item
            </a>
          ),
        },
      ]}
    />
  );

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

          <div onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </div>
        </div>
        <Dropdown overlay={ProjectMenu} arrow>
          <div
            style={{ color: "white", cursor: "pointer", marginTop: "-60px" }}
          >
            Project: Lucy
          </div>
        </Dropdown>
        <div style={{ marginRight: "20px", marginTop: "-60px" }}>
          <ProfileMenu />
        </div>
      </div>
    </Header>
  );
}
