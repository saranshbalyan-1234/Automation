import React, { useState } from "react";
import { Form, Input, Modal, Button, Spin } from "antd";
import { addRole, editRole } from "../../../Redux/Actions/role";
import { connect } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
const AddPermissionModal = ({
  visible,
  setVisible,
  editRole,
  addRole,
  edit = false,
  roles,
  roleData,
}) => {
  const onSubmit = async (data) => {
    const result = edit
      ? await editRole({ ...data, id: roleData.id })
      : await addRole(data);
    result && setVisible(false);
  };

  return (
    <Modal
      visible={visible}
      footer={false}
      onCancel={() => {
        setVisible(false);
      }}
      closable={false}
    >
      <Spin spinning={roles.loading}>
        <Button
          type="dashed"
          //   onClick={() => add()}
          block
          icon={<PlusOutlined />}
        >
          Add field
        </Button>
      </Spin>
    </Modal>
  );
};
const mapStateToProps = (state) => ({ roles: state.roles });
const mapDispatchToProps = { addRole, editRole };

export default connect(mapStateToProps, mapDispatchToProps)(AddPermissionModal);
