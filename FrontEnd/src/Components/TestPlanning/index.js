import React from "react";
import List from "./TestCase/List";
import TestCaseDetails from "./TestCase/TestCaseDetails";
import { Routes, Route } from "react-router-dom";
export default function index() {
  return (
    <>
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="/:testCaseId/details" element={<TestCaseDetails />} />
      </Routes>
    </>
  );
}
