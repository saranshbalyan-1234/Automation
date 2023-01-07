import React, { useState, useEffect } from "react";
import { Tabs, Button } from "antd";
import { connect } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
// import
// {  getTestCaseDetailsById,
//   editTestCase,
//   getTestCaseLogsById,} from
// "../../Redux/Actions/testCase";

import DefectDetail from "./DefectDetail";
import ActivityLog from "../Common/ActivityLog";
function TestCaseTabs({
  loading,
  logs,
  // getTestCaseLogsById
}) {
  const { tab, defectId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("details");

  const handleActiveTab = (value) => {
    navigate(`/Defect/${defectId}/${value}`);
  };

  useEffect(() => {
    setActiveTab(tab);
  }, [tab]);

  useEffect(() => {
    // tab === "logs" && getTestCaseLogsById(defectId);
    // eslint-disable-next-line
  }, [tab]);

  useEffect(() => {
    // defectId && getTestCaseDetailsById(defectId);
    // eslint-disable-next-line
  }, [defectId]);

  const renderButton = () => {
    if (activeTab === "teststeps")
      return (
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 5,
            width: 250,
            display: "flex",
            gap: 10,
          }}
        >
          <Button
            type="primary"
            ghost
            onClick={() => {
              //   setEnvModal(true);
            }}
          >
            {/* <TableOutlined /> */}
            Environments
          </Button>
        </div>
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
            {activeTab === "details" && <DefectDetail />}
          </Tabs.TabPane>

          <Tabs.TabPane tab="Logs" key="logs">
            {activeTab === "logs" && (
              <ActivityLog logs={logs} loading={loading} />
            )}
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
  logs: state.testCase.currentTestCase.logs,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TestCaseTabs);
