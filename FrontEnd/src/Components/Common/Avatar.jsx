import React, { useState } from "react";
import { Avatar, Tooltip, Popover, Spin, Card, Tag, Badge } from "antd";
export const UserAvatar = ({ user, size = "small" }) => {
  const [popover, setPopover] = useState(false);
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
        <Card>
          <Card.Meta
            title={
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                {user.name}
              </div>
            }
            description={user.email}
          />
        </Card>
      </Badge.Ribbon>
      // <div style={{ display: "flex", flexDirection: "column" }}>
      //   <div>Name: {user.name}</div>
      //   <div>Email: {user.email}</div>
      //   <div>Status:{user.active == true ? "Active" : "Inactive"}</div>
      // </div>
    );
  };
  return (
    // <Tooltip title={name} placement="top">
    <Popover content={getUserData} visible={popover}>
      <Avatar
        size={size}
        style={{
          backgroundColor: "#f56a00",
          cursor: "pointer",
        }}
        onMouseEnter={() => {
          setPopover(true);
        }}
        onMouseLeave={() => {
          setPopover(false);
        }}
      >
        <div style={{ marginTop: "-1px", textTransform: "uppercase" }}>
          {handleAvatarInitials()}
        </div>
      </Avatar>
    </Popover>
    // </Tooltip>
  );
};

export default UserAvatar;
