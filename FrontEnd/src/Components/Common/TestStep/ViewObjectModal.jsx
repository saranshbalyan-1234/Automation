import React from "react";
import { Modal, Descriptions } from "antd";
export default function ViewObjectModal({
  visible,
  setVisible,
  object,
  setObject,
}) {
  return (
    <Modal
      title={
        <div style={{ display: "flex", gap: 10 }}>
          <div>Object Name:</div> <div>{object.name}</div>
        </div>
      }
      visible={visible}
      footer={false}
      onCancel={() => {
        setObject({});
        setVisible(false);
      }}
    >
      <div style={{ marginTop: "-10px" }}>
        <Descriptions title="Locators" layout="vertical">
          <Descriptions.Item label="UserName">Zhou Maomao</Descriptions.Item>
          <Descriptions.Item label="Telephone">1810000000</Descriptions.Item>
          <Descriptions.Item label="Live">Hangzhou, Zhejiang</Descriptions.Item>
          <Descriptions.Item label="Address" span={2}>
            No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
          </Descriptions.Item>
          <Descriptions.Item label="Remark">empty</Descriptions.Item>
        </Descriptions>
      </div>
    </Modal>
  );
}
