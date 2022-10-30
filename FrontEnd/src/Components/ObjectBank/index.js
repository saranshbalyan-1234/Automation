import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import {
  getObjectByProject,
  deleteObject,
  saveObject,
} from "../../Redux/Actions/object";
import { connect } from "react-redux";
import List from "../Common/List";
import Details from "./Details";
const ObjectBank = ({
  objectList,
  loading,
  getObjectByProject,
  deleteObject,
  currentProjectId,
  saveObject,
}) => {
  useEffect(() => {
    currentProjectId && getObjectByProject();
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
        <Route path="/:objectId/:tab" element={<Details />} />
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
  getObjectByProject,
  deleteObject,
  saveObject,
};

export default connect(mapStateToProps, mapDispatchToProps)(ObjectBank);
