import React from "react";
import { Modal } from "antd";

import Permission from "./Permission";
const ManagePermissionModal = ({
  visible,
  setVisible,
  roleData,
  editRolePermission,
}) => {
  return (
    <Modal
      centered
      title="Manage Permissions"
      open={visible}
      footer={false}
      onCancel={() => {
        setVisible(false);
      }}
      // closable={false}
      width={550}
    >
      <Permission
        setVisible={setVisible}
        roleData={roleData}
        editRolePermission={editRolePermission}
      />
    </Modal>
  );
};

export default ManagePermissionModal;
