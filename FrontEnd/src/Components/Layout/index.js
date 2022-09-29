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
import Container from "./Container";
const { Content } = Layout;
export default function LayOut({ children }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <StyledLayout>
      <Layout>
        <Header setCollapsed={setCollapsed} collapsed={collapsed} />
        <Layout>
          <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
          <Content style={{ margin: "16px 16px 0" }}>
            <Container children={children} />
            <Footer />
          </Content>
        </Layout>
      </Layout>
    </StyledLayout>
  );
}
