import React from "react";
import { Form, Input, Modal, Button, DatePicker } from "antd";
import { addProject, editProject } from "../../Redux/Actions/project";
import { connect } from "react-redux";
import ReactQuill from "react-quill";
import moment from "moment";
import Loading from "../Common/Loading";
const { RangePicker } = DatePicker;
const AddEditProjectModal = ({
  visible,
  setVisible,
  editProject,
  addProject,
  edit = false,
  projects,
}) => {
  const format = "YYYY/MM/DD";
  const onSubmit = async (data) => {
    const { name, description } = data;
    let startDate = moment(data.date[0]).format(format);
    let endDate = moment(data.date[1]).format(format);
    const payload = { name, description, startDate, endDate };
    if (edit) {
      let result = await editProject(payload);
      result && setVisible(false);
    } else {
      let result = await addProject(payload);
      result && setVisible(false);
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
      // closable={false}
      width={500}
    >
      <Loading loading={projects.loading}>
        <Form
          name="project"
          onFinish={onSubmit}
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 16 }}
          initialValues={{
            name: edit ? projects.currentProject.name : "",
            description: edit ? projects.currentProject.description : "",
            date: edit
              ? [
                  moment(projects.currentProject.startDate, format),
                  moment(projects.currentProject.endDate, format),
                ]
              : [],
          }}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                message: "Please input project name!",
              },
            ]}
          >
            <Input name="name" showCount maxLength={30} />
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
          <Form.Item name="description" label="">
            {/* <TextArea name="description" showCount maxLength={100} /> */}

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
const mapStateToProps = (state) => ({ projects: state.projects });
const mapDispatchToProps = { addProject, editProject };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddEditProjectModal);
