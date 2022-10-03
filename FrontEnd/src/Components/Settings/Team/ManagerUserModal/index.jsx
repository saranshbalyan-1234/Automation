import React, { useState } from "react";
import { Tabs, Modal } from "antd";
import ManageUserRole from "./ManageUserRole";
import ManagerUserProject from "./ManagerUserProject";
export default function ManageUser({ visible, setVisible, userId }) {
  const [activeTab, setActiveTab] = useState("project");
  const handleActiveTab = (value) => {
    setActiveTab(value);
  };

  return (
    <Modal
      visible={visible}
      footer={false}
      onCancel={() => {
        setVisible(false);
      }}
      closable={false}
    >
      <Tabs
        onChange={handleActiveTab}
        activeKey={activeTab}
        style={{ minWidth: "100%", marginTop: "-20px" }}
      >
        <Tabs.TabPane tab="Project" key="project">
          {activeTab === "project" && (
            <ManagerUserProject setVisible={setVisible} userId={userId} />
          )}
        </Tabs.TabPane>
        <Tabs.TabPane tab="Role" key="role">
          {activeTab === "role" && (
            <ManageUserRole setVisible={setVisible} userId={userId} />
          )}
        </Tabs.TabPane>
      </Tabs>
    </Modal>
  );
}
