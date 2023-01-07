import React, { useEffect, useState } from "react";
import { Form, Modal, Button, Select, Tooltip } from "antd";
import { addMember } from "../../Redux/Actions/project";
import { connect } from "react-redux";
import Loading from "../Common/Loading";
const { Option } = Select;
const AddProjectMemberModal = ({
  visible,
  setVisible,
  currentProject,
  loading,
  addMember,
  allUsers,
}) => {
  const [availableMembers, setAvailableMembers] = useState([]);

  const checkAvailableMember = async () => {
    const difference = await allUsers.filter((user) => {
      const addedMembers = currentProject.members;
      return !addedMembers.some((el) => {
        return el.id === user.id;
      });
    });
    setAvailableMembers(difference);
  };

  useEffect(() => {
    checkAvailableMember();
    // eslint-disable-next-line
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
                    <Tooltip title={el.email}>{el.name}</Tooltip>
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
  allUsers: state.team.data,
});
const mapDispatchToProps = { addMember };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddProjectMemberModal);
