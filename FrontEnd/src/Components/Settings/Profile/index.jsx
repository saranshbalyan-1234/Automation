import React from "react";
import { connect } from "react-redux";
import { Avatar, Card, Tag, Badge, Empty, Button, Popconfirm } from "antd";
import { deleteCustomer } from "../../../Redux/Actions/team";
import Role from "../Role";
function Profile({ user, deleteCustomer }) {
  const { Meta } = Card;
  const handleDeleteCustomer = async () => {
    await deleteCustomer();
  };
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
          {user.customerAdmin && (
            <Popconfirm
              title="This will delete all users created from this account! Are you Sure"
              onConfirm={handleDeleteCustomer}
              okText="Yes, Delete"
              cancelText="No"
            >
              {" "}
              <Button
                type="danger"
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
    </>
  );
}
const mapStateToProps = (state) => ({ user: state.auth?.user });

const mapDispatchToProps = { deleteCustomer };

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
