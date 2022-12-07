import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import { Line } from "@ant-design/plots";
import axios from "axios";
export default function ExecutionDetailModal({ visible, setVisible }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = async () => {
    const { data } = await axios.get("/dashboard/detailed-execution");
    setData(data);
  };
  const config = {
    data,
    xField: "date",
    yField: "value",
    seriesField: "type",
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
