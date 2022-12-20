import React, { useEffect, useState } from "react";
import { Avatar, Popover, Card, Badge } from "antd";
import { connect } from "react-redux";

const UserAvatar = ({ userList, user, size = "small", self, log }) => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const temp = [...userList, self]?.find((el) => {
      return el.id === user;
    });
    temp.id && setUserData(temp);
    // eslint-disable-next-line
  }, [userList, user]);

  const getUserData = () => {
    return (
      <Badge.Ribbon
        text={
          userData.verifiedAt
            ? userData.active
              ? "Active"
              : "Inactive"
            : "Verification Pending"
        }
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
              {userData.name}
            </div>
          }
          description={userData.email}
        />
      </Badge.Ribbon>
    );
  };
  if (!userData.id || !user) return;

  return (
    <Popover content={getUserData}>
      {userData.profileImage ? (
        <Avatar
          src={"data:image/jpeg;base64," + userData.profileImage}
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
            {userData.id && handleAvatarInitials(userData)}
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

const mapStateToProps = (state) => ({
  userList: state.team.data,
  self: state.auth.user,
});
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(UserAvatar);
