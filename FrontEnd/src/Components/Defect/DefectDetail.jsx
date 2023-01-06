import React from "react";
import { Form, Input, Button, Select, InputNumber } from "antd";
import ReactQuill from "react-quill";
import { connect } from "react-redux";
import Loading from "../Common/Loading";
import { useNavigate } from "react-router-dom";
import { saveDefect } from "../../Redux/Actions/defect";
import UserAvatar from "../Common/Avatar";
const AddEditModal = ({
  editData,
  setEditData,
  loading,
  edit = false,
  saveDefect,
  onEdit,
  projectMembers,
}) => {
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    let result = false;
    if (edit) {
      result = await onEdit(data);
      setEditData({});
    } else {
      result = await saveDefect(data);
    }
    result && navigate(`/Defect/${result.id}/Details`);
  };

  return (
    <div style={{ paddingTop: 10, display: "flex", flexWrap: "wrap" }}>
      <div
        style={{
          width: 700,
        }}
      >
        <Loading loading={loading}>
          <Form
            name={"Defect"}
            onFinish={onSubmit}
            labelCol={{ span: 5 }}
            initialValues={{
              name: edit ? editData.name : "",
              description: edit ? editData.description : "",
              tags: edit
                ? editData.tags
                  ? editData.tags
                  : undefined
                : undefined,
            }}
          >
            <div
              style={{
                display: "flex",
                gap: 20,
                justifyContent: edit ? "space-between" : "center",
                marginBottom: 20,
              }}
            >
              {edit && <div style={{ fontWeight: 600 }}>Defect Id:</div>}
              <div style={{ display: "flex", gap: 20 }}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
                <Button
                  onClick={() => {
                    navigate(-1);
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
            <div
              style={{
                background:
                  "0% 0% no-repeat padding-box padding-box rgb(247, 247, 247)",
                boxShadow: "rgb(0 0 0 / 7%) 3px 3px 22px inset",
                borderRadius: 12,
                padding: 20,
              }}
            >
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
                <Input name="name" showCount />
              </Form.Item>
              <Form.Item name="description" label="Description">
                <ReactQuill
                  placeholder="Enter Description"
                  name="description"
                />
              </Form.Item>
              <Form.Item name="tags" label="Tags">
                <Select mode="tags" placeholder="Tags" />
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
                <div style={{ display: "flex", gap: 20, zIndex: -1 }}>
                  <Select placeholder="Assignee" style={{ width: 200 }}>
                    {projectMembers.map((el) => {
                      return (
                        <Select.Option value={el.id}>
                          <div style={{ display: "flex" }}>
                            <div style={{ minWidth: 30 }}>
                              <UserAvatar user={el.id} />
                            </div>
                            <div
                              style={{
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {el.name}
                            </div>
                          </div>
                        </Select.Option>
                      );
                    })}
                  </Select>
                  <div>Reporter: </div>
                </div>
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
                <Select placeholder="Status" style={{ width: 200 }} />
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
                <Select placeholder="Priority" style={{ width: 200 }} />
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
                <Select placeholder="Severity" style={{ width: 200 }} />
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
                <InputNumber
                  min={1}
                  placeholder="Estimated Time"
                  style={{ width: 200 }}
                  addonAfter="Hour"
                />
              </Form.Item>
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
});
const mapDispatchToProps = { saveDefect };

export default connect(mapStateToProps, mapDispatchToProps)(AddEditModal);
