import React, { useState } from "react";
import { connect } from "react-redux";
import { List, Spin, Popconfirm, Checkbox, Collapse, Button } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {
  deleteRole,
  removePermissionFromRole,
} from "../../../Redux/Actions/role";
import AddEditRoleModal from "./AddEditRoleModal";
import AddPermissionModal from "./AddPermissionModal";
const { Panel } = Collapse;
export const Role = ({
  data,
  loading,
  profile = false,
  deleteRole,
  removePermissionFromRole,
  setAddPermissionModal,
  addPermissionModal,
  singleRoleData,
  setSingleRoleData,
}) => {
  const [addEditRoleModal, setAddEditRoleModal] = useState(false);

  const handleRoleEdit = (item) => {
    setAddEditRoleModal(true);
    setSingleRoleData(item);
  };
  const handleAddPermission = (item) => {
    setAddPermissionModal(true);
    setSingleRoleData(item);
  };
  const renderPermission = (role) => {
    return (
      <div style={{ paddingLeft: "30px" }}>
        <List
          className="demo-loadmore-list"
          dataSource={role.permissions}
          renderItem={(permission) => (
            <List.Item>
              <List.Item.Meta
                title={
                  <div>
                    Permission: {permission.name}{" "}
                    <Popconfirm
                      title="Are you sure to remove this permission?"
                      onConfirm={() => {
                        removePermissionFromRole(role.id, permission.id);
                      }}
                      okText="Yes, Remove"
                      cancelText="No"
                    >
                      <DeleteOutlined style={{ marginTop: "5px" }} />
                    </Popconfirm>
                  </div>
                }
                description={
                  <div
                    style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}
                  >
                    <div style={{ display: "flex", gap: "5px" }}>
                      View: <Checkbox checked={permission.view} />
                    </div>

                    <div style={{ display: "flex", gap: "5px" }}>
                      Add: <Checkbox checked={permission.add} />
                    </div>

                    <div style={{ display: "flex", gap: "5px" }}>
                      Edit: <Checkbox checked={permission.edit} />
                    </div>

                    <div style={{ display: "flex", gap: "5px" }}>
                      Delete: <Checkbox checked={permission.delete} />
                    </div>
                  </div>
                }
              />
            </List.Item>
          )}
        />
        <Button
          type="primary"
          ghost
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            handleAddPermission(role);
          }}
        >
          Add Permmissions
        </Button>
      </div>
    );
  };
  return (
    <>
      <Spin spinning={loading}>
        {data.map((item, index) => {
          return (
            <Collapse style={{ marginTop: "10px" }} key={index}>
              <Panel
                header={
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "10px",
                      alignItems: "center",
                    }}
                  >
                    Role: {item.name}
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "5px",
                      }}
                    >
                      <EditOutlined
                        style={{ cursor: "pointer", marginTop: "5px" }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRoleEdit(item);
                        }}
                      />
                      <Popconfirm
                        title="Are you sure to delete this Role?"
                        onConfirm={(e) => {
                          e.stopPropagation();
                          deleteRole(item.id);
                        }}
                        okText="Yes, Delete"
                        cancelText="No"
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <DeleteOutlined style={{ marginTop: "5px" }} />
                      </Popconfirm>
                    </div>
                  </div>
                }
              >
                {renderPermission(item)}
              </Panel>
            </Collapse>
          );
        })}
      </Spin>
      {addEditRoleModal && (
        <AddEditRoleModal
          visible={addEditRoleModal}
          setVisible={setAddEditRoleModal}
          edit={true}
          roleData={singleRoleData}
        />
      )}
      {addPermissionModal && (
        <AddPermissionModal
          visible={addPermissionModal}
          setVisible={setAddPermissionModal}
          roleData={singleRoleData}
        />
      )}
    </>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = { deleteRole, removePermissionFromRole };

export default connect(mapStateToProps, mapDispatchToProps)(Role);
