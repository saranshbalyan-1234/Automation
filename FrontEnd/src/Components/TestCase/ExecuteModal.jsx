import React, { useEffect, useState } from "react";
import { Form, Input, Modal, Button, Select } from "antd";
import { connect } from "react-redux";
import { executeTestCase } from "../../Redux/Actions/testCase";
import ReactQuill from "react-quill";
import Loading from "../Common/Loading";
import axios from "axios";
const { Option } = Select;
const ExecuteModal = ({
  visible,
  setVisible,
  loading,
  executeTestCase,
  currentTestCaseId,
}) => {
  const [form] = Form.useForm();
  const [allEnvironments, setAllEnvironments] = useState([]);
  useEffect(() => {
    getEnvironment();
  }, []);

  const getEnvironment = async () => {
    const { data } = await axios.get(
      `/environment/names/testCase/${currentTestCaseId}`
    );
    data.length > 0 &&
      form.setFieldsValue({
        environment: data[0].id,
      });

    setAllEnvironments(data);
  };
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
      // closable={false}
    >
      <Loading loading={loading}>
        <Form
          form={form}
          name="execute"
          onFinish={handleExecute}
          labelCol={{ span: 7 }}
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
            <Input name="name" showCount maxLength={50} />
          </Form.Item>

          <Form.Item
            name="environment"
            label="Environment"
            rules={[
              {
                required: allEnvironments.length > 0 ? true : false,
                message: "Please input Name!",
              },
            ]}
          >
            <Select showSearch style={{ minWidth: "160px" }}>
              {allEnvironments.map((el, i) => {
                return (
                  <Option value={el.id} key={i}>
                    {el.name}
                  </Option>
                );
              })}
            </Select>
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
      </Loading>
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
