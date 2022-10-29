import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  getAllProject,
  getProjectById,
  deleteProject,
} from "../../Redux/Actions/project";
import { editDetails } from "../../Redux/Actions/user";
import AddEditProjectModal from "./AddEditProjectModal";
import {
  Avatar,
  Popconfirm,
  List,
  Tooltip,
  Spin,
  Button,
  Typography,
  Progress,
} from "antd";
import { AiFillCheckCircle, AiTwotoneCheckCircle } from "react-icons/ai";
import UserAvatar from "../Common/Avatar";
import moment from "moment";
import {
  DeleteOutlined,
  HeartOutlined,
  HeartFilled,
  EyeOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
const { Title } = Typography;
export const AllProject = ({
  getAllProject,
  getProjectById,
  deleteProject,
  editDetails,
  projects,
  user,
}) => {
  const navigate = useNavigate();
  const [addEditProjectModal, setAddEditProjectModal] = useState(false);
  useEffect(() => {
    getAllProject();
  }, []);

  const formatDates = (startDate, endDate) => {
    let currentDate = moment(new Date()).format("DD/MM/YYYY");
    let totalDays = moment(endDate).diff(moment(startDate), "days");
    let daysPassed = moment(currentDate).diff(moment(startDate), "days");
    let percentagePassed = Math.floor((daysPassed / totalDays) * 100);

    return (
      <div>
        Start: {startDate}
        <br />
        End : {endDate} <br />
        <Tooltip
          title={
            <div>
              Total Days: {totalDays}
              <br />
              Days Passed: {daysPassed}
            </div>
          }
        >
          <Progress percent={percentagePassed} size="small" />
        </Tooltip>
      </div>
    );
  };

  const handleSelectProject = (projectId) => {
    getProjectById(projectId);
  };
  const handleDefaultProject = (projectId) => {
    editDetails({ defaultProjectId: projectId });
  };
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          paddingTop: "10px",
        }}
      >
        <Title level={3}>All Projects</Title>
        <Button
          type="primary"
          ghost
          onClick={() => {
            setAddEditProjectModal(true);
          }}
        >
          New Project
        </Button>
      </div>
      <div
        id="scrollableDiv"
        style={{
          height: "calc(100vh - 210px)",
          overflow: "auto",
          padding: "0 16px",
          border: "1px solid rgba(140, 140, 140, 0.35)",
        }}
      >
        <InfiniteScroll
          dataLength={projects.data.length}
          // next={loadMoreData}
          // hasMore={data.length < 50}

          scrollableTarget="scrollableDiv"
        >
          <Spin spinning={projects.loading}>
            <List
              dataSource={projects.data}
              renderItem={(item) => (
                <List.Item key={`project_${item.id}`}>
                  <List.Item.Meta
                    avatar={
                      <div>
                        <div
                          style={{
                            fontSize: "20px",
                            cursor: "pointer",
                            display: "flex",
                            flexDirection: "column",
                            gap: "15px",
                            marginTop: "2px",
                          }}
                        >
                          {item.id === projects.currentProject.id ? (
                            <Tooltip title="Selected">
                              <AiFillCheckCircle />
                            </Tooltip>
                          ) : (
                            <Tooltip title="Select Project">
                              <AiTwotoneCheckCircle
                                onClick={() => {
                                  handleSelectProject(item.id);
                                }}
                              />
                            </Tooltip>
                          )}
                          {item.id === user.defaultProjectId ? (
                            <Tooltip title="Default Project">
                              <HeartFilled />
                            </Tooltip>
                          ) : (
                            <Tooltip title="Make Default">
                              <HeartOutlined
                                onClick={() => {
                                  handleDefaultProject(item.id);
                                }}
                              />
                            </Tooltip>
                          )}
                        </div>
                      </div>
                    }
                    title={
                      <div
                        style={{
                          display: "flex",
                          gap: "10px",
                          flexWrap: "wrap",
                        }}
                      >
                        <div>Name: {item.name}</div>
                      </div>
                    }
                    description={
                      <div
                        style={{ display: "flex ", flexDirection: "column" }}
                      >
                        <div>
                          {" "}
                          <div
                            style={{
                              display: "flex",
                              gap: "10px",
                              marginTop: "10px",
                              flexWrap: "wrap",
                            }}
                          >
                            <div> Members:</div>
                            <div>
                              <Avatar.Group
                                size="small"
                                maxCount={5}
                                maxStyle={{
                                  color: "#f56a00",
                                  backgroundColor: "#fde3cf",
                                }}
                              >
                                {item.members.map((el) => {
                                  return <UserAvatar name={el.name} />;
                                })}
                              </Avatar.Group>
                            </div>
                          </div>
                        </div>
                      </div>
                    }
                  />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                      marginRight: "50px",
                    }}
                  >
                    {formatDates(item.startDate, item.endDate)}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                    }}
                  >
                    <div style={{ display: "flex", gap: "5px" }}>
                      <div>Author</div>
                      <UserAvatar name={item.createdBy.name} />
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                        gap: "10px",
                      }}
                    >
                      <Button
                        type="primary"
                        size="small"
                        ghost
                        onClick={() => {
                          // setAddEditProjectModal(true);
                        }}
                      >
                        <EyeOutlined
                          onClick={() => {
                            navigate(`/project/${item.id}/details`);
                          }}
                        />
                      </Button>
                      {/* <Button
                        type="primary"
                        ghost
                        size="small"
                        onClick={async () => {
                          // await setEditUserId(item.id);
                          // setManageUserModal(true);
                        }}
                      >
                        <EditOutlined />
                      </Button> */}
                      <Popconfirm
                        title="Are you sure to delete this project?"
                        onConfirm={async () => {
                          await deleteProject(item.id);
                        }}
                        okText="Yes, Remove"
                        cancelText="No"
                      >
                        <Button type="danger" ghost size="small">
                          <DeleteOutlined />
                        </Button>
                      </Popconfirm>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "10px",

                        color: "grey",
                      }}
                    ></div>
                  </div>
                </List.Item>
              )}
            />
          </Spin>
        </InfiniteScroll>
      </div>
      {addEditProjectModal && (
        <AddEditProjectModal
          visible={addEditProjectModal}
          setVisible={setAddEditProjectModal}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  projects: state.projects,
  user: state.auth.user,
});

const mapDispatchToProps = {
  getAllProject,
  getProjectById,
  deleteProject,
  editDetails,
};

export default connect(mapStateToProps, mapDispatchToProps)(AllProject);
