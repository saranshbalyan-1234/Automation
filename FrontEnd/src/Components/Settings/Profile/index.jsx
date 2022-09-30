import React, { useState } from "react";
import { EditOutlined, SettingOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { Avatar, Card, Tag, Typography, Badge } from "antd";
import ChangePasswordModal from "./ChangePasswordModal";
import EditDetailsModal from "./EditDetailsModal";
import Role from "../Role";
const { Title } = Typography;
function Profile({ user }) {
  const { Meta } = Card;
  const [changePasswordModal, setChangePasswordModal] = useState(false);
  const [editDetailsModal, setEditDetailsModal] = useState(false);
  return (
    <>
      <Badge.Ribbon text="Personal Details">
        <Card>
          <Meta
            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
            title={
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                {user.name}
                <Tag color="blue">
                  {user.customerAdmin ? "Customer Admin" : "User"}
                </Tag>
              </div>
            }
            description={user.email}
          />
        </Card>
      </Badge.Ribbon>
      <div style={{ paddingTop: "10px" }}>
        {user.roles.length > 0 && (
          <Role loading={false} data={user.roles} profile={true} />
        )}
      </div>
      <Card style={{ height: "50px", marginTop: "10px" }}>
        {" "}
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            marginTop: "-10px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={() => {
              setEditDetailsModal(true);
            }}
          >
            <EditOutlined key="edit" style={{ marginRight: "10px" }} /> Edit
            Details
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={() => setChangePasswordModal(true)}
          >
            <SettingOutlined key="edit" style={{ marginRight: "10px" }} />
            Change Password
          </div>
        </div>
      </Card>
      <ChangePasswordModal
        changePasswordModal={changePasswordModal}
        setChangePasswordModal={setChangePasswordModal}
      />
      <EditDetailsModal
        editDetailsModal={editDetailsModal}
        setEditDetailsModal={setEditDetailsModal}
      />
    </>
  );
}
const mapStateToProps = (state) => ({ user: state.auth?.user });

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
