import React from "react";
import { Form, Input, Modal, Button, Spin } from "antd";
import {
  saveReusableFlow,
  editReusableFlow,
} from "../../../Redux/Actions/TestPlanning/reusableFlow";
import { connect } from "react-redux";

const AddEditReusableFlowModal = ({
  visible,
  setVisible,
  saveReusableFlow,
  currentProjectId,
  editData,
  editReusableFlow,
  setEditData,
  loading,
  edit = false,
}) => {
  const onSubmit = async (data) => {
    let result = false;
    if (edit) {
      result = await editReusableFlow(data);
      setEditData({});
    } else {
      result = await saveReusableFlow({ ...data, projectId: currentProjectId });
    }
    result && setVisible(false);
  };

  return (
    <Modal
      title={edit ? "Edit ReusableFlow" : "Create New ReusableFlow"}
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
  loading: state.reusableFlow.loading,
});
const mapDispatchToProps = { saveReusableFlow, editReusableFlow };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddEditReusableFlowModal);
