import React from "react";
import { Form, Input, Modal, Button, Spin } from "antd";
import { connect } from "react-redux";
import { executeTestCase } from "../../Redux/Actions/testCase";
const ExecuteModal = ({
  visible,
  setVisible,
  loading,
  executeTestCase,
  currentTestCaseId,
}) => {
  const handleExecute = async () => {
    await executeTestCase(currentTestCaseId);
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
      <Spin spinning={loading}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            type="primary"
            style={{ marginRight: "20px" }}
            htmlType="button"
            onClick={handleExecute}
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
