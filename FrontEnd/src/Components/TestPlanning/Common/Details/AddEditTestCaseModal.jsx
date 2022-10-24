import React from "react";
import { Form, Input, Modal, Button, Spin } from "antd";
import {
  saveTestCase,
  editTestCase,
} from "../../../../Redux/Actions/TestPlanning/testCase";
import {
  saveReusableFlow,
  editReusableFlow,
} from "../../../../Redux/Actions/TestPlanning/reusableFlow";
import { connect } from "react-redux";

const AddEditTestCaseModal = ({
  visible,
  setVisible,
  saveTestCase,
  saveReusableFlow,
  currentProjectId,
  editData,
  editTestCase,
  editReusableFlow,
  setEditData,
  loading,
  edit = false,
  reusable,
}) => {
  const onSubmit = async (data) => {
    let result = false;
    if (edit) {
      if (reusable) {
        result = await editReusableFlow(data);
      } else {
        result = await editTestCase(data);
      }
      setEditData({});
    } else {
      if (reusable) {
        result = await saveReusableFlow({
          ...data,
          projectId: currentProjectId,
        });
      } else {
        result = await saveTestCase({
          ...data,
          projectId: currentProjectId,
        });
      }
    }
    result && setVisible(false);
  };

  return (
    <Modal
      title={edit ? "Edit TestCase" : "Create New TestCase"}
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
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ name: edit ? editData.name : "" }}
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
              Submit
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
const mapStateToProps = (state) => ({
  currentProjectId: state.projects.currentProject.id,
});
const mapDispatchToProps = {
  saveTestCase,
  editTestCase,
  saveReusableFlow,
  editReusableFlow,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddEditTestCaseModal);
