import React, { useState } from "react";
import { Form, Input, Modal, Button, Spin } from "antd";
import { addRole, editRole } from "../../../Redux/Actions/role";
import { connect } from "react-redux";

const AddEditRoleModal = ({
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
        <Form
          name="role"
          onFinish={onSubmit}
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ name: edit ? roleData.name : "" }}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                message: "Please input role name!",
              },
            ]}
          >
            <Input name="name" />
          </Form.Item>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              type="primary"
              className="login-form-button"
              style={{ marginRight: "20px" }}
              htmlType="submit"
            >
              {edit ? "Edit" : "Add"} Role
            </Button>
            <Button
              className="login-form-button"
              style={{ marginRight: "20px" }}
              onClick={() => {
                setVisible(false);
              }}
            >
              Cancel
            </Button>
          </div>
        </Form>
      </Spin>
    </Modal>
  );
};
const mapStateToProps = (state) => ({ roles: state.roles });
const mapDispatchToProps = { addRole, editRole };

export default connect(mapStateToProps, mapDispatchToProps)(AddEditRoleModal);
