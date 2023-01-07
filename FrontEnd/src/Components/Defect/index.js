import React, { useEffect } from "react";
// import TestCaseTabs from "./Tabs";
import { Routes, Route } from "react-router-dom";
import { connect } from "react-redux";
import DefectList from "./DefectList";
import DefectDetail from "./DefectDetail";
import { usePermission } from "../../Utils/permission";
import { getDefectSetting } from "../../Redux/Actions/defect";
const Defect = ({ getDefectSetting }) => {
  const addDefectPermission = usePermission("Defect", "add");

  useEffect(() => {
    getDefectSetting();
  }, []);

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
const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  getDefectSetting,
};

export default connect(mapStateToProps, mapDispatchToProps)(Defect);
