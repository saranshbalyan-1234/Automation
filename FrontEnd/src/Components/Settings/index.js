import React, { useState, useEffect } from "react";
import { Tabs, Button } from "antd";
import Profile from "./Profile";
import ComingSoon from "../../Views/ComingSoon";
import Team from "./Team";
import Role from "./Role";
import axios from "axios";
import { PlusOutlined } from "@ant-design/icons";
import AddUserModal from "./Team/AddUserModal";

export default function Setting() {
  const [activeTab, setActiveTab] = useState("profile");
  const [rolesData, setRolesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [addUserModal, setAddUserModal] = useState(false);
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

  const renderButton = () => {
    if (activeTab == "roles")
      return (
        <Button
          type="primary"
          ghost
          style={{ position: "absolute", right: 0, top: 10 }}
          // onClick={}
        >
          <PlusOutlined /> Add Role
        </Button>
      );
    else if (activeTab == "team")
      return (
        <Button
          type="primary"
          ghost
          style={{ position: "absolute", right: 0, top: 10 }}
          onClick={() => {
            setAddUserModal(true);
          }}
        >
          <PlusOutlined /> Add User
        </Button>
      );
  };
  return (
    <>
      <div style={{ display: "flex", position: "relative" }}>
        <Tabs
          onChange={handleActiveTab}
          activeKey={activeTab}
          style={{ minWidth: "100%" }}
        >
          <Tabs.TabPane tab="Profile" key="profile">
            <Profile />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Roles" key="roles">
            {activeTab == "roles" && (
              <Role data={rolesData} loading={loading} />
            )}
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
        {renderButton()}
      </div>
      <AddUserModal
        addUserModal={addUserModal}
        setAddUserModal={setAddUserModal}
      />
    </>
  );
}
