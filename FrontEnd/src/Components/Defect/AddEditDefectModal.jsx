import React from "react";
import { Form, Input, Modal, Button, Select } from "antd";
import ReactQuill from "react-quill";
import { connect } from "react-redux";
import Loading from "../Common/Loading";
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
      width={800}
      title={edit ? `Edit Defect` : `Create New Defect`}
      open={visible}
      footer={false}
      onCancel={() => {
        setVisible(false);
      }}
      // closable={false}
    >
      <Loading loading={loading}>
        <Form
          name={"Defect"}
          onFinish={onSubmit}
          labelCol={{ span: 3 }}
          wrapperCol={{ span: 20 }}
          initialValues={{
            name: edit ? editData.name : "",
            description: edit ? editData.description : "",
            tags: edit
              ? editData.tags
                ? editData.tags
                : undefined
              : undefined,
          }}
        >
          <Form.Item
            name="title"
            label="Title"
            rules={[
              {
                required: true,
                message: "Please input Title!",
              },
            ]}
          >
            <Input name="name" showCount />
          </Form.Item>
          <Form.Item name="tags" label="Tags">
            <Select mode="tags" placeholder="Tags" />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <ReactQuill
              // style={{ width: 650 }}
              placeholder="Enter Description"
              name="description"
            />
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
      </Loading>
    </Modal>
  );
};
const mapStateToProps = (state) => ({
  currentProjectId: state.projects.currentProject.id,
  loading: state.defect.loading,
});
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AddEditModal);
