import React from "react";
import { Form, Input, Modal, Button, Spin } from "antd";
import { addRole, editRole } from "../../../Redux/Actions/role";
import { connect } from "react-redux";
import { LoadingOutlined } from "@ant-design/icons";
const loadingIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
const AddEditRoleModal = ({
  visible,
  setVisible,
  editRole,
  addRole,
  edit = false,
  roles,
  roleData,
  setAddPermissionModal,
  setSingleRoleData,
}) => {
  const onSubmit = async (data) => {
    if (edit) {
      let result = await editRole({ ...data, id: roleData.id });
      result && setVisible(false);
    } else {
      let result = await addRole(data);
      if (result) {
        await setSingleRoleData({ ...result, permissions: [] });
        setAddPermissionModal(true);
        setVisible(false);
      }
    }
  };

  return (
    <Modal
      centered
      title={edit ? "Edit Role" : "Add Role"}
      visible={visible}
      footer={false}
      onCancel={() => {
        setVisible(false);
      }}
      closable={false}
    >
      <Spin spinning={roles.loading} indicator={loadingIcon}>
        <Form
          name="role"
          onFinish={onSubmit}
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ name: edit ? roleData.name : "" }}
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

          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              type="primary"
              style={{ marginRight: "20px" }}
              htmlType="submit"
            >
              {edit ? "Edit" : "Add"} Role
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
  );
};
const mapStateToProps = (state) => ({ roles: state.roles });
const mapDispatchToProps = { addRole, editRole };

export default connect(mapStateToProps, mapDispatchToProps)(AddEditRoleModal);
