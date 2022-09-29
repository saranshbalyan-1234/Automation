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
    location.pathname.length > 1 && setSelectedMenu(temp[temp.length - 1]);
  }, [location.pathname]);

  const handleMenuClick = (data) => {
    const path = data.keyPath.reverse().join("/");
    navigate(`/${path}`);
  };
  // const handleSubMenu = (data) => {
  // console.log("saransh", data);
  // const currentSubmenu = data[data.length - 1];
  // navigate(`/${currentSubmenu}`);
  // };
  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      breakpoint="lg"
      collapsedWidth={window.innerWidth < 720 ? 0 : 80}
      onBreakpoint={(broken) => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        setCollapsed(collapsed);
      }}
    >
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={selectedMenu}
        // defaultSelectedKeys={["dashboard"]}
        style={{ marginTop: "-4px" }}
        onClick={handleMenuClick}
        // onOpenChange={handleSubMenu}
      >
        <Menu.Item key="Dashboard" icon={<DashboardOutlined />}>
          Dashboard
        </Menu.Item>
        <Menu.SubMenu
          key="TestPlanning"
          icon={<AlertOutlined />}
          title="Test Planning"
        >
          <Menu.Item key="TestCase" icon={<FileOutlined />}>
            Test Case
          </Menu.Item>
          <Menu.Item key="ObjectBank" icon={<BankOutlined />}>
            Object Bank
          </Menu.Item>
          <Menu.Item key="ReusableFlow" icon={<VscDebugRestart />}>
            Reusable Flow
          </Menu.Item>
        </Menu.SubMenu>

        <Menu.SubMenu
          key="TestExecution"
          icon={<CopyOutlined />}
          title="Test Execution"
        >
          {/* <Menu.Item icon={<UserOutlined />}>Test Case</Menu.Item>
          <Menu.Item icon={<VideoCameraOutlined />}>Object Bank</Menu.Item>
          <Menu.Item icon={<UploadOutlined />}>Reusable Flow</Menu.Item> */}
        </Menu.SubMenu>
      </Menu>
      ;
    </Sider>
  );
}
