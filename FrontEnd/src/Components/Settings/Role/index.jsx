import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { List, Popconfirm, Checkbox, Collapse, Button, Empty } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { deleteRole, getAllRole } from "../../../Redux/Actions/role";
import AddEditRoleModal from "./AddEditRoleModal";
import ManagePermissionModal from "./ManagePermissionModal";
import Loading from "../../Common/Loading";
const { Panel } = Collapse;
export const Role = ({
  data,
  loading,
  profile = false,
  getAllRole,
  deleteRole,
  setAddPermissionModal,
  addPermissionModal,
  singleRoleData,
  setSingleRoleData,
}) => {
  const [addEditRoleModal, setAddEditRoleModal] = useState(false);

  useEffect(() => {
    getAllRole();
  }, []);

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
          dataSource={role.permissions}
          renderItem={(permission) => (
            <List.Item>
              <List.Item.Meta
                title={<div>Permission: {permission.name}</div>}
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
      </div>
    );
  };
  return (
    <>
      <Loading loading={loading}>
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
                      justifyContent: "space-between",
                    }}
                  >
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
                      ></div>
                    </div>
                    <div
                      style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}
                    >
                      <Button
                        type="primary"
                        ghost
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRoleEdit(item);
                        }}
                      >
                        <EditOutlined style={{ cursor: "pointer" }} /> Edit Role
                      </Button>
                      <Button
                        type="primary"
                        ghost
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddPermission(item);
                        }}
                      >
                        <SettingOutlined /> Manage Permmission
                      </Button>
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
                        <Button danger ghost size="small">
                          <DeleteOutlined /> Delete Role
                        </Button>
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
        {data.length === 0 && <Empty description="No Data Found." />}
      </Loading>
      {addEditRoleModal && (
        <AddEditRoleModal
          visible={addEditRoleModal}
          setVisible={setAddEditRoleModal}
          edit={true}
          roleData={singleRoleData}
        />
      )}
      {addPermissionModal && (
        <ManagePermissionModal
          visible={addPermissionModal}
          setVisible={setAddPermissionModal}
          roleData={singleRoleData}
        />
      )}
    </>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = { deleteRole, getAllRole };

export default connect(mapStateToProps, mapDispatchToProps)(Role);
