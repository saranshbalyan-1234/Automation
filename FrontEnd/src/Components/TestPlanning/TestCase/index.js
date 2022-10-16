import React, { useState, useEffect } from "react";
import { Tabs, Button } from "antd";
import { PlusOutlined, EditOutlined, SettingOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import TestCaseDetails from "./TestCaseDetails";
import TestStep from "./TestStep";
function TestCase({}) {
  const { tab, testCaseId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("details");

  const handleActiveTab = (value) => {
    navigate(`/TestPlanning/TestCase/${testCaseId}/${value}`);
  };

  useEffect(() => {
    setActiveTab(tab);
  }, [tab]);

  const renderButton = () => {
    if (activeTab === "roles")
      return (
        <Button
          type="primary"
          ghost
          style={{ position: "absolute", right: 0, top: 10 }}
          //   onClick={() => {
          //     setAddRoleModal(true);
          //   }}
        >
          <PlusOutlined /> Add Role
        </Button>
      );
  };
  return (
    <>
      <div style={{ display: "flex", position: "relative" }}>
        <Tabs
          activeKey={activeTab}
          style={{ minWidth: "100%" }}
          onChange={handleActiveTab}
        >
          <Tabs.TabPane tab="Details" key="details">
            {activeTab == "details" && <TestCaseDetails />}
          </Tabs.TabPane>
          <Tabs.TabPane tab="Test Step" key="teststep">
            {activeTab == "teststep" && <TestStep />}
          </Tabs.TabPane>
          <Tabs.TabPane tab="Activity Log" key="activitylog">
            <TestCaseDetails />
          </Tabs.TabPane>
        </Tabs>
        {renderButton()}
      </div>
    </>
  );
}
const mapStateToProps = (state) => ({ roles: state.roles });

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TestCase);
