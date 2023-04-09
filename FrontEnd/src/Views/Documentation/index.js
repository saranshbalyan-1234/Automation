import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Basic from "./Basic";
import Setting from "./Setting";
export default function Documentation() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/basic" element={<Basic />} />
      <Route path="/settings" element={<Setting />} />
    </Routes>
  );
}
