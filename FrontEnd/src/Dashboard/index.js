import { StyledLayout } from "./style";

import { Layout, Menu } from "antd";
import React, { useState } from "react";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
const { Content } = Layout;
export default function Dashboard({ children }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <StyledLayout>
      <Layout>
        <Header setCollapsed={setCollapsed} collapsed={collapsed}>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["4"]}
            items={[
              UserOutlined,
              VideoCameraOutlined,
              UploadOutlined,
              UserOutlined,
            ].map((icon, index) => ({
              key: String(index + 1),
              icon: React.createElement(icon),
              label: `nav ${index + 1}`,
            }))}
          />
        </Header>
        <Layout>
          <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
          <Content style={{ margin: "24px 16px 0" }}>
            {children} <Footer />
          </Content>
        </Layout>
      </Layout>
    </StyledLayout>
  );
}
