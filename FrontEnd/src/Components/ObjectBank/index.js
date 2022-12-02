import React from "react";
import { Routes, Route } from "react-router-dom";
import {
  getObjectByProject,
  deleteObject,
  saveObject,
} from "../../Redux/Actions/object";
import { connect } from "react-redux";

import Details from "./Details";
import ObjectList from "./ObjectList";
const ObjectBank = ({
  objectList,
  loading,
  getObjectByProject,
  deleteObject,
  saveObject,
}) => {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <ObjectList
              data={objectList}
              loading={loading}
              onDelete={deleteObject}
              name="Object"
              link="ObjectBank"
              onSave={saveObject}
              getList={getObjectByProject}
            />
          }
        />
        <Route path="/:objectId/:tab" element={<Details />} />
      </Routes>
    </>
  );
};

const mapStateToProps = (state) => ({
  objectList: state.objectBank.data,
  loading: state.objectBank.loading,
});
const mapDispatchToProps = {
  getObjectByProject,
  deleteObject,
  saveObject,
};

export default connect(mapStateToProps, mapDispatchToProps)(ObjectBank);
