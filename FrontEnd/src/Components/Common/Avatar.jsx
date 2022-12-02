import React from "react";
import { Avatar, Popover, Card, Badge } from "antd";
import { connect } from "react-redux";
import { fetchAwsObject } from "../../Redux/Actions/image";
export const UserAvatar = ({
  user,
  size = "small",
  images,
  // fetchAwsObject,
}) => {
  const imageName = user.email.replace(/[^a-zA-Z0-9 ]/g, "");
  // useEffect(() => {
  //   if (user.profileImage && !images[imageName]) {
  //     fetchAwsObject(imageName);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

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
  if (temp.length > 1) return temp[0][0] + temp[1][0];
  else return temp[0][0];
};

const mapStateToProps = (state) => ({ images: state.image });

const mapDispatchToProps = { fetchAwsObject };

export default connect(mapStateToProps, mapDispatchToProps)(UserAvatar);
