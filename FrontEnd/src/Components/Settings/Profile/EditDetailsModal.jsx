import React, { useState } from "react";
import { connect } from "react-redux";
import { Button, Form, Input, Modal, Spin } from "antd";
import { editDetails } from "../../../Redux/Actions/user";
const EditDetailsModal = ({
  setEditDetailsModal,
  editDetailsModal,
  editDetails,
  user,
  loading,
}) => {
  const onFinish = async (data) => {
    await editDetails(data).then(() => {
      setEditDetailsModal(false);
    });
  };

  return (
    <Modal
      title="Edit Details"
      visible={editDetailsModal}
      onCancel={() => setEditDetailsModal(false)}
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
          initialValues={{ name: user.name }}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
            name="submitBtn"
          >
            <Button type="primary" htmlType="submit">
              Update
            </Button>
            <Button
              style={{ marginLeft: "10px" }}
              onClick={() => {
                setEditDetailsModal(false);
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

const mapStateToProps = (state) => ({
  user: state.auth.user,
  loading: state.auth.loading,
});

const mapDispatchToProps = { editDetails };

export default connect(mapStateToProps, mapDispatchToProps)(EditDetailsModal);
