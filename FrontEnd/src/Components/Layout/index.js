import { StyledLayout } from "./style";
import { FloatButton } from "antd";
import { Layout } from "antd";
import React, { useState } from "react";

import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import Container from "./Container";
const { Content } = Layout;
export default function LayOut({ children }) {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <StyledLayout>
      <Layout>
        <Layout>
          <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
          <div
            style={{
              width: "100%",
              minHeight: "100vh",
              overflow: "scroll",
            }}
          >
            <Header setCollapsed={setCollapsed} collapsed={collapsed} />
            <Content
              style={{
                margin: "16px 16px 0",
              }}
            >
              <Container children={children} />
              <Footer />
            </Content>
            <FloatButton.BackTop />
          </div>
        </Layout>
      </Layout>
    </StyledLayout>
  );
}
