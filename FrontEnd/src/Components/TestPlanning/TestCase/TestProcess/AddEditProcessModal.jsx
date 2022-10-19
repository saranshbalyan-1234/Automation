import React from "react";
import { Form, Input, Modal, Button, Spin } from "antd";
import { connect } from "react-redux";
import { addProcess, editTestCase } from "../../../../Redux/Actions/testCase";
const AddEditProcessModal = ({
  visible,
  setVisible,
  addProcess,
  currentTestCaseId,
  editData,
  editTestCase,
  setEditData,
  loading,
  edit = false,
  step,
}) => {
  const onSubmit = async (data) => {
    let result = false;
    if (edit) {
      result = await editTestCase(data);
      setEditData({});
    } else {
      result = await addProcess({
        ...data,
        testCaseId: currentTestCaseId,
        step,
      });
    }
    result && setVisible(false);
  };

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <Modal
        title="Create New Process"
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
    </div>
  );
};
const mapStateToProps = (state) => ({
  currentTestCaseId: state.testCase.currentTestCase.id,
  loading: state.testCase.loading,
});
const mapDispatchToProps = { addProcess, editTestCase };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddEditProcessModal);
