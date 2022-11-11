import React, { useState, useEffect } from "react";
import { Tabs, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import ReusableProcessDetails from "./ReusableProcessDetails";
import {
  getReusableProcessDetailsById,
  deleteStep,
  getReusableProcessStepsById,
  editReusableProcess,
} from "../../Redux/Actions/reusableProcess";
import TestStep from "../Common/TestStep";
// import Details from "../Common/Details";
import ActivityLog from "../Common/ActivityLog";
function ReusableProcessTabs({
  getReusableProcessDetailsById,
  getReusableProcessStepsById,
  testSteps,
  deleteStep,
  currentReusableProcess,
  loading,
  editReusableProcess,
}) {
  const { tab, reusableProcessId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("details");

  const handleActiveTab = (value) => {
    navigate(`/ReusableProcess/${reusableProcessId}/${value}`);
  };

  useEffect(() => {
    setActiveTab(tab);
  }, [tab]);
  useEffect(() => {
    if (tab === "teststeps") {
      reusableProcessId && getReusableProcessStepsById(reusableProcessId);
    }
  }, [reusableProcessId, tab]);

  useEffect(() => {
    reusableProcessId && getReusableProcessDetailsById(reusableProcessId);
  }, [reusableProcessId]);

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
              <ReusableProcessDetails
                name="Reusable Process"
                details={currentReusableProcess}
                loading={loading}
                onEdit={editReusableProcess}
              />
            )}
          </Tabs.TabPane>
          <Tabs.TabPane tab="Test Steps" key="teststeps">
            {activeTab === "teststeps" && (
              <TestStep
                reusableProcessId={reusableProcessId}
                deleteStep={deleteStep}
                testSteps={testSteps}
              />
            )}
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
  testSteps: state.reusableProcess.currentReusableProcess.testSteps,
  currentReusableProcess: state.reusableProcess.currentReusableProcess,
  loading: state.reusableProcess.loading,
});

const mapDispatchToProps = {
  getReusableProcessDetailsById,
  getReusableProcessStepsById,
  deleteStep,
  editReusableProcess,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReusableProcessTabs);
