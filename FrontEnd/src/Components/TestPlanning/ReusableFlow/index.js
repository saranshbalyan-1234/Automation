import React, { useEffect } from "react";
// import ReusableFlowList from "./ReusableFlowList";
import List from "../Common/List";
import ReusableFlowTabs from "./Tabs";
import { Routes, Route } from "react-router-dom";
import { connect } from "react-redux";
import {
  deleteReusableFlow,
  getReusableFlowByProject,
  saveReusableFlow,
} from "../../../Redux/Actions/TestPlanning/reusableFlow";
const ReusableFlow = ({
  loading,
  getReusableFlowByProject,
  deleteReusableFlow,
  reusableFlow,
  currentProjectId,
  saveReusableFlow,
}) => {
  useEffect(() => {
    getReusableFlowByProject();
  }, [currentProjectId]);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <List
              data={reusableFlow}
              loading={loading}
              onDelete={deleteReusableFlow}
              name="Reusable Flow"
              link="ReusableFlow"
              onSave={saveReusableFlow}
            />
          }
        />
        <Route path="/:reusableFlowId/:tab" element={<ReusableFlowTabs />} />
      </Routes>
    </>
  );
};
const mapStateToProps = (state) => ({
  currentProjectId: state.projects.currentProject.id,
  reusableFlow: state.reusableFlow.data,
  loading: state.reusableFlow.loading,
});

const mapDispatchToProps = {
  getReusableFlowByProject,
  deleteReusableFlow,
  saveReusableFlow,
};

export default connect(mapStateToProps, mapDispatchToProps)(ReusableFlow);
