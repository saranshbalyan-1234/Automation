import React, { useState } from "react";
import { Form, Input, Modal, Button, Spin } from "antd";
import { addUser } from "../../../Redux/Actions/user";
import { connect } from "react-redux";

const AddRoleModal = ({ addRoleModal, setAddRoleModal, addUser }) => {
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    const result = await addUser(data);
    result && setAddRoleModal(false);
    setLoading(false);
  };

  return (
    <Modal
      visible={addRoleModal}
      footer={false}
      onCancel={() => {
        setAddRoleModal(false);
      }}
    >
      <Spin spinning={loading}>
        <Form
          name="register"
          onFinish={onSubmit}
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 16 }}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                message: "Please input Name!",
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
              Add Role
            </Button>
            <Button
              className="login-form-button"
              style={{ marginRight: "20px" }}
              onClick={() => {
                setAddRoleModal(false);
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

const mapDispatchToProps = { addUser };

export default connect(null, mapDispatchToProps)(AddRoleModal);
