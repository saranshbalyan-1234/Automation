import React from "react";
import { List, Typography, Modal } from "antd";
export default function ViewCommentModal({ comment, visible, setVisible }) {
  return (
    <Modal
      title="Comment"
      centered
      visible={visible}
      footer={false}
      onCancel={() => {
        setVisible(false);
      }}
    >
      <div
        dangerouslySetInnerHTML={{
          __html: comment,
        }}
      ></div>
    </Modal>
  );
}
