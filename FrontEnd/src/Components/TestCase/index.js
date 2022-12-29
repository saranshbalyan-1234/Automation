import React from "react";
// import TestCaseList from "./TestCaseList";
import List from "../Common/List";
import TestCaseTabs from "./Tabs";
import { Routes, Route } from "react-router-dom";
import { connect } from "react-redux";
import {
  getTestCaseByProject,
  deleteTestCase,
  saveTestCase,
} from "../../Redux/Actions/testCase";
const TestCase = ({
  getTestCaseByProject,
  deleteTestCase,
  testCases,
  loading,
  saveTestCase,
}) => {
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
              getList={getTestCaseByProject}
            />
          }
        />
        <Route path="/:testCaseId/:tab" element={<TestCaseTabs />} />
      </Routes>
    </>
  );
};
const mapStateToProps = (state) => ({
  testCases: state.testCase.data,
  loading: state.testCase.loading,
});

const mapDispatchToProps = {
  getTestCaseByProject,
  deleteTestCase,
  saveTestCase,
};

export default connect(mapStateToProps, mapDispatchToProps)(TestCase);
