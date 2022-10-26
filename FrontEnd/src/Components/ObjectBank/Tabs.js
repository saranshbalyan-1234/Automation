import React, { useState, useEffect } from "react";
import { Tabs, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  getTestObjectDetailsById,
  editObject,
} from "../../Redux/Actions/testObject";
import ActivityLog from "../Common/ActivityLog";
import Details from "../Common/Details";
const ObjectBankTabs = ({
  getTestObjectDetailsById,
  locators,
  currentObject,
  loading,
  editObject,
}) => {
  const { tab, testObjectId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("details");

  const handleActiveTab = (value) => {
    navigate(`/objectBank/${testObjectId}/${value}`);
  };

  useEffect(() => {
    setActiveTab(tab);
  }, [tab]);
  useEffect(() => {
    // if (tab == "teststeps") {
    //   getReusableFlowStepsById(testObjectId);
    // }
  }, [testObjectId]);

  useEffect(() => {
    getTestObjectDetailsById(testObjectId);
  }, [testObjectId]);

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
                details={currentObject}
                name="Object"
                onEdit={editObject}
              />
            )}
          </Tabs.TabPane>
          <Tabs.TabPane tab="Locators" key="locators">
            {/* {activeTab === "locators" && (
              <TestStep
                testObjectId={testObjectId}
                deleteStep={deleteStep}
                testSteps={testSteps}
              />
            )} */}
          </Tabs.TabPane>
          <Tabs.TabPane tab="Activity Log" key="activitylog">
            <ActivityLog />
          </Tabs.TabPane>
        </Tabs>
        {renderButton()}
      </div>
    </>
  );
};
const mapStateToProps = (state) => ({
  locators: state.objectBank.currentObject.locators,
  currentObject: state.objectBank.currentObject,
  loading: state.objectBank.loading,
});

const mapDispatchToProps = {
  getTestObjectDetailsById,
  editObject,
};

export default connect(mapStateToProps, mapDispatchToProps)(ObjectBankTabs);
