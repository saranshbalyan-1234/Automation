import React, { useState } from "react";
import { Modal } from "antd";
export default function DataTable({ visible, setVisible }) {
  const [rows, setRows] = useState([]);
  return (
    <Modal
      centered
      visible={visible}
      footer={false}
      onCancel={() => {
        setVisible(false);
      }}
      closable={false}
    >
      {" "}
      <div>Environments</div>
      <div></div>
    </Modal>
  );
}
