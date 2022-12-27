import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import { connect } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import Details from "./Details";
import ActivityLog from "../Common/ActivityLog";
import { getObjectLogsById } from "../../Redux/Actions/object";
function ObjectBankTabs({ logs, getObjectLogsById }) {
  const { tab, objectId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("details");

  const handleActiveTab = (value) => {
    navigate(`/ObjectBank/${objectId}/${value}`);
  };

  useEffect(() => {
    setActiveTab(tab);
  }, [tab]);

  useEffect(() => {
    tab === "logs" && getObjectLogsById(objectId);
    // eslint-disable-next-line
  }, [tab]);

  return (
    <>
      <div style={{ display: "flex", position: "relative" }}>
        <Tabs
          activeKey={activeTab}
          style={{ minWidth: "100%" }}
          onChange={handleActiveTab}
        >
          <Tabs.TabPane tab="Details" key="details">
            {activeTab === "details" && <Details />}
          </Tabs.TabPane>
          <Tabs.TabPane tab="Logs" key="logs">
            {activeTab === "logs" && <ActivityLog logs={logs} />}
          </Tabs.TabPane>
        </Tabs>
      </div>
    </>
  );
}
const mapStateToProps = (state) => ({
  logs: state.objectBank.currentObject.logs,
});

const mapDispatchToProps = { getObjectLogsById };

export default connect(mapStateToProps, mapDispatchToProps)(ObjectBankTabs);
