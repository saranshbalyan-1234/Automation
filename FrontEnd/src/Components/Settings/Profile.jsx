import React from "react";
import { EditOutlined, SettingOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { Avatar, Card, Skeleton, Tag } from "antd";
function Profile({ user }) {
  const { Meta } = Card;
  return (
    <>
      <Card>
        <Skeleton loading={false} avatar active>
          <Meta
            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
            title={
              <div style={{ display: "flex", gap: "10px" }}>
                {user.name}
                {user.customerAdmin && <Tag color="blue">Customer Admin</Tag>}
              </div>
            }
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
