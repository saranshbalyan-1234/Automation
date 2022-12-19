import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Popconfirm, List, Tag, Button, Switch } from "antd";
import UserAvatar from "../../Common/Avatar";
import {
  getTeam,
  removeTeamMember,
  toggleUserActiveInactive,
  resendVerificationMail,
} from "../../../Redux/Actions/team";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import ManageUserModal from "./ManageUserModal";
import Loading from "../../Common/Loading";
export const Team = ({
  team,
  loading,
  getTeam,
  removeTeamMember,
  user,
  toggleUserActiveInactive,
  resendVerificationMail,
  setManageUserModal,
  manageUserModal,
  editUserId,
  setEditUserId,
}) => {
  useEffect(() => {
    getTeam();
  }, []);
  const toggleActiveInactive = (status, userId) => {
    toggleUserActiveInactive(status, userId);
  };

  return (
    <>
      <div
        id="scrollableDiv"
        style={{
          height: "calc(100vh - 250px)",
          overflow: "auto",
          padding: "0 16px",
          border: "1px solid rgba(140, 140, 140, 0.35)",
        }}
      >
        <Loading loading={loading}>
          <List
            dataSource={team}
            renderItem={(item) => (
              <List.Item key={item.email}>
                <List.Item.Meta
                  avatar={<UserAvatar user={item.id} log={true} />}
                  title={
                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                        flexWrap: "wrap",
                      }}
                    >
                      <div> {item.name}</div>
                      {!item.verifiedAt && (
                        <Popconfirm
                          title="Resend Verification Email?"
                          onConfirm={async () => {
                            await resendVerificationMail({
                              name: item.name,
                              email: item.email,
                            });
                          }}
                          okText="Yes, Resend"
                          cancelText="No"
                          trigger={"hover"}
                        >
                          <Tag color="red">Verification Pending</Tag>
                        </Popconfirm>
                      )}
                    </div>
                  }
                  description={
                    <div>
                      <div>{item.email}</div>
                      <div style={{ marginTop: "5px" }}>
                        Type:
                        <Tag color="blue" style={{ marginLeft: "5px" }}>
                          {item.email === user.email && user.customerAdmin
                            ? "Customer Admin"
                            : "User"}
                        </Tag>
                      </div>
                    </div>
                  }
                />
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  <Switch
                    onChange={(e) => toggleActiveInactive(e, item.id)}
                    checked={item.active}
                    checkedChildren="Active"
                    unCheckedChildren="Inactive"
                  />
                  <Button
                    type="primary"
                    ghost
                    size="small"
                    onClick={async () => {
                      await setEditUserId(item.id);
                      setManageUserModal(true);
                    }}
                  >
                    <EditOutlined /> Manage User
                  </Button>

                  <Popconfirm
                    title="Are you sure to remove this user?"
                    onConfirm={() => {
                      removeTeamMember(item.id);
                    }}
                    okText="Yes, Remove"
                    cancelText="No"
                  >
                    <Button danger ghost size="small">
                      <DeleteOutlined /> Remove User
                    </Button>
                  </Popconfirm>
                </div>
              </List.Item>
            )}
          />
        </Loading>

        {manageUserModal && (
          <ManageUserModal
            visible={manageUserModal}
            setVisible={setManageUserModal}
            userId={editUserId}
          />
        )}
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  team: state.team.data,
  loading: state.team.loading,
  user: state.auth.user,
});

const mapDispatchToProps = {
  getTeam,
  removeTeamMember,
  toggleUserActiveInactive,
  resendVerificationMail,
};

export default connect(mapStateToProps, mapDispatchToProps)(Team);
