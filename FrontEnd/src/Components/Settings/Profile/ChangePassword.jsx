import React, { useState } from "react";
import { connect } from "react-redux";
import { Button, Form, Input, Modal, Spin } from "antd";
import { changePassword } from "../../../Redux/Actions/user";

const ChangePassword = ({
  setChangePasswordModal,
  changePasswordModal,
  changePassword,
}) => {
  const [loading, setLoading] = useState(false);
  const onFinish = async (data) => {
    setLoading(true);
    await changePassword(data).then(() => {
      setChangePasswordModal(false);
    });
    setLoading(false);
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
      <Spin spinning={loading}>
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
      </Spin>
    </Modal>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = { changePassword };

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
