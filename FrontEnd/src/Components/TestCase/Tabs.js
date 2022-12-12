import React, { useState, useEffect } from "react";
import { Tabs, Button } from "antd";
import { PlayCircleFilled, TableOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  getTestCaseDetailsById,
  editTestCase,
} from "../../Redux/Actions/testCase";
import Environment from "./Environment";
import Process from "./Process";
import Details from "./TestCaseDetails";
// import ComingSoon from "../../Views/ComingSoon";
import ExecuteModal from "./ExecuteModal";
import ExecutionHistory from "./ExecutionHistory/List";
function TestCaseTabs({
  getTestCaseDetailsById,
  currentTestCase,
  loading,
  editTestCase,
}) {
  const { tab, testCaseId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("details");
  const [executeModal, setExecuteModal] = useState(false);
  const [envModal, setEnvModal] = useState(false);

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
              setEnvModal(true);
            }}
          >
            <TableOutlined />
            Environments
          </Button>

          <Button
            type="primary"
            onClick={() => {
              setExecuteModal(true);
            }}
          >
            <PlayCircleFilled />
            Execute
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
            {activeTab === "teststeps" && <Process />}
          </Tabs.TabPane>
          <Tabs.TabPane tab="Execution History" key="executionhistory">
            {activeTab === "executionhistory" && <ExecutionHistory />}
          </Tabs.TabPane>
          {/* <Tabs.TabPane tab="Activity Log" key="activitylog">
            <ComingSoon />
          </Tabs.TabPane> */}
        </Tabs>
        {renderButton()}
      </div>
      {executeModal && (
        <ExecuteModal setVisible={setExecuteModal} visible={executeModal} />
      )}
      {envModal && <Environment setVisible={setEnvModal} visible={envModal} />}
    </>
  );
}
const mapStateToProps = (state) => ({
  loading: state.testCase.loading,
  currentTestCase: state.testCase.currentTestCase,
});

const mapDispatchToProps = { getTestCaseDetailsById, editTestCase };

export default connect(mapStateToProps, mapDispatchToProps)(TestCaseTabs);
