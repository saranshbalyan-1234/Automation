import React, { useEffect } from "react";
import ObjectBankTabs from "./Tabs";
import { Routes, Route } from "react-router-dom";
import {
  getTestObjectByProject,
  deleteObject,
  saveObject,
} from "../../../Redux/Actions/TestPlanning/testObject";
import { connect } from "react-redux";
import List from "../Common/List";
const ObjectBank = ({
  objectList,
  loading,
  getTestObjectByProject,
  deleteObject,
  currentProjectId,
  saveObject,
}) => {
  useEffect(() => {
    getTestObjectByProject();
  }, [currentProjectId]);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <List
              data={objectList}
              loading={loading}
              onDelete={deleteObject}
              name="Object"
              link="ObjectBank"
              onSave={saveObject}
            />
          }
        />
        <Route path="/:testObjectId/:tab" element={<ObjectBankTabs />} />
      </Routes>
    </>
  );
};

const mapStateToProps = (state) => ({
  currentProjectId: state.projects.currentProject.id,
  objectList: state.objectBank.data,
  loading: state.objectBank.loading,
});
const mapDispatchToProps = {
  getTestObjectByProject,
  deleteObject,
  saveObject,
};

export default connect(mapStateToProps, mapDispatchToProps)(ObjectBank);
