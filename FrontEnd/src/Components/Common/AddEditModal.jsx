import React from "react";
import { Form, Input, Modal, Button, Spin } from "antd";

import { connect } from "react-redux";

const AddEditModal = ({
  visible,
  setVisible,
  currentProjectId,
  editData,
  setEditData,
  loading,
  edit = false,
  onSave,
  onEdit,
  name,
}) => {
  const onSubmit = async (data) => {
    let result = false;
    if (edit) {
      result = await onEdit(data);
      setEditData({});
    } else {
      result = await onSave({
        ...data,
        projectId: currentProjectId,
      });
    }
    result && setVisible(false);
  };

  return (
    <Modal
      centered
      title={edit ? `Edit ${name}` : `Create New ${name}`}
      visible={visible}
      footer={false}
      onCancel={() => {
        setVisible(false);
      }}
      closable={false}
    >
      <Spin spinning={loading}>
        <Form
          name={name}
          onFinish={onSubmit}
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 16 }}
          initialValues={{
            name: edit ? editData.name : "",
            description: edit ? editData.description : "",
          }}
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
          <Form.Item name="description" label="Description">
            <Input.TextArea name="description" />
          </Form.Item>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              type="primary"
              style={{ marginRight: "20px" }}
              htmlType="submit"
            >
              Submit
            </Button>
            <Button
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
const mapStateToProps = (state) => ({
  currentProjectId: state.projects.currentProject.id,
});
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AddEditModal);
