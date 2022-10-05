import React from "react";
import { Avatar, Tooltip } from "antd";
export const UserAvatar = ({ name, size = "small" }) => {
  const handleAvatarInitials = () => {
    const temp = name?.split(" ");
    if (temp.length > 1) return temp[0][0] + temp[1][0];
    else return temp[0][0];
  };
  return (
    <Tooltip title={name} placement="top">
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
    </Tooltip>
  );
};

export default UserAvatar;
