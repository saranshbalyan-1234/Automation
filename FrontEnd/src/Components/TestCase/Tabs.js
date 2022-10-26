import React, { useState, useEffect } from "react";
import { Tabs, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  getTestCaseDetailsById,
  editTestCase,
} from "../../Redux/Actions/testCase";
import TestProcess from "./TestProcess";
import Details from "../Common/Details";
import ActivityLog from "../Common/ActivityLog";
function TestCaseTabs({
  getTestCaseDetailsById,
  currentTestCase,
  loading,
  editTestCase,
}) {
  const { tab, testCaseId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("details");

  const handleActiveTab = (value) => {
    navigate(`/TestCase/${testCaseId}/${value}`);
  };

  useEffect(() => {
    setActiveTab(tab);
  }, [tab]);

  useEffect(() => {
    testCaseId && getTestCaseDetailsById(testCaseId);
  }, [testCaseId]);

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
            {activeTab === "details" && (
              <Details
                loading={loading}
                details={currentTestCase}
                name="Test Case"
                onEdit={editTestCase}
              />
            )}
          </Tabs.TabPane>
          <Tabs.TabPane tab="Test Steps" key="teststeps">
            {activeTab === "teststeps" && <TestProcess />}
          </Tabs.TabPane>
          <Tabs.TabPane tab="Activity Log" key="activitylog">
            <ActivityLog />
          </Tabs.TabPane>
        </Tabs>
        {renderButton()}
      </div>
    </>
  );
}
const mapStateToProps = (state) => ({
  loading: state.testCase.loading,
  currentTestCase: state.testCase.currentTestCase,
});

const mapDispatchToProps = { getTestCaseDetailsById, editTestCase };

export default connect(mapStateToProps, mapDispatchToProps)(TestCaseTabs);
