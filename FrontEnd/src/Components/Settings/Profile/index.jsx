import React, { useState } from "react";
import { EditOutlined, SettingOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { Avatar, Card, Tag, Typography } from "antd";
import ChangePassword from "./ChangePassword";
import EditDetails from "./EditDetails";
import Role from "../Role";
const { Title } = Typography;
function Profile({ user }) {
  const { Meta } = Card;
  const [changePasswordModal, setChangePasswordModal] = useState(false);
  const [editDetailsModal, setEditDetailsModal] = useState(false);
  return (
    <>
      <Card>
        <Meta
          avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
          title={
            <div style={{ display: "flex", gap: "10px" }}>
              {user.name}
              <Tag color="blue">
                {user.customerAdmin ? "Customer Admin" : "User"}
              </Tag>
            </div>
          }
          description={user.email}
        />
      </Card>
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
      <ChangePassword
        changePasswordModal={changePasswordModal}
        setChangePasswordModal={setChangePasswordModal}
      />
      <EditDetails
        editDetailsModal={editDetailsModal}
        setEditDetailsModal={setEditDetailsModal}
      />
    </>
  );
}
const mapStateToProps = (state) => ({ user: state.auth?.user });

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
