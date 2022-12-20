import React, { useEffect, useState } from "react";
import { Form, Modal, Button, Select } from "antd";
import { addMember } from "../../Redux/Actions/project";
import axios from "axios";
import { connect } from "react-redux";
import Loading from "../Common/Loading";
const { Option } = Select;
const AddProjectMemberModal = ({
  visible,
  setVisible,
  currentProject,
  loading,
  addMember,
}) => {
  const [availableMembers, setAvailableMembers] = useState([]);

  const checkAvailableMember = async (allUsers) => {
    const difference = await allUsers.filter((user) => {
      const addedMembers = currentProject.members;
      return !addedMembers.some((el) => {
        return el.id === user.id;
      });
    });
    setAvailableMembers(difference);
  };

  useEffect(() => {
    axios.get("/user").then((res) => {
      checkAvailableMember(res.data);
    });
  }, []);

  const onSubmit = async (data) => {
    const addedUser = availableMembers.find((el) => {
      return el.id === data.userId;
    });
    let payload = {
      ...addedUser,
      projectId: currentProject.id,
    };

    const result = await addMember(payload);
    result && setVisible(false);

    // const { name, description } = data;
    // const payload = { name, description, startDate, endDate };
    // if (edit) {
    //   let result = await editRole({ ...data, id: roleData.id });
    //   result && setVisible(false);
    // } else {
    //   let result = await addProject(payload);
    //   result && setVisible(false);
    // }
  };

  return (
    <Modal
      centered
      title={"Add Project Memer"}
      open={visible}
      footer={false}
      onCancel={() => {
        setVisible(false);
      }}
      // closable={false}
    >
      <Loading loading={loading}>
        <Form
          name="role"
          onFinish={onSubmit}
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 16 }}
          initialValues={{}}
        >
          <Form.Item
            name="userId"
            label="User"
            rules={[
              {
                required: true,
                message: "Please select user!",
              },
            ]}
          >
            <Select
              placeholder="Select an user"
              style={{ minWidth: "160px" }}
              showSearch
            >
              {availableMembers.map((el, i) => {
                return (
                  <Option value={el.id} key={i}>
                    {`${el.name}-${el.email}`}
                  </Option>
                );
              })}
            </Select>
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
  currentProject: state.projects.currentProject,
  loading: state.projects.loading,
});
const mapDispatchToProps = { addMember };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddProjectMemberModal);
