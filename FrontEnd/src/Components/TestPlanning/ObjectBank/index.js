import React from "react";
import ObjectBankTabs from "./Tabs";
import { Routes, Route } from "react-router-dom";
import ObjectList from "./ObjectList";
const ObjectBank = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<ObjectList />} />
        <Route path="/:testObjectId/:tab" element={<ObjectBankTabs />} />
      </Routes>
    </>
  );
};

export default ObjectBank;
