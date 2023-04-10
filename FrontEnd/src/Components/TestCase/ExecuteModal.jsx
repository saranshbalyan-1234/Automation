import React, { useEffect, useState } from "react";
import { Form, Input, Modal, Button, Select, Switch, InputNumber } from "antd";
import { connect } from "react-redux";
import { executeTestCase } from "../../Redux/Actions/testCase";
import ReactQuill from "react-quill";
import Loading from "../Common/Loading";
import { getAllMachines } from "../../Redux/Actions/machines";
import axios from "axios";
const ExecuteModal = ({
  visible,
  setVisible,
  loading,
  executeTestCase,
  currentTestCaseId,
  addExecutionPermission,
  machines,
  getAllMachines,
  machinesLoading,
}) => {
  const [form] = Form.useForm();
  const [allEnvironments, setAllEnvironments] = useState([]);
  const [envLoading, setEnvLoading] = useState(false);
  useEffect(() => {
    getEnvironment();
    machines.length == 0 && getAllMachines();
    // eslint-disable-next-line
  }, []);

  const getEnvironment = async () => {
    setEnvLoading(true);
    const { data } = await axios.get(
      `/environment/names/testCase/${currentTestCaseId}`
    );
    data.length > 0 &&
      form.setFieldsValue({
        environment: data[0].id,
      });
    setEnvLoading(false);
    setAllEnvironments(data);
  };
  const handleExecute = async (data) => {
    let payload = { ...data };
    delete payload.machine;
    await executeTestCase(currentTestCaseId, data.machine, payload);
    setVisible(false);
  };
  return (
    <Modal
      centered
      title={`Execute`}
      open={visible}
      footer={false}
      onCancel={() => {
        setVisible(false);
      }}
    >
      <Loading loading={loading || envLoading || machinesLoading}>
        <Form
          form={form}
          name="execute"
          onFinish={handleExecute}
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 16 }}
          initialValues={{
            continueOnError: false,
            recordAllSteps: false,
            bots: 1,
          }}
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
          {allEnvironments.length > 0 && (
            <Form.Item
              name="environment"
              label="Environment"
              rules={[
                {
                  required: true,
                  message: "Please Select Environment!",
                },
              ]}
            >
              <Select
                showSearch
                style={{ minWidth: "160px" }}
                optionFilterProp="children"
              >
                {allEnvironments.map((el, i) => {
                  return (
                    <Select.Option value={el.id} key={i}>
                      {el.name}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
          )}
          <Form.Item
            name="machine"
            label="Machine"
            rules={[
              {
                required: true,
                message: "Please Select Machine!",
              },
            ]}
          >
            <Select
              showSearch
              style={{ minWidth: "160px" }}
              optionFilterProp="children"
            >
              {machines.map((el, i) => {
                return (
                  <Select.Option value={el.url} key={i}>
                    {el.name}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>

          <Form.Item
            name="bots"
            label="Bots"
            rules={[
              {
                required: true,
                message: "Please input number of bots!",
              },
            ]}
          >
            <InputNumber min={1} />
          </Form.Item>
          <Form.Item
            name="continueOnError"
            label="Continue On Error"
            valuePropName="checked"
          >
            <Switch checkedChildren="Yes" unCheckedChildren="No" />
          </Form.Item>
          <Form.Item
            name="recordAllSteps"
            label="Record All Steps"
            valuePropName="checked"
          >
            <Switch checkedChildren="Yes" unCheckedChildren="No" />
          </Form.Item>
          <Form.Item name="headless" label="Headless" valuePropName="checked">
            <Switch checkedChildren="Yes" unCheckedChildren="No" />
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
              disabled={!addExecutionPermission}
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
  machines: state.machines.data,
  machinesLoading: state.machines.loading,
});
const mapDispatchToProps = { executeTestCase, getAllMachines };

export default connect(mapStateToProps, mapDispatchToProps)(ExecuteModal);
