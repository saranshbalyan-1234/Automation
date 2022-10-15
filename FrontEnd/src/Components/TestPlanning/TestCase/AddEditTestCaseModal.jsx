import React, { useState } from "react";
import { Form, Input, Modal, Button, Spin } from "antd";
import { saveTestCase } from "../../../Redux/Actions/testCase";
import { connect } from "react-redux";

const AddEditTestCaseModal = ({
  visible,
  setVisible,
  saveTestCase,
  currentProjectId,
}) => {
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    const result = await saveTestCase({ ...data, projectId: currentProjectId });
    result && setVisible(false);
    setLoading(false);
  };

  return (
    <Modal
      title="Create New TestCase"
      visible={visible}
      footer={false}
      onCancel={() => {
        setVisible(false);
      }}
      closable={false}
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
const mapDispatchToProps = { saveTestCase };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddEditTestCaseModal);
