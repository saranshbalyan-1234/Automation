import React, { useEffect, useState } from "react";
import { Avatar, Popover, Card, Badge, Image } from "antd";
import axios from "axios";
import { connect } from "react-redux";
import { fetchProfileImage } from "../../Redux/Actions/image";
export const UserAvatar = ({
  user,
  size = "small",
  images,
  fetchProfileImage,
}) => {
  const imageName = user.email.replace(/[^a-zA-Z0-9 ]/g, "");
  useEffect(() => {
    console.log("saransh", images[imageName]);
    if (user.profileImage && !images[imageName]) {
      fetchProfileImage(imageName);
    }
  }, []);

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
      {images[imageName] ? (
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
  if (temp.length > 1) return temp[0][0] + temp[1][0];
  else return temp[0][0];
};

const mapStateToProps = (state) => ({ images: state.image });

const mapDispatchToProps = { fetchProfileImage };

export default connect(mapStateToProps, mapDispatchToProps)(UserAvatar);
