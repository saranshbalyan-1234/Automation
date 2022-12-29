import React from "react";
import List from "../Common/List";
import ReusableProcessTabs from "./Tabs";
import { Routes, Route } from "react-router-dom";
import { connect } from "react-redux";
import {
  deleteReusableProcess,
  getReusableProcessByProject,
  saveReusableProcess,
} from "../../Redux/Actions/reusableProcess";
const ReusableProcess = ({
  loading,
  getReusableProcessByProject,
  deleteReusableProcess,
  reusableProcess,
  saveReusableProcess,
}) => {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <List
              data={reusableProcess}
              loading={loading}
              onDelete={deleteReusableProcess}
              name="Reusable Process"
              link="ReusableProcess"
              onSave={saveReusableProcess}
              getList={getReusableProcessByProject}
            />
          }
        />
        <Route
          path="/:reusableProcessId/:tab"
          element={<ReusableProcessTabs />}
        />
      </Routes>
    </>
  );
};
const mapStateToProps = (state) => ({
  reusableProcess: state.reusableProcess.data,
  loading: state.reusableProcess.loading,
});

const mapDispatchToProps = {
  getReusableProcessByProject,
  deleteReusableProcess,
  saveReusableProcess,
};

export default connect(mapStateToProps, mapDispatchToProps)(ReusableProcess);
