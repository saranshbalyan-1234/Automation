import React from "react";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
const { Sider } = Layout;
export default function Sidebar({ collapsed, setCollapsed }) {
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
      <Menu theme="dark" mode="inline" defaultSelectedKeys={["dashboard"]}>
        <Menu.Item key="dashboard" icon={<UserOutlined />}>
          Dashboard
        </Menu.Item>
        <Menu.SubMenu
          key="testplanning"
          icon={<VideoCameraOutlined />}
          title="Test Planning"
        >
          <Menu.Item key="testcase" icon={<UserOutlined />}>
            Test Case
          </Menu.Item>
          <Menu.Item key="objectbank" icon={<VideoCameraOutlined />}>
            Object Bank
          </Menu.Item>
          <Menu.Item key="reusableflow" icon={<UploadOutlined />}>
            Reusable Flow
          </Menu.Item>
        </Menu.SubMenu>

        <Menu.SubMenu
          key="testexecution"
          icon={<UploadOutlined />}
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
