import React from "react";
import { connect } from "react-redux";
import { Avatar, Card, Tag, Badge } from "antd";

import Role from "../Role";
function Profile({ user }) {
  const { Meta } = Card;

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
      <Badge.Ribbon text={"My Roles"}>
        <div style={{ paddingTop: "10px" }}>
          {user.roles.length > 0 && (
            <Role loading={false} data={user.roles} profile={true} />
          )}
        </div>
      </Badge.Ribbon>
    </>
  );
}
const mapStateToProps = (state) => ({ user: state.auth?.user });

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
