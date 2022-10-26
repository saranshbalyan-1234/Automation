import React from "react";
import { Form, Input, Modal, Button, Spin } from "antd";
import { saveObject, editObject } from "../../Redux/Actions/testObject";
import { connect } from "react-redux";
const AddEditObjectModal = ({
  visible,
  setVisible,
  saveObject,
  editObject,
  currentProjectId,
  editData,
  setEditData,
  loading,
  edit = false,
}) => {
  const onSubmit = async (data) => {
    let result = false;
    if (edit) {
      result = await editObject(data);

      setEditData({});
    } else {
      result = await saveObject({
        ...data,
        projectId: currentProjectId,
      });
    }
    result && setVisible(false);
  };

  return (
    <Modal
      title={edit ? "Edit Object" : "Create New Object"}
      visible={visible}
      footer={false}
      onCancel={() => {
        setVisible(false);
      }}
      closable={false}
    >
      <Spin spinning={loading}>
        <Form
          name="testCase"
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
const mapDispatchToProps = {
  saveObject,
  editObject,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddEditObjectModal);
