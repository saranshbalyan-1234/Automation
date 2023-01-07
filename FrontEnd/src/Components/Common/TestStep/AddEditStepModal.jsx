import React, { useEffect, useState } from "react";
import { Form, Modal, Button, Select, Switch } from "antd";
import { connect } from "react-redux";
import { addProcess } from "../../../Redux/Actions/testCase";
import {
  addStep,
  editStep,
  createTestCaseLogs,
} from "../../../Redux/Actions/testCase";
import { getStepEditedLogs } from "../../../Utils/logs";
import { getObjectByProject } from "../../../Redux/Actions/object";
import {
  addReusableStep,
  editReusableStep,
  createReusableProcessLogs,
} from "../../../Redux/Actions/reusableProcess";
import AddEditObjectModal from "../../ObjectBank/AddEditObjectModal";
import axios from "axios";
import { saveObject } from "../../../Redux/Actions/object";
import ReactQuill from "react-quill";
import Loading from "../Loading";
import Parameter from "./Parameter";
const Option = { Select };
const AddEditStepModal = ({
  visible,
  setVisible,
  editData,
  editStep,
  editReusableStep,
  setEditData,
  loading,
  edit = false,
  step,
  addStep,
  addReusableStep,
  process,
  reusableProcess,
  currentProjectId,
  objectList,
  getObjectByProject,
  objectLoading,
  saveObject,
  setEdit = () => {},
  currentTestCaseId,
}) => {
  const [actionEvent, setActionEvent] = useState([]);
  const [currentEvent, setCurrentEvent] = useState({});
  const [addObjectModal, setAddObjectModal] = useState(false);

  const [form] = Form.useForm();

  useEffect(() => {
    axios.get("/global/actionEvent").then((res) => {
      setActionEvent(res.data);
      if (edit)
        setCurrentEvent(
          res.data.find((el) => {
            return el.name === editData.actionEvent;
          })
        );
      else
        setCurrentEvent(
          res.data.find((el) => {
            return el.name === "Launch Website";
          })
        );
    });
    // eslint-disable-next-line
  }, [edit]);

  useEffect(() => {
    edit &&
      form.setFieldsValue({
        parameter1:
          editData.testParameters?.find((el) => {
            return el.type === currentEvent.parameter1;
          })?.property || "",
        parameter2:
          editData.testParameters?.find((el) => {
            return el.type === currentEvent.parameter2;
          })?.property || "",
        parameter3:
          editData.testParameters?.find((el) => {
            return el.type === currentEvent.parameter3;
          })?.property || "",
        parameter4:
          editData.testParameters?.find((el) => {
            return el.type === currentEvent.parameter4;
          })?.property || "",
      });

    form.setFieldsValue({
      type1:
        editData?.testParameters?.find((el) => {
          return el.type === currentEvent.parameter1;
        })?.method || "Static",
      type2:
        editData?.testParameters?.find((el) => {
          return el.type === currentEvent.parameter2;
        })?.method || "Static",
      type3:
        editData?.testParameters?.find((el) => {
          return el.type === currentEvent.parameter3;
        })?.method || "Static",
      type4:
        editData?.testParameters?.find((el) => {
          return el.type === currentEvent.parameter4;
        })?.method || "Static",
    });
    // eslint-disable-next-line
  }, [currentEvent, edit]);

  useEffect(() => {
    currentProjectId && getObjectByProject();
    // eslint-disable-next-line
  }, [currentProjectId]);

  const onSubmit = async (data) => {
    let result = false;

    let payload = { ...data, parameters: [] };

    if (currentEvent.parameter1) {
      const key = currentEvent.parameter1;
      const value = data.parameter1;
      const method = data.type1;
      payload.parameters.push({ type: key, property: value, method });
      delete payload.parameter1;
      delete payload.type1;
    }
    if (currentEvent.parameter2) {
      const key = currentEvent.parameter2;
      const value = data.parameter2;
      const method = data.type2;
      payload.parameters.push({ type: key, property: value, method });
      delete payload.parameter2;
      delete payload.type2;
    }
    if (currentEvent.parameter3) {
      const key = currentEvent.parameter3;
      const value = data.parameter3;
      const method = data.type3;
      payload.parameters.push({ type: key, property: value, method });
      delete payload.parameter3;
      delete payload.type3;
    }

    if (currentEvent.parameter4) {
      const key = currentEvent.parameter4;
      const value = data.parameter4;
      const method = data.type4;
      payload.parameters.push({ type: key, property: value, method });
      delete payload.parameter4;
      delete payload.type4;
    }

    if (edit) {
      if (reusableProcess?.id && !process?.id) {
        result = await editReusableStep({
          data: payload,
          stepId: editData.id,
        });
        if (result) {
          const logs = await getStepEditedLogs(editData, payload, "step ");
          logs.length > 0 &&
            createReusableProcessLogs(reusableProcess.id, logs);
        }
      } else {
        result = await editStep({
          data: payload,
          stepId: editData.id,
          reusableProcessId: reusableProcess?.id,
          processId: process?.id,
        });
        if (result) {
          const logs = await getStepEditedLogs(editData, payload, "step ");
          logs.length > 0 && createTestCaseLogs(currentTestCaseId, logs);
        }
      }

      setEditData({});
    } else {
      if (reusableProcess?.id && !process?.id) {
        result = await addReusableStep({
          ...payload,
          reusableProcessId: reusableProcess.id,
          step,
        });
        if (result) {
          createReusableProcessLogs(reusableProcess?.id, [
            `added new step at position ${step}`,
          ]);
        }
      } else {
        if (reusableProcess?.id && process?.id) {
          result = await addStep({
            ...payload,
            reusableProcessId: reusableProcess.id,
            step,
            reusableId: process?.id,
          });
          if (result) {
            createReusableProcessLogs(reusableProcess.id, [
              `added new step at position ${step}`,
            ]);
            createTestCaseLogs(currentTestCaseId, [
              `added new step at position ${step} in reusableProcess "${reusableProcess.name}" or process "${process.name}"`,
            ]);
          }
        } else {
          result = await addStep({
            ...payload,
            processId: process?.id,
            step,
          });
          if (result) {
            createTestCaseLogs(currentTestCaseId, [
              `added new step at position ${step} in process "${process?.name}"`,
            ]);
          }
        }
      }
    }
    if (step === 1 && edit === false) setEdit(true);
    result && setVisible(false);
  };

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <Modal
        width={700}
        centered
        title={
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginRight: 27,
            }}
          >
            <div>{edit ? "Edit Step" : "Create New Step"}</div>
            {currentEvent.object && (
              <Button
                type="primary"
                ghost
                onClick={() => {
                  setAddObjectModal(true);
                }}
              >
                Add New Object
              </Button>
            )}
          </div>
        }
        open={visible}
        footer={false}
        onCancel={() => {
          setVisible(false);
        }}
        // closable={false}
      >
        <Loading loading={loading}>
          <Form
            form={form}
            name="testStep"
            onFinish={onSubmit}
            labelCol={{ span: 7 }}
            wrapperCol={{ span: 16 }}
            initialValues={{
              name: edit ? editData.name : "",
              comment: edit ? editData.comment : "",
              actionEvent: edit ? editData.actionEvent : "Launch Website",
              objectId: edit ? editData.object?.id : "",
              screenshot: edit ? editData.screenshot : false,
            }}
          >
            <Form.Item
              name="actionEvent"
              label="Action Event"
              rules={[
                {
                  required: true,
                  message: "Please input Name!",
                },
              ]}
            >
              <Select
                showSearch
                style={{ minWidth: "160px" }}
                onChange={(e) =>
                  setCurrentEvent(
                    actionEvent.find((el) => {
                      return el.name === e;
                    })
                  )
                }
              >
                {actionEvent.map((el, i) => {
                  return (
                    <Option value={el.name} key={i}>
                      {el.name}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>

            {currentEvent.object && (
              <Form.Item
                name="objectId"
                label="Object"
                rules={[
                  {
                    required: true,
                    message: "Please select object!",
                  },
                ]}
              >
                <Select style={{ minWidth: "160px" }} showSearch>
                  {objectList.map((el, i) => {
                    return (
                      <Option value={el.id} key={i}>
                        {el.name}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            )}

            <Parameter currentEvent={currentEvent} />

            <Form.Item
              name="screenshot"
              label="Screenshot"
              valuePropName="checked"
            >
              <Switch checkedChildren="Yes" unCheckedChildren="No" />
            </Form.Item>
            <Form.Item name="comment" label="">
              <ReactQuill
                style={{ width: 650 }}
                placeholder="Enter Comment"
                name="comment"
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

      <AddEditObjectModal
        visible={addObjectModal}
        setVisible={setAddObjectModal}
        loading={objectLoading}
        name={"Object"}
        onSave={saveObject}
      />
    </div>
  );
};
const mapStateToProps = (state) => ({
  loading: state.testCase.loading,
  currentProjectId: state.projects.currentProject.id,
  currentTestCaseId: state.testCase.currentTestCase.id,
  objectList: state.objectBank.data,
  objectLoading: state.objectBank.loading,
});
const mapDispatchToProps = {
  addProcess,
  editStep,
  addStep,
  addReusableStep,
  editReusableStep,
  getObjectByProject,
  saveObject,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddEditStepModal);
