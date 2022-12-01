import React, { useState } from "react";
import { Form, Input, Modal, Button } from "antd";
import ViewObjectModal from "../Common/TestStep/ViewObjectModal";
import { connect } from "react-redux";
import ReactQuill from "react-quill";
import Loading from "../Common/Loading";
const AddEditObjectModal = ({
  visible,
  setVisible,
  currentProjectId,
  editData,
  setEditData,
  loading,
  edit = false,
  onSave,
  onEdit,
  name,
}) => {
  const [viewObjectModal, setViewObjectModal] = useState(false);
  const [object, setObject] = useState({});
  const onSubmit = async (data) => {
    let result = false;
    if (edit) {
      result = await onEdit(data);
      setEditData({});
    } else {
      result = await onSave({
        ...data,
        projectId: currentProjectId,
      });
      result && setObject(result);
    }
    if (result) {
      setViewObjectModal(true);
      setVisible(false);
    }
  };

  return (
    <>
      <Modal
        title={edit ? `Edit ${name}` : `Create New ${name}`}
        visible={visible}
        footer={false}
        onCancel={() => {
          setVisible(false);
        }}
        width={500}
        // closable={false}
      >
        <Loading loading={loading}>
          <Form
            name={name}
            onFinish={onSubmit}
            labelCol={{ span: 7 }}
            wrapperCol={{ span: 16 }}
            initialValues={{
              name: edit ? editData.name : "",
              description: edit ? editData.description : "",
            }}
          >
            <Form.Item
              name="name"
              label="Name"
              rules={[
                {
                  required: true,
                  message: "Please input Name!",
                },
              ]}
            >
              <Input name="name" showCount maxLength={30} />
            </Form.Item>
            <Form.Item name="description" label="">
              {/* <Input.TextArea name="description" /> */}
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
      {viewObjectModal && (
        <ViewObjectModal
          visible={viewObjectModal}
          setVisible={setViewObjectModal}
          object={object}
          setObject={setObject}
        />
      )}
    </>
  );
};
const mapStateToProps = (state) => ({
  currentProjectId: state.projects.currentProject.id,
});
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AddEditObjectModal);
