import React, { useState, useEffect } from "react";
import { Tabs, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
// import ReusableFlowDetails from "./ReusableFlowDetails";
import {
  getReusableFlowDetailsById,
  deleteStep,
  getReusableFlowStepsById,
  editReusableFlow,
} from "../../../Redux/Actions/TestPlanning/reusableFlow";
import TestStep from "../Common/TestStep";
import Details from "../Common/Details";
import ActivityLog from "../Common/ActivityLog";
function ReusableFlowTabs({
  getReusableFlowDetailsById,
  getReusableFlowStepsById,
  testSteps,
  deleteStep,
  currentReusableFlow,
  loading,
  editReusableFlow,
}) {
  const { tab, reusableFlowId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("details");

  const handleActiveTab = (value) => {
    navigate(`/TestPlanning/ReusableFlow/${reusableFlowId}/${value}`);
  };

  useEffect(() => {
    setActiveTab(tab);
  }, [tab]);
  useEffect(() => {
    if (tab == "teststeps") {
      getReusableFlowStepsById(reusableFlowId);
    }
  }, [reusableFlowId]);

  useEffect(() => {
    getReusableFlowDetailsById(reusableFlowId);
  }, [reusableFlowId]);

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
                name="Reusable Flow"
                details={currentReusableFlow}
                loading={loading}
                onEdit={editReusableFlow}
              />
            )}
          </Tabs.TabPane>
          <Tabs.TabPane tab="Test Steps" key="teststeps">
            {activeTab === "teststeps" && (
              <TestStep
                reusableFlowId={reusableFlowId}
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
  testSteps: state.reusableFlow.currentReusableFlow.testSteps,
  currentReusableFlow: state.reusableFlow.currentReusableFlow,
  loading: state.reusableFlow.loading,
});

const mapDispatchToProps = {
  getReusableFlowDetailsById,
  getReusableFlowStepsById,
  deleteStep,
  editReusableFlow,
};

export default connect(mapStateToProps, mapDispatchToProps)(ReusableFlowTabs);
