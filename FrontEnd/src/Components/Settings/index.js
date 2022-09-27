import React from "react";
import Profile from "./Profile";
import { Tabs } from "antd";
export default function Setting() {
  return (
    <>
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Profile" key="1">
          <Profile />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Roles" key="2">
          Roles
        </Tabs.TabPane>
        <Tabs.TabPane tab="Team" key="3">
          Team
        </Tabs.TabPane>
        <Tabs.TabPane tab="Notification" key="4">
          Notification
        </Tabs.TabPane>
        <Tabs.TabPane tab="Billing" key="5">
          Billing
        </Tabs.TabPane>
      </Tabs>
    </>
  );
}
