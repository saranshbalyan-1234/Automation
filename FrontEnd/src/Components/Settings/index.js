import React, { useState, useEffect } from "react";
import { Tabs, Button } from "antd";
import Profile from "./Profile";
import Team from "./Team";
import Role from "./Role";
import { PlusOutlined, EditOutlined, SettingOutlined } from "@ant-design/icons";
import AddUserModal from "./Team/AddUserModal";
import EditDetailsModal from "./Profile/EditDetailsModal";
import ChangePasswordModal from "./Profile/ChangePasswordModal";
import AddEditRoleModal from "./Role/AddEditRoleModal";
import { connect } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import MemberBadge from "../Common/MemberBadge";
function Setting({ roles, team }) {
  const { tab } = useParams();
  const navigate = useNavigate();
  const [editUserId, setEditUserId] = useState(0);
  const [activeTab, setActiveTab] = useState("profile");
  const [addUserModal, setAddUserModal] = useState(false);
  const [addRoleModal, setAddRoleModal] = useState(false);
  const [changePasswordModal, setChangePasswordModal] = useState(false);
  const [addPermissionModal, setAddPermissionModal] = useState(false);
  const [singleRoleData, setSingleRoleData] = useState({ id: null, name: "" });
  const [editDetailsModal, setEditDetailsModal] = useState(false);
  const [manageUserModal, setManageUserModal] = useState(false);

  const handleActiveTab = (value) => {
    navigate(`/settings/${value}`);
  };

  useEffect(() => {
    setActiveTab(tab);
  }, [tab]);

  const renderButton = () => {
    if (activeTab === "roles")
      return (
        <Button
          type="primary"
          ghost
          style={{ position: "absolute", right: 0, top: 10 }}
          onClick={() => {
            setAddRoleModal(true);
          }}
        >
          <PlusOutlined /> Add Role
        </Button>
      );
    else if (activeTab === "team")
      return (
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 10,
            display: "flex",
            gap: 40,
          }}
        >
          <div>
            <MemberBadge members={team} />
          </div>
          <Button
            type="primary"
            ghost
            onClick={() => {
              setAddUserModal(true);
            }}
          >
            <PlusOutlined /> Add User
          </Button>
        </div>
      );
    else if (activeTab === "profile")
      return (
        <div
          style={{
            display: "flex",
          }}
        >
          <Button
            type="primary"
            ghost
            style={{ position: "absolute", right: 180, top: 10 }}
            onClick={() => {
              setEditDetailsModal(true);
            }}
          >
            <EditOutlined key="edit" /> Edit Details
          </Button>
          <Button
            type="primary"
            ghost
            style={{ position: "absolute", right: 0, top: 10 }}
            onClick={() => setChangePasswordModal(true)}
          >
            <SettingOutlined key="edit" />
            Change Password
          </Button>
        </div>
      );
  };
  return (
    <>
      <div style={{ display: "flex", position: "relative" }}>
        <Tabs
          activeKey={activeTab}
          style={{ minWidth: "100%" }}
          onChange={handleActiveTab}
        >
          <Tabs.TabPane tab="Profile" key="profile">
            <Profile />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Roles" key="roles">
            {activeTab === "roles" && (
              <Role
                data={roles.data}
                loading={roles.loading}
                setAddPermissionModal={setAddPermissionModal}
                addPermissionModal={addPermissionModal}
                singleRoleData={singleRoleData}
                setSingleRoleData={setSingleRoleData}
              />
            )}
          </Tabs.TabPane>
          <Tabs.TabPane tab="Team" key="team">
            {activeTab === "team" && (
              <Team
                manageUserModal={manageUserModal}
                setManageUserModal={setManageUserModal}
                setEditUserId={setEditUserId}
                editUserId={editUserId}
              />
            )}
          </Tabs.TabPane>
          {/* <Tabs.TabPane tab="Notification" key="notification">
            <ComingSoon />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Billing" key="billing">
            <ComingSoon />
          </Tabs.TabPane> */}
        </Tabs>
        {renderButton()}
      </div>
      <AddUserModal
        addUserModal={addUserModal}
        setAddUserModal={setAddUserModal}
        setManageUserModal={setManageUserModal}
        setEditUserId={setEditUserId}
      />
      <ChangePasswordModal
        changePasswordModal={changePasswordModal}
        setChangePasswordModal={setChangePasswordModal}
      />
      <EditDetailsModal
        editDetailsModal={editDetailsModal}
        setEditDetailsModal={setEditDetailsModal}
      />
      {addRoleModal && (
        <AddEditRoleModal
          visible={addRoleModal}
          setVisible={setAddRoleModal}
          setAddPermissionModal={setAddPermissionModal}
          // roleData={roleData}
          setSingleRoleData={setSingleRoleData}
        />
      )}
    </>
  );
}
const mapStateToProps = (state) => ({
  roles: state.roles,
  team: state.team.data,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Setting);
