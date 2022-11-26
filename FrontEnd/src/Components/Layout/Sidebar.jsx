import React, { useEffect, useState } from "react";
import {
  DashboardOutlined,
  FileOutlined,
  BankOutlined,
} from "@ant-design/icons";
import { VscDebugRestart } from "react-icons/vsc";
import { Layout, Menu } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
const { Sider } = Layout;
export default function Sidebar({ collapsed, setCollapsed }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedMenu, setSelectedMenu] = useState("Dashboard");

  useEffect(() => {
    let temp = location.pathname.split("/");
    location.pathname.length > 1
      ? setSelectedMenu(temp[1])
      : setSelectedMenu("Dashboard");
  }, [location.pathname]);

  const handleMenuClick = (data) => {
    const path = data.keyPath.reverse().join("/");
    path === "Dashboard" ? navigate(`/`) : navigate(`/${path}`);
  };

  const items = [
    { label: "Dashboard", key: "Dashboard", icon: <DashboardOutlined /> }, // remember to pass the key prop

    { label: "Test Case", key: "TestCase", icon: <FileOutlined /> },
    {
      label: "Reusable Process",
      key: "ReusableProcess",
      icon: <VscDebugRestart />,
    },
    { label: " Object Bank", key: "ObjectBank", icon: <BankOutlined /> },
  ];

  return (
    <Sider
      trigger={null}
      collapsible
      defaultCollapsed={true}
      collapsed={collapsed}
      breakpoint="lg"
      // collapsedWidth={window.innerWidth < 720 ? 0 : 80}
      onBreakpoint={(broken) => {}}
      onMouseEnter={() => {
        setCollapsed(false);
      }}
      onMouseLeave={() => {
        setCollapsed(true);
      }}
    >
      <div>
        {collapsed ? (
          <img
            alt="logo"
            src="https://qualitycuredmain.s3.ap-south-1.amazonaws.com/Public/Logo/QDIconWhite.svg"
            className="logo"
            style={{
              height: "38px",
              width: "50px",
              cursor: "pointer",
            }}
            onClick={() => {
              navigate("/");
            }}
          />
        ) : (
          <img
            alt="logo"
            src="https://qualitycuredmain.s3.ap-south-1.amazonaws.com/Public/Logo/QDFullWhite.svg"
            className="logo"
            style={{
              height: "38px",
              width: "150px",
              cursor: "pointer",
            }}
            onClick={() => {
              navigate("/");
            }}
          />
        )}
      </div>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={selectedMenu}
        style={{ marginTop: "-4px" }}
        onClick={handleMenuClick}
        items={items}
      />
      ;
    </Sider>
  );
}
