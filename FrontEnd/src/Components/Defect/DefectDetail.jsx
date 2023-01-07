import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select, InputNumber, Tooltip, Tag } from "antd";
import ReactQuill from "react-quill";
import { connect } from "react-redux";
import Loading from "../Common/Loading";
import { useNavigate, useParams } from "react-router-dom";
import {
  getDefectById,
  saveDefect,
  editDefect,
} from "../../Redux/Actions/defect";
import { getProjectkey } from "../../Redux/Actions/project";
import UserAvatar from "../Common/Avatar";
const { Option } = Select;
const AddEditModal = ({
  loading,
  saveDefect,
  editDefect,
  projectMembers,
  setting,
  getProjectkey,
  getDefectById,
  currentDefect,
}) => {
  const [form] = Form.useForm();
  const { defectId } = useParams();
  const [editMode, setEditMode] = useState(false);
  useEffect(() => {
    defectId && getDefectById(defectId);
  }, [defectId]);

  const navigate = useNavigate();
  const onSubmit = async (data) => {
    let result = false;
    if (editMode) {
      result = await editDefect(data);
      setEditMode(false);
    } else {
      result = await saveDefect(data);
      result && navigate(`/Defect/${result.id}/details`);
    }
  };

  useEffect(() => {
    if (!editMode) return;
    form.setFieldsValue({
      title: currentDefect.title,
      description: currentDefect.description,
      tags: currentDefect.tags ? currentDefect.tags : undefined,
      assigneeId: currentDefect.assigneeId,
      reporterId: currentDefect.reporterId,
      statusId: currentDefect.statusId,
      priorityId: currentDefect.priorityId,
      severityId: currentDefect.severityId,
      estimatedTime: currentDefect.estimatedTime,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editMode]);

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      <div
        style={{
          width: 700,
        }}
      >
        <Loading loading={loading}>
          <Form
            form={form}
            name={"Defect"}
            onFinish={onSubmit}
            labelCol={{ span: 5 }}
          >
            <div
              style={{
                background:
                  "0% 0% no-repeat padding-box padding-box rgb(247, 247, 247)",
                boxShadow: "rgb(0 0 0 / 7%) 3px 3px 22px inset",
                borderRadius: 12,
                padding: 20,
                cursor: "pointer",
              }}
              onClick={() => {
                setEditMode(true);
              }}
            >
              {defectId && (
                <div
                  style={{
                    fontWeight: 600,
                    textTransform: "uppercase",
                    marginBottom: 5,
                  }}
                >
                  Defect Id: {getProjectkey() + "-D-" + defectId}
                </div>
              )}
              <Form.Item
                name="title"
                label="Title"
                rules={[
                  {
                    required: true,
                    message: "Please enter Defect Title!",
                  },
                ]}
              >
                {editMode || !defectId ? (
                  <Input name="name" showCount />
                ) : (
                  <div>{currentDefect.title}</div>
                )}
              </Form.Item>
              <Form.Item name="description" label="Description">
                {editMode || !defectId ? (
                  <ReactQuill
                    placeholder="Enter Description"
                    name="description"
                  />
                ) : (
                  <div
                    style={{ marginTop: -8 }}
                    dangerouslySetInnerHTML={{
                      __html: currentDefect.description,
                    }}
                  ></div>
                )}
              </Form.Item>
              <Form.Item name="tags" label="Tags">
                {editMode || !defectId ? (
                  <Select mode="tags" placeholder="Tags" />
                ) : currentDefect.tags?.length > 0 ? (
                  currentDefect.tags.map((el) => {
                    return <Tag>{el}</Tag>;
                  })
                ) : (
                  "N/A"
                )}
              </Form.Item>{" "}
              <Form.Item
                name="assigneeId"
                label="Assignee"
                rules={[
                  {
                    required: true,
                    message: "Please select Assignee!",
                  },
                ]}
              >
                {editMode || !defectId ? (
                  <Select placeholder="Assignee" style={{ width: 250 }}>
                    {projectMembers.map((el) => {
                      return (
                        <Option value={el.id}>
                          <Tooltip title={el.email}>{el.name}</Tooltip>
                        </Option>
                      );
                    })}
                  </Select>
                ) : (
                  <div style={{ display: "flex" }}>
                    <div style={{ width: 250 }}>
                      <UserAvatar user={currentDefect.assigneeId} />
                    </div>
                    <div style={{ display: "flex", gap: 10 }}>
                      <div> Reporter:</div>
                      <UserAvatar user={currentDefect.reporterId} />
                    </div>
                  </div>
                )}
              </Form.Item>
              <Form.Item
                name="statusId"
                label="Status"
                rules={[
                  {
                    required: true,
                    message: "Please select Status!",
                  },
                ]}
              >
                {editMode || !defectId ? (
                  <Select placeholder="Status" style={{ width: 250 }}>
                    {setting.status.map((el) => {
                      return <Option value={el.id}>{el.name}</Option>;
                    })}
                  </Select>
                ) : (
                  <div>
                    {
                      setting.status.find((el) => {
                        return el.id === currentDefect.statusId;
                      })?.name
                    }
                  </div>
                )}
              </Form.Item>
              <Form.Item
                name="priorityId"
                label="Priority"
                rules={[
                  {
                    required: true,
                    message: "Please select Priority!",
                  },
                ]}
              >
                {editMode || !defectId ? (
                  <Select placeholder="Priority" style={{ width: 250 }}>
                    {setting.priority.map((el) => {
                      return <Option value={el.id}>{el.name}</Option>;
                    })}
                  </Select>
                ) : (
                  <div>
                    {
                      setting.priority.find((el) => {
                        return el.id === currentDefect.priorityId;
                      })?.name
                    }
                  </div>
                )}
              </Form.Item>
              <Form.Item
                name="severityId"
                label="Severity"
                rules={[
                  {
                    required: true,
                    message: "Please select Severity!",
                  },
                ]}
              >
                {editMode || !defectId ? (
                  <Select placeholder="Severity" style={{ width: 250 }}>
                    {setting.severity.map((el) => {
                      return (
                        <Select.Option value={el.id}>{el.name}</Select.Option>
                      );
                    })}
                  </Select>
                ) : (
                  <div>
                    {
                      setting.severity.find((el) => {
                        return el.id === currentDefect.severityId;
                      })?.name
                    }
                  </div>
                )}
              </Form.Item>
              <Form.Item
                name="estimatedTime"
                label="Estimated Time"
                rules={[
                  {
                    required: true,
                    message: "Please enter Estimated Time!",
                  },
                ]}
              >
                {editMode || !defectId ? (
                  <InputNumber
                    min={1}
                    placeholder="Estimated Time"
                    style={{ width: 250 }}
                    addonAfter="Hour"
                  />
                ) : (
                  <div>
                    {currentDefect.estimatedTime +
                      ` ${
                        currentDefect.estimatedTime > 1 ? " hours" : " hour"
                      }`}
                  </div>
                )}
              </Form.Item>
              <div
                style={{ display: "flex", gap: 20, justifyContent: "center" }}
              >
                {(editMode || !defectId) && (
                  <>
                    <Button type="primary" htmlType="submit">
                      Submit
                    </Button>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (defectId) setEditMode(false);
                        else navigate(-1);
                      }}
                    >
                      Cancel
                    </Button>
                  </>
                )}
              </div>
            </div>
          </Form>
        </Loading>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  loading: state.defect.loading,
  projectMembers: state.projects.currentProject.members,
  setting: state.defect.setting,
  currentDefect: state.defect.currentDefect,
});
const mapDispatchToProps = {
  saveDefect,
  getProjectkey,
  getDefectById,
  editDefect,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddEditModal);
