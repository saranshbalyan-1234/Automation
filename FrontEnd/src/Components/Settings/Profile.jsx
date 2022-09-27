import React from "react";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { connect } from "react-redux";
import { Avatar, Card, Skeleton } from "antd";
function Profile({ user }) {
  const { Meta } = Card;
  return (
    <>
      <Card>
        <Skeleton loading={false} avatar active>
          <Meta
            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
            title={user.name}
            description={user.email}
          />
        </Skeleton>
      </Card>
      <Card style={{ height: "50px" }}>
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
          >
            <SettingOutlined key="edit" style={{ marginRight: "10px" }} />
            Change Password
          </div>
        </div>
      </Card>
    </>
  );
}
const mapStateToProps = (state) => ({ user: state.auth?.user });

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
