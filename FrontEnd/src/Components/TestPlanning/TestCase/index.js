import React, { useEffect } from "react";
// import TestCaseList from "./TestCaseList";
import List from "../Common/List";
import TestCaseTabs from "./Tabs";
import { Routes, Route } from "react-router-dom";
import { connect } from "react-redux";
import {
  getTestCaseByProject,
  deleteTestCase,
} from "../../../Redux/Actions/TestPlanning/testCase";
const TestCase = ({
  getTestCaseByProject,
  deleteTestCase,
  currentProjectId,
  testCases,
  loading,
}) => {
  useEffect(() => {
    getTestCaseByProject();
  }, [currentProjectId]);
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <List
              data={testCases}
              loading={loading}
              onDelete={deleteTestCase}
            />
          }
        />
        <Route path="/:testCaseId/:tab" element={<TestCaseTabs />} />
      </Routes>
    </>
  );
};
const mapStateToProps = (state) => ({
  currentProjectId: state.projects.currentProject.id,
  testCases: state.testCase.data,
  loading: state.testCase.loading,
});

const mapDispatchToProps = { getTestCaseByProject, deleteTestCase };

export default connect(mapStateToProps, mapDispatchToProps)(TestCase);
