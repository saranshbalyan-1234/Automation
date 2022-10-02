import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Avatar, Popconfirm, List, Tag, Spin, Button } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import { getTeam, removeTeamMember } from "../../../Redux/Actions/team";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import ManageUserRoleModal from "./ManageUserRoleModal";
export const Team = ({ team, loading, getTeam, removeTeamMember, user }) => {
  const [manageUserRoleModal, setManageUserRoleModal] = useState(false);
  const [editUserId, setEditUserId] = useState(0);
  useEffect(() => {
    getTeam();
  }, []);
  return (
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
        <Spin spinning={loading}>
          <List
            dataSource={team}
            renderItem={(item) => (
              <List.Item key={item.email}>
                <List.Item.Meta
                  avatar={<Avatar src={""} />}
                  title={
                    <div
                      style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}
                    >
                      <div> {item.name}</div>
                      {item.verifiedAt ? (
                        <Tag color="blue">
                          {item.email == user.email && user.customerAdmin
                            ? "Customer Admin"
                            : "User"}
                        </Tag>
                      ) : (
                        <Tag color="red">Verification Pending</Tag>
                      )}
                      <Tag color={item.active ? "blue" : "red"}>
                        {item.active ? "Active" : "Inactive"}
                      </Tag>
                    </div>
                  }
                  description={item.email}
                />
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  {" "}
                  <Button
                    type="primary"
                    ghost
                    size="small"
                    onClick={async () => {
                      await setEditUserId(item.id);
                      setManageUserRoleModal(true);
                    }}
                  >
                    <EditOutlined /> Manage Role
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
      {manageUserRoleModal && (
        <ManageUserRoleModal
          visible={manageUserRoleModal}
          setVisible={setManageUserRoleModal}
          userId={editUserId}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  team: state.team.data,
  loading: state.team.loading,
  user: state.auth.user,
});

const mapDispatchToProps = { getTeam, removeTeamMember };

export default connect(mapStateToProps, mapDispatchToProps)(Team);
