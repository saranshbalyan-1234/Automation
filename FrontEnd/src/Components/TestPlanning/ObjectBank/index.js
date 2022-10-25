import React, { useEffect } from "react";
import ObjectBankTabs from "./Tabs";
import { Routes, Route } from "react-router-dom";
import { connect } from "react-redux";
import {
  deleteReusableFlow,
  getReusableFlowByProject,
} from "../../../Redux/Actions/TestPlanning/reusableFlow";
import ObjectList from "./ObjectList";
const ObjectBank = ({}) => {
  return (
    <>
      <Routes>
        <Route path="/" element={<ObjectList />} />
        <Route path="/:reusableFlowId/:tab" element={<ObjectBankTabs />} />
      </Routes>
    </>
  );
};
const mapStateToProps = (state) => ({});

const mapDispatchToProps = { getReusableFlowByProject, deleteReusableFlow };

export default connect(mapStateToProps, mapDispatchToProps)(ObjectBank);
