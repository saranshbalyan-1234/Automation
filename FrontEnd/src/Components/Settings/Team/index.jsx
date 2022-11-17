import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  Avatar,
  Popconfirm,
  List,
  Tag,
  Spin,
  Button,
  Switch,
  Badge,
} from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  getTeam,
  removeTeamMember,
  toggleUserActiveInactive,
  resendVerificationMail,
} from "../../../Redux/Actions/team";
import {
  DeleteOutlined,
  EditOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import ManageUserModal from "./ManageUserModal";
const loadingIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
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
        <InfiniteScroll
          dataLength={team.length}
          // next={loadMoreData}
          // hasMore={data.length < 50}

          scrollableTarget="scrollableDiv"
        >
          <Spin spinning={loading} indicator={loadingIcon}>
            <List
              dataSource={team}
              renderItem={(item) => (
                <List.Item key={item.email}>
                  <List.Item.Meta
                    avatar={<Avatar src={""} />}
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
                  <div
                    style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}
                  >
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
                      <Button type="danger" ghost size="small">
                        <DeleteOutlined /> Remove User
                      </Button>
                    </Popconfirm>
                  </div>
                </List.Item>
              )}
            />
          </Spin>
        </InfiniteScroll>
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
