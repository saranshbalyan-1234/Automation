import React from "react";
import TestCaseList from "./TestCaseList";
import TestCaseTabs from "./Tabs";
import { Routes, Route } from "react-router-dom";
export default function TestCase() {
  return (
    <>
      <Routes>
        <Route path="/" element={<TestCaseList />} />
        <Route path="/:testCaseId/:tab" element={<TestCaseTabs />} />
      </Routes>
    </>
  );
}
