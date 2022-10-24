import React, { useState, useEffect } from "react";
import { Tabs, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getTestCaseDetailsById } from "../../../Redux/Actions/TestPlanning/testCase";
import TestProcess from "./TestProcess";
import Details from "../Common/Details";
function TestCaseTabs({ getTestCaseDetailsById, currentTestCase, loading }) {
  const { tab, testCaseId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("details");

  const handleActiveTab = (value) => {
    navigate(`/TestPlanning/TestCase/${testCaseId}/${value}`);
  };

  useEffect(() => {
    setActiveTab(tab);
  }, [tab]);

  useEffect(() => {
    getTestCaseDetailsById(testCaseId);
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
              <Details loading={loading} details={currentTestCase} />
            )}
          </Tabs.TabPane>
          <Tabs.TabPane tab="Test Steps" key="teststeps">
            {activeTab === "teststeps" && <TestProcess />}
          </Tabs.TabPane>
          <Tabs.TabPane tab="Activity Log" key="activitylog">
            <>Activity Log</>
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

const mapDispatchToProps = { getTestCaseDetailsById };

export default connect(mapStateToProps, mapDispatchToProps)(TestCaseTabs);
