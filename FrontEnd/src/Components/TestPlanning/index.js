import React from "react";
import List from "./TestCase/List";
import TestCase from "./TestCase";
import { Routes, Route } from "react-router-dom";
export default function index() {
  return (
    <>
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="/:testCaseId/:tab" element={<TestCase />} />
      </Routes>
    </>
  );
}
