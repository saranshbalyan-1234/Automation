import React, { useState, useEffect } from "react";
import { Pie, G2 } from "@ant-design/plots";

const PieGraph = ({ data }) => {
  const G = G2.getEngine("canvas");
  console.log("saransh", data);
  // const data = [
  //   {
  //     type: "分类一",
  //     value: 27,
  //   },
  //   {
  //     type: "分类二",
  //     value: 25,
  //   },
  //   {
  //     type: "分类三",
  //     value: 18,
  //   },
  // ];
  const config = {
    legend: true,
    appendPadding: 0,
    data,
    angleField: "value",
    colorField: "type",
    radius: 1,
  };
  return <Pie {...config} />;
};
export default PieGraph;
