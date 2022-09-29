import React from "react";
import { Layout } from "antd";
import {
  GithubOutlined,
  InstagramOutlined,
  FacebookOutlined,
  PhoneOutlined,
  MailOutlined,
  WhatsAppOutlined,
  LinkedinOutlined,
} from "@ant-design/icons";
const { Content } = Layout;
export default function Footer() {
  return (
    <Content style={{ margin: "24px 0px 24px" }}>
      <div
        className="site-layout-sub-header-background"
        style={{
          padding: 24,
          color: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", justifyContent: "center", gap: "7px" }}>
          <GithubOutlined
            onClick={() => {
              window.open("https://github.com/saranshbalyan-1234");
            }}
            className="handleIcon"
          />
          <PhoneOutlined
            onClick={() => {
              window.open("tel:+91-9999075909", "_blank");
            }}
            className="handleIcon"
          />
          <MailOutlined
            onClick={() => {
              window.open("mailto:saranshbalyan123@gmail.com", "_blank");
            }}
            className="handleIcon"
          />
          <WhatsAppOutlined
            onClick={() => {
              window.open("https://api.whatsapp.com/send?phone=919868598141");
            }}
            className="handleIcon"
          />

          <LinkedinOutlined
            onClick={() => {
              window.open(
                "https://www.linkedin.com/in/saransh-balyan-49a14b11b/"
              );
            }}
            className="handleIcon"
          />
          <InstagramOutlined className="handleIcon" />
          <FacebookOutlined className="handleIcon" />
        </div>
        <div style={{ marginTop: "10px" }}>Made with Love By SaranCe</div>
      </div>
    </Content>
  );
}
