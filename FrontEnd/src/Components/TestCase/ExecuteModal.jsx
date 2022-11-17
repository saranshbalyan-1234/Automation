import React from "react";
import { Form, Input, Modal, Button, Spin } from "antd";
import { connect } from "react-redux";
import { executeTestCase } from "../../Redux/Actions/testCase";
import ReactQuill from "react-quill";
import { LoadingOutlined } from "@ant-design/icons";
const loadingIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
const ExecuteModal = ({
  visible,
  setVisible,
  loading,
  executeTestCase,
  currentTestCaseId,
}) => {
  const handleExecute = async (data) => {
    await executeTestCase(currentTestCaseId, data);
    setVisible(false);
  };
  return (
    <Modal
      centered
      title={`Execute`}
      visible={visible}
      footer={false}
      onCancel={() => {
        setVisible(false);
      }}
      closable={false}
    >
      <Spin spinning={loading} indicator={loadingIcon}>
        <Form
          name="execute"
          onFinish={handleExecute}
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 16 }}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                message: "Please input Execution Name!",
              },
            ]}
          >
            <Input name="name" />
          </Form.Item>

          <Form.Item name="description" label="">
            <ReactQuill
              style={{ width: 450 }}
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
      </Spin>
    </Modal>
  );
};
const mapStateToProps = (state) => ({
  currentProjectId: state.projects.currentProject.id,
  loading: state.testCase.loading,
  currentTestCaseId: state.testCase.currentTestCase?.id,
});
const mapDispatchToProps = { executeTestCase };

export default connect(mapStateToProps, mapDispatchToProps)(ExecuteModal);
