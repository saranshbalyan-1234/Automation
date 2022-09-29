import { Button, Form, Input, Modal } from "antd";
import React from "react";
import axios from "axios";
const ChangePassword = ({ setChangePasswordModal, changePasswordModal }) => {
  const onFinish = (data) => {
    axios.post("/user/change-password", data).then(() => {
      setChangePasswordModal(false);
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Modal
      title="Change Password"
      visible={changePasswordModal}
      onCancel={() => setChangePasswordModal(false)}
      footer={false}
    >
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Old Password"
          name="oldPassword"
          rules={[
            {
              required: true,
              message: "Please input your old password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="New Password"
          name="newPassword"
          rules={[
            {
              required: true,
              message: "Please input your new password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Reset Password
          </Button>
          <Button
            style={{ marginLeft: "10px" }}
            onClick={() => {
              setChangePasswordModal(false);
            }}
          >
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ChangePassword;
