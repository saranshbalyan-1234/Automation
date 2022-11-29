import React, { useState } from "react";
import { Modal } from "antd";
import { Table, Button } from "antd";
export default function DataTable({ visible, setVisible }) {
  const [rows, setRows] = useState([]);
  const columns = [
    {
      title: "Environment",
      dataIndex: "env",
    },
  ];
  return (
    <Modal
      // title="Environment"
      width={1000}
      centered
      visible={visible}
      footer={false}
      onCancel={() => {
        setVisible(false);
      }}
      // closable={false}
    >
      <div style={{ maxHeight: "70vh", overflow: "auto" }}>
        <Button
          type="primary"
          ghost
          style={{ marginBottom: 5 }}
          onClick={() => {
            setRows([...rows, { env: "Enter Name" }]);
          }}
        >
          Add New Environment
        </Button>
        <Table
          size="small"
          columns={columns}
          dataSource={rows}
          pagination={false}
          sticky
        />
      </div>
    </Modal>
  );
}
