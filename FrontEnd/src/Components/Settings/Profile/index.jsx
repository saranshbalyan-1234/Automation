import React, { useState } from "react";
import { connect } from "react-redux";
import { Card, Tag, Badge, Empty, Button, Popconfirm } from "antd";
import { deleteCustomer } from "../../../Redux/Actions/team";
import Role from "../Role";
import UploadProfileImage from "./UploadProfileImage";
import UserAvatar from "../../Common/Avatar";
const { Meta } = Card;
function Profile({ user, deleteCustomer }) {
  const [editProfileImage, setEditProfileImage] = useState(false);
  const handleDeleteCustomer = async () => {
    await deleteCustomer();
  };
  return (
    <>
      <Badge.Ribbon text="Personal Details">
        <Card>
          <Meta
            avatar={
              <div
                onClick={() => {
                  setEditProfileImage(true);
                }}
                style={{ cursor: "pointer" }}
              >
                <UserAvatar user={user} />
              </div>
            }
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
          {user.customerAdmin && (
            <Popconfirm
              title="This will delete all users created from this account! Are you Sure"
              onConfirm={handleDeleteCustomer}
              okText="Yes, Delete"
              cancelText="No"
            >
              {" "}
              <Button
                danger
                ghost
                style={{ marginTop: "20px", marginLeft: "45px" }}
              >
                Delete Customer
              </Button>
            </Popconfirm>
          )}
        </Card>
      </Badge.Ribbon>
      {
        // !user.customerAdmin &&
        true && (
          <Badge.Ribbon text={"My Roles"}>
            <div style={{ paddingTop: "10px" }}>
              {user.roles.length > 0 ? (
                <Role loading={false} data={user.roles} profile={true} />
              ) : (
                <Empty description="No Role Assigned." />
              )}
            </div>
          </Badge.Ribbon>
        )
      }
      {editProfileImage && (
        <UploadProfileImage
          visible={editProfileImage}
          setVisible={setEditProfileImage}
        />
      )}
    </>
  );
}
const mapStateToProps = (state) => ({ user: state.auth?.user });

const mapDispatchToProps = { deleteCustomer };

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
