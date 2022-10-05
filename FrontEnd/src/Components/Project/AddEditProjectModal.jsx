import React from "react";
import { Form, Input, Modal, Button, Spin, DatePicker } from "antd";
import { addProject } from "../../Redux/Actions/project";
import { connect } from "react-redux";
import moment from "moment";
const { TextArea } = Input;
const { RangePicker } = DatePicker;
const AddEditProjectModal = ({
  visible,
  setVisible,
  editRole,
  addProject,
  edit = false,
  projects,
  roleData,
  setAddPermissionModal,
  setSingleRoleData,
}) => {
  const format = "YYYY/MM/DD";
  const onSubmit = async (data) => {
    const { name, description } = data;
    let startDate = moment(data.date[0]).format(format);
    let endDate = moment(data.date[1]).format(format);
    const payload = { name, description, startDate, endDate };
    if (edit) {
      let result = await editRole({ ...data, id: roleData.id });
      result && setVisible(false);
    } else {
      let result = await addProject(payload);
      result && setVisible(false);
      //   if (result) {
      //     await setSingleRoleData({ ...result, permissions: [] });
      //     setAddPermissionModal(true);
      //     setVisible(false);
      //   }
    }
  };

  return (
    <Modal
      title={edit ? "Edit Project" : "Add New Project"}
      visible={visible}
      footer={false}
      onCancel={() => {
        setVisible(false);
      }}
      closable={false}
    >
      <Spin spinning={projects.loading}>
        <Form
          name="role"
          onFinish={onSubmit}
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 16 }}
          initialValues={{
            name: edit ? projects.currentProject.name : "",
            description: edit ? projects.currentProject.description : "",
            date: edit &&
              projects.currentProject && [
                (moment(projects.currentProject.startDate, format),
                moment(projects.currentProject.endDate, format)),
              ],
          }}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                message: "Please input role name!",
              },
            ]}
          >
            <Input name="name" />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <TextArea name="description" showCount maxLength={100} />
          </Form.Item>
          <Form.Item
            name="date"
            label="Project Duration"
            rules={[
              {
                required: true,
                message: "Please select project date range!",
              },
            ]}
          >
            <RangePicker style={{ width: "100%" }} format={format} />
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
const mapStateToProps = (state) => ({ projects: state.projects });
const mapDispatchToProps = { addProject };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddEditProjectModal);
