import React from "react";
import ReusableFlowList from "./ReusableFlowList";
import ReusableFlowTabs from "./Tabs";
import { Routes, Route } from "react-router-dom";
export default function ReusableFlow() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ReusableFlowList />} />
        <Route path="/:reusableFlowId/:tab" element={<ReusableFlowTabs />} />
      </Routes>
    </>
  );
}
