import React from "react";
import { Table } from "antd";
import moment from "moment";
import UserAvatar from "./Avatar";
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
      render: (text, record) => (
        <div
          style={{
            overflow: "auto",
            display: "flex",
            alignItems: "center",
            gap: 7,
          }}
        >
          <div
            style={{
              height: 10,
              width: 10,
              borderRadius: "100%",
              background: getColor(text),
            }}
          ></div>
          <div>
            <UserAvatar user={record.createdBy.id} />
            {" " + record.createdBy.name + " " + text}
          </div>
        </div>
      ),
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

  const getColor = (log) => {
    const text = log.toLowerCase();
    return text.includes("added") || text.includes("created")
      ? "green"
      : text.includes("deleted") || text.includes("removed")
      ? "red"
      : text.includes("updated") || text.includes("edited")
      ? "#f7a705"
      : "";
  };
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
