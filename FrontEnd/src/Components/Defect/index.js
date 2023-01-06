import React from "react";
// import List from "../Common/List";
// import TestCaseTabs from "./Tabs";
import { Routes, Route } from "react-router-dom";
import { connect } from "react-redux";
import DefectList from "./DefectList";
import DefectDetail from "./DefectDetail";
import { usePermission } from "../../Utils/permission";
// import {
//   getTestCaseByProject,
//   deleteTestCase,
//   saveTestCase,
// } from "../../Redux/Actions/testCase";
// import { usePermission } from "../../Utils/permission";
const Defect = (
  {
    //   getTestCaseByProject,
    //   deleteTestCase,
    //   testCases,
    //   loading,
    //   saveTestCase,
  }
) => {
  const addDefectPermission = usePermission("Defect", "add");

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<DefectList addDefectPermission={addDefectPermission} />}
        />
        {addDefectPermission && (
          <Route path="/new" element={<DefectDetail />} />
        )}
        <Route path="/:defectId/:tab" element={<div>saransh</div>} />
      </Routes>
    </>
  );
};
const mapStateToProps = (state) => ({
  //   testCases: state.testCase.data,
  //   loading: state.testCase.loading,
});

const mapDispatchToProps = {
  //   getTestCaseByProject,
  //   deleteTestCase,
  //   saveTestCase,
};

export default connect(mapStateToProps, mapDispatchToProps)(Defect);
