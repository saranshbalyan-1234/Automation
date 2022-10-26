import React, { useEffect } from "react";
// import TestCaseList from "./TestCaseList";
import List from "../Common/List";
import TestCaseTabs from "./Tabs";
import { Routes, Route } from "react-router-dom";
import { connect } from "react-redux";
import {
  getTestCaseByProject,
  deleteTestCase,
  saveTestCase,
} from "../../../Redux/Actions/TestPlanning/testCase";
const TestCase = ({
  getTestCaseByProject,
  deleteTestCase,
  currentProjectId,
  testCases,
  loading,
  saveTestCase,
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
              onSave={saveTestCase}
              name="Test Case"
              link="TestCase"
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

const mapDispatchToProps = {
  getTestCaseByProject,
  deleteTestCase,

  saveTestCase,
};

export default connect(mapStateToProps, mapDispatchToProps)(TestCase);
