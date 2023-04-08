import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import { connect } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import ReusableProcessDetails from "./ReusableProcessDetails";
import {
  getReusableProcessDetailsById,
  deleteStep,
  getReusableProcessStepsById,
  editReusableProcess,
  getReusableProcessLogsById,
} from "../../Redux/Actions/reusableProcess";
import TestStepTable from "../Common/TestStep";
import ActivityLog from "../Common/ActivityLog";
function ReusableProcessTabs({
  getReusableProcessDetailsById,
  getReusableProcessStepsById,
  testSteps,
  deleteStep,
  currentReusableProcess,
  loading,
  editReusableProcess,
  logs,
  getReusableProcessLogsById,
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
    tab === "logs" && getReusableProcessLogsById(reusableProcessId);
    // eslint-disable-next-line
  }, [tab]);
  useEffect(() => {
    if (tab === "teststeps") {
      reusableProcessId && getReusableProcessStepsById(reusableProcessId);
    }
    // eslint-disable-next-line
  }, [reusableProcessId, tab]);

  useEffect(() => {
    reusableProcessId && getReusableProcessDetailsById(reusableProcessId);
    // eslint-disable-next-line
  }, [reusableProcessId]);

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
              <TestStepTable
                reusableProcess={currentReusableProcess}
                deleteStep={deleteStep}
                testSteps={testSteps}
                loading={loading}
              />
            )}
          </Tabs.TabPane>
          <Tabs.TabPane tab="Logs" key="logs">
            {activeTab === "logs" && (
              <ActivityLog logs={logs} loading={loading} />
            )}
          </Tabs.TabPane>
        </Tabs>
      </div>
    </>
  );
}
const mapStateToProps = (state) => ({
  testSteps: state.reusableProcess.currentReusableProcess.testSteps,
  currentReusableProcess: state.reusableProcess.currentReusableProcess,
  logs: state.reusableProcess.currentReusableProcess.logs,
  loading: state.reusableProcess.loading,
});

const mapDispatchToProps = {
  getReusableProcessDetailsById,
  getReusableProcessStepsById,
  deleteStep,
  editReusableProcess,
  getReusableProcessLogsById,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReusableProcessTabs);
