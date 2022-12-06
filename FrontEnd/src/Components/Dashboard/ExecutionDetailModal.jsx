import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import { Line } from "@ant-design/plots";
export default function ExecutionDetailModal({ visible, setVisible }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    fetch(
      "https://gw.alipayobjects.com/os/bmw-prod/55424a73-7cb8-4f79-b60d-3ab627ac5698.json"
    )
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log("fetch data failed", error);
      });
  };
  const config = {
    data,
    xField: "year",
    yField: "value",
    seriesField: "category",
    xAxis: {
      type: "time",
    },
    yAxis: {
      label: {
        formatter: (v) =>
          `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
      },
    },
  };

  return (
    <Modal
      centered
      width={1000}
      title="Detailed Execution Report"
      open={visible}
      footer={false}
      onCancel={() => {
        setVisible(false);
      }}
    >
      <Line {...config} />
    </Modal>
  );
}
