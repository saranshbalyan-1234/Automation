import React from "react";
import { Tabs } from "antd";
import Profile from "./Profile";
import ComingSoon from "../../Views/ComingSoon";
export default function Setting() {
  return (
    <>
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Profile" key="1">
          <Profile />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Roles" key="2">
          <ComingSoon />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Team" key="3">
          <ComingSoon />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Notification" key="4">
          <ComingSoon />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Billing" key="5">
          <ComingSoon />
        </Tabs.TabPane>
      </Tabs>
    </>
  );
}
