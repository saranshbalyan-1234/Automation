import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Basic from "./Basic";
export default function index() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/basic" element={<Basic />} />
    </Routes>
  );
}
