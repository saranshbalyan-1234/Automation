import React from "react";
import { Table } from "antd";
import moment from "moment";
export default function ActivityLog({ logs = [] }) {
  const columns = [
    {
      title: "",
      width: 40,
      dataIndex: "",
      render: (text, record, index) => <div>{index + 1}</div>,
    },
    {
      title: "Message",
      dataIndex: "log",
    },
    {
      title: "Time",
      dataIndex: "executedBy",
      render: (_, record) => (
        <div>{moment(record.createdAt).format("DD/MM/YY h:mm:ss a")}</div>
      ),
      width: 180,
    },
  ];

  console.log("saransh", logs);
  return (
    <Table
      scroll={{ x: true }}
      columns={columns}
      dataSource={logs}
      sticky
      size="small"
    />
  );
}
