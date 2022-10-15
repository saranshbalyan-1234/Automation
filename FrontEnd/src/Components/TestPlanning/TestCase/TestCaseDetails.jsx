import React from "react";
import { useParams } from "react-router-dom";
export default function TestCaseDetails() {
  const { testCaseId } = useParams();
  return <div>TestCaseDetails</div>;
}
