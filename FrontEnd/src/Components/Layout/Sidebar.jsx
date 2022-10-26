import React, { useEffect, useState } from "react";
import {
  CopyOutlined,
  DashboardOutlined,
  AlertOutlined,
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
      ? setSelectedMenu(temp[temp.length - 1])
      : setSelectedMenu("Dashboard");
  }, [location.pathname]);

  const handleMenuClick = (data) => {
    const path = data.keyPath.reverse().join("/");
    path === "Dashboard" ? navigate(`/`) : navigate(`/${path}`);
  };

  const items = [
    { label: "Dashboard", key: "Dashboard", icon: <DashboardOutlined /> }, // remember to pass the key prop

    { label: "Test Case", key: "TestCase", icon: <FileOutlined /> },
    { label: " Object Bank", key: "ObjectBank", icon: <BankOutlined /> },
    {
      label: "Reusable Flow",
      key: "ReusableFlow",
      icon: <VscDebugRestart />,
    },
  ];

  return (
    <Sider
      trigger={null}
      collapsible
      defaultCollapsed={true}
      collapsed={collapsed}
      breakpoint="lg"
      collapsedWidth={window.innerWidth < 720 ? 0 : 80}
      onBreakpoint={(broken) => {}}
      onMouseEnter={() => {
        setCollapsed(false);
      }}
      onMouseLeave={() => {
        setCollapsed(true);
      }}
    >
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={selectedMenu}
        // defaultSelectedKeys={["dashboard"]}
        style={{ marginTop: "-4px" }}
        onClick={handleMenuClick}
        items={items}
        // onOpenChange={handleSubMenu}
      />
      ;
    </Sider>
  );
}
