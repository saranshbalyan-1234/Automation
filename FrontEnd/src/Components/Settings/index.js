import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import Profile from "./Profile";
import ComingSoon from "../../Views/ComingSoon";
import Team from "./Team";
import Role from "./Role";
import axios from "axios";

export default function Setting() {
  const [activeTab, setActiveTab] = useState("profile");
  const [rolesData, setRolesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleActiveTab = (value) => {
    console.log("saransh", value);
    setActiveTab(value);
  };
  const getRoleData = async () => {
    setLoading(true);
    await axios.get("/role/get").then((res) => {
      setRolesData(res.data);
    });
    setLoading(false);
  };
  useEffect(() => {
    if (activeTab == "roles") {
      getRoleData();
    }
  }, [activeTab]);

  return (
    <>
      <Tabs onChange={handleActiveTab} activeKey={activeTab}>
        <Tabs.TabPane tab="Profile" key="profile">
          <Profile />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Roles" key="roles">
          {activeTab == "roles" && <Role data={rolesData} loading={loading} />}
        </Tabs.TabPane>
        <Tabs.TabPane tab="Team" key="team">
          <Team />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Notification" key="notification">
          <ComingSoon />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Billing" key="billing">
          <ComingSoon />
        </Tabs.TabPane>
      </Tabs>
    </>
  );
}
