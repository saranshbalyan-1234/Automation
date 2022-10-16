import React from "react";
import TestCaseList from "./TestCase/TestCaseList";
import TestCase from "./TestCase";
import { Routes, Route } from "react-router-dom";
export default function TestPlanning() {
  return (
    <>
      <Routes>
        <Route path="/" element={<TestCaseList />} />
        <Route path="/:testCaseId/:tab" element={<TestCase />} />
      </Routes>
    </>
  );
}
