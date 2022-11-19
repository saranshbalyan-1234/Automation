import React from "react";
import { Avatar, Popover, Card, Badge } from "antd";
export const UserAvatar = ({ user, size = "small" }) => {
  console.log("saransh", user);
  const handleAvatarInitials = () => {
    const temp = user.name?.split(" ");
    if (temp.length > 1) return temp[0][0] + temp[1][0];
    else return temp[0][0];
  };
  const getUserData = () => {
    return (
      <Badge.Ribbon
        text={user.active ? "Active" : "Inactive"}
        style={{ marginTop: "-10px" }}
      >
        {/* <Card> */}
        <Card.Meta
          title={
            <div
              style={{
                display: "flex",
                gap: "10px",
                flexWrap: "wrap",
                marginRight: 60,
              }}
            >
              {user.name}
            </div>
          }
          description={user.email}
        />
        {/* </Card> */}
      </Badge.Ribbon>
    );
  };
  return (
    <Popover content={getUserData}>
      <Avatar
        size={size}
        style={{
          backgroundColor: "#f56a00",
          cursor: "pointer",
        }}
      >
        <div style={{ marginTop: "-1px", textTransform: "uppercase" }}>
          {handleAvatarInitials()}
        </div>
      </Avatar>
    </Popover>
  );
};

export default UserAvatar;
