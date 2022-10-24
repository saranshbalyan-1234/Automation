import React, { useEffect } from "react";
// import ReusableFlowList from "./ReusableFlowList";
import List from "../Common/List";
import ReusableFlowTabs from "./Tabs";
import { Routes, Route } from "react-router-dom";
import { connect } from "react-redux";
import {
  deleteReusableFlow,
  getReusableFlowByProject,
} from "../../../Redux/Actions/TestPlanning/reusableFlow";
const ReusableFlow = ({
  loading,
  getReusableFlowByProject,
  deleteReusableFlow,
  reusableFlow,
  currentProjectId,
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
              reusable={true}
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

const mapDispatchToProps = { getReusableFlowByProject, deleteReusableFlow };

export default connect(mapStateToProps, mapDispatchToProps)(ReusableFlow);
