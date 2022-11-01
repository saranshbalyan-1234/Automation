import React, { useEffect } from "react";
import { Form, Input, Modal, Button, Spin, Select } from "antd";
import { connect } from "react-redux";
import { addProcess, editProcess } from "../../../Redux/Actions/testCase";
import { getReusableFlowByProject } from "../../../Redux/Actions/reusableFlow";
const { Option } = Select;
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
  addReusable = false,
  getReusableFlowByProject,
  reusableLoading,
  reusableFlows,
}) => {
  useEffect(() => {
    addReusable && getReusableFlowByProject();
  }, []);

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
        centered
        title={edit ? "Edit Process" : "Create New Process"}
        visible={visible}
        footer={false}
        onCancel={() => {
          setVisible(false);
        }}
        closable={false}
      >
        <Spin spinning={loading || reusableLoading}>
          <Form
            name="process"
            onFinish={onSubmit}
            labelCol={{ span: 7 }}
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
            {addReusable && (
              <Form.Item
                name="reusableFlowId"
                label="Reusable Flow"
                rules={[
                  {
                    required: true,
                    message: "Please select Reusable Flow!",
                  },
                ]}
              >
                <Select style={{ minWidth: "160px" }}>
                  {reusableFlows.map((el, i) => {
                    return (
                      <Option value={el.id} key={i}>
                        {el.name}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            )}
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
  reusableFlows: state.reusableFlow.data,
  reusableLoading: state.reusableFlow.loading,
});
const mapDispatchToProps = {
  addProcess,
  editProcess,
  getReusableFlowByProject,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddEditProcessModal);
