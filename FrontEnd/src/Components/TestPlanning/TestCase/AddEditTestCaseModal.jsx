import React from "react";
import { Form, Input, Modal, Button, Spin } from "antd";
import { saveTestCase, editTestCase } from "../../../Redux/Actions/testCase";
import { connect } from "react-redux";

const AddEditTestCaseModal = ({
  visible,
  setVisible,
  saveTestCase,
  currentProjectId,
  editData,
  editTestCase,
  setEditData,
  loading,
  edit = false,
}) => {
  const onSubmit = async (data) => {
    let result = false;
    if (edit) {
      result = await editTestCase(data);
      setEditData({});
    } else {
      result = await saveTestCase({ ...data, projectId: currentProjectId });
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
  loading: state.testCase.loading,
});
const mapDispatchToProps = { saveTestCase, editTestCase };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddEditTestCaseModal);
