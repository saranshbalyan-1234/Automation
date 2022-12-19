import React from "react";
import { Avatar, Popover, Card, Badge } from "antd";
import { connect } from "react-redux";

export const UserAvatar = ({ user, size = "small", images }) => {
  const imageName = user.email.replace(/[^a-zA-Z0-9 ]/g, "");

  const getUserData = () => {
    return (
      <Badge.Ribbon
        text={user.active ? "Active" : "Inactive"}
        style={{ marginTop: "-10px" }}
      >
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
      </Badge.Ribbon>
    );
  };
  return (
    <Popover content={getUserData}>
      {images[imageName] && false ? (
        <Avatar
          src={"data:image/jpeg;base64," + images[imageName]}
          size={size}
          style={{
            backgroundColor: "#f56a00",
            cursor: "pointer",
          }}
        >
          <div style={{ marginTop: "-1px", textTransform: "uppercase" }}>
            {handleAvatarInitials(user)}
          </div>
        </Avatar>
      ) : (
        <Avatar
          size={size}
          style={{
            backgroundColor: "#f56a00",
            cursor: "pointer",
          }}
        >
          <div style={{ marginTop: "-1px", textTransform: "uppercase" }}>
            {handleAvatarInitials(user)}
          </div>
        </Avatar>
      )}
    </Popover>
  );
};
export const handleAvatarInitials = (user) => {
  const temp = user.name?.split(" ");
  const initials = temp
    ?.map((el) => {
      return el[0];
    })
    .join("");
  return initials;
};

const mapStateToProps = (state) => ({ images: state.image });
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(UserAvatar);
