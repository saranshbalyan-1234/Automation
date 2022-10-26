import React from "react";
import { Form, Input, Modal, Button, Spin } from "antd";
import { connect } from "react-redux";
import { addProcess, editProcess } from "../../../Redux/Actions/testCase";
const AddEditProcessModal = ({
  visible,
  setVisible,
  addProcess,
  currentTestCaseId,
  editData,
  editProcess,
  setEditData,
  loading,
  edit = false,
  setEdit = () => {},
  step,
}) => {
  const onSubmit = async (data) => {
    let result = false;
    if (edit) {
      result = await editProcess({ data: data, processId: editData.id });
      setEditData({});
    } else {
      result = await addProcess({
        ...data,
        testCaseId: currentTestCaseId,
        step,
      });
      if (step === 1 && edit === false) setEdit(true);
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
        title={edit ? "Edit Process" : "Create New Process"}
        visible={visible}
        footer={false}
        onCancel={() => {
          setVisible(false);
        }}
        closable={false}
      >
        <Spin spinning={loading}>
          <Form
            name="testProcess"
            onFinish={onSubmit}
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 16 }}
            initialValues={{
              name: edit ? editData.name : "",
              comment: edit ? editData.comment : "",
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
            <Form.Item name="comment" label="Comment">
              <Input name="comment" showCount maxLength={50} />
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
    </div>
  );
};
const mapStateToProps = (state) => ({
  currentTestCaseId: state.testCase.currentTestCase.id,
  loading: state.testCase.loading,
});
const mapDispatchToProps = { addProcess, editProcess };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddEditProcessModal);
