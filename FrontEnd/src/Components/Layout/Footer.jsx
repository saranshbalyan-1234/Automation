import React from "react";
import { Layout } from "antd";
const { Content } = Layout;
export default function Footer() {
  return (
    <Content style={{ margin: "24px 0px 24px" }}>
      <div
        className="site-layout-sub-header-background"
        style={{
          padding: 24,
          minHeight: 50,
          color: "white",
          textAlign: "center",
        }}
      >
        Designed By SaranCe
      </div>
    </Content>
  );
}
