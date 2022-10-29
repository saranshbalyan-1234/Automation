import React, { useState, useEffect } from "react";
import { Tabs, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getObjectDetailsById, editObject } from "../../Redux/Actions/object";
import ActivityLog from "../Common/ActivityLog";
import Details from "../Common/Details";
import Locators from "./Locators";
import AddLocatorsModal from "./AddLocatorsModal";
const ObjectBankTabs = ({
  getObjectDetailsById,
  currentObject,
  loading,
  editObject,
}) => {
  const { tab, objectId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("details");
  const [addLocatorModal, setAddLocatorModal] = useState(false);

  const handleActiveTab = (value) => {
    navigate(`/objectBank/${objectId}/${value}`);
  };

  useEffect(() => {
    setActiveTab(tab);
  }, [tab]);

  useEffect(() => {
    objectId && getObjectDetailsById(objectId);
  }, [objectId]);

  const renderButton = () => {
    if (activeTab === "locators")
      return (
        <Button
          type="primary"
          ghost
          style={{ position: "absolute", right: 0, top: 10 }}
          onClick={() => {
            setAddLocatorModal(true);
          }}
        >
          <PlusOutlined /> Add Locator
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
            <Locators />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Activity Log" key="activitylog">
            <ActivityLog />
          </Tabs.TabPane>
        </Tabs>
        {renderButton()}
      </div>
      {addLocatorModal && (
        <AddLocatorsModal
          visible={addLocatorModal}
          setVisible={setAddLocatorModal}
        />
      )}
    </>
  );
};
const mapStateToProps = (state) => ({
  currentObject: state.objectBank.currentObject,
  loading: state.objectBank.loading,
});

const mapDispatchToProps = {
  getObjectDetailsById,
  editObject,
};

export default connect(mapStateToProps, mapDispatchToProps)(ObjectBankTabs);
