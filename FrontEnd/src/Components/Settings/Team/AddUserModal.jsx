import React, { useState } from "react";
import { Form, Input, Modal, Button, Spin } from "antd";
import { addTeamMember } from "../../../Redux/Actions/team";
import { connect } from "react-redux";

const AddUserModal = ({ addUserModal, setAddUserModal, addTeamMember }) => {
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleDetails = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    let object = {};
    object[name] = value;

    setDetails({ ...details, ...object });
  };
  const onSubmit = async () => {
    setLoading(true);
    const result = await addTeamMember(details);
    result && setAddUserModal(false);
    setLoading(false);
  };

  return (
    <Modal
      title="Add User"
      visible={addUserModal}
      footer={false}
      onCancel={() => {
        setAddUserModal(false);
      }}
      closable={false}
    >
      <Spin spinning={loading}>
        <Form
          name="register"
          onFinish={onSubmit}
          labelCol={{ span: 7 }}
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
            <Input
              name="name"
              onChange={(e) => {
                handleDetails(e);
              }}
            />
          </Form.Item>
          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input E-mail!",
              },
            ]}
          >
            <Input
              name="email"
              onChange={(e) => {
                handleDetails(e);
              }}
            />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please input password!",
              },
            ]}
            hasFeedback
          >
            <Input.Password
              name="password"
              onChange={(e) => {
                handleDetails(e);
              }}
            />
          </Form.Item>
          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match!"));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              type="primary"
              className="login-form-button"
              style={{ marginRight: "20px" }}
              htmlType="submit"
            >
              Add User
            </Button>
            <Button
              className="login-form-button"
              style={{ marginRight: "20px" }}
              onClick={() => {
                setAddUserModal(false);
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

const mapDispatchToProps = { addTeamMember };

export default connect(null, mapDispatchToProps)(AddUserModal);
