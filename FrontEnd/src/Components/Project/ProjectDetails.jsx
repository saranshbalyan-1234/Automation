import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  Typography,
  Tooltip,
  Progress,
  Card,
  Table,
  Button,
  Popconfirm,
  Tag,
} from "antd";
import UserAvatar from "../Common/Avatar";
import moment from "moment";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { getProjectById, removeMember } from "../../Redux/Actions/project";
import AddEditProjectModal from "./AddEditProjectModal";
import AddProjectMemberModal from "./AddProjectMemberModal";
import MemberBadge from "../Common/MemberBadge";
import ColumnGraph from "../Common/Graph/ColumnGraph";
import Loading from "../Common/Loading";
import { usePermission } from "../../Utils/permission";
const { Title } = Typography;
const { Meta } = Card;
export const ProjectDetails = ({
  currentProject,
  loading,
  getProjectById,
  removeMember,
}) => {
  const editProjectPermission = usePermission("Project", "edit");
  const { projectId } = useParams();
  const [addProjectMemberModal, setAddProjectMemberModal] = useState(false);
  const [editProjectModal, setEditProjectModal] = useState(false);
  const [graphCount, setGraphCount] = useState([]);

  const members = currentProject.members.filter((el) => {
    return el.deletedAt === null;
  });

  useEffect(() => {
    getProject();
    // eslint-disable-next-line
  }, [projectId]);

  const getProject = async () => {
    if (projectId) {
      await getProjectById(projectId);

      let count = Object.entries(currentProject.count)
        .filter((el) => {
          return (
            el[0] === "testCase" ||
            el[0] === "reusableProcess" ||
            el[0] === "object"
          );
        })
        .map((el) => {
          let key = "";
          if (el[0] === "testCase") {
            key = "Test Case";
          } else if (el[0] === "reusableProcess") {
            key = "Reusable Process";
          } else if (el[0] === "object") {
            key = "Test Object";
          }
          return { name: key, Total: el[1] };
        });

      setGraphCount(count);
    }
  };

  const formatDates = (startDate, endDate) => {
    let currentDate = moment(new Date()).format("DD/MM/YYYY");
    let totalDays = moment(endDate).diff(moment(startDate), "days");
    let daysPassed = moment(currentDate).diff(moment(startDate), "days");
    let percentagePassed = Math.floor((daysPassed / totalDays) * 100);

    return (
      <div style={{ marginTop: 10 }}>
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

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },

    {
      title: "Status",
      key: "action",
      render: (_, record) => (
        <Tag color={record.verifiedAt ? (record.active ? "green" : "red") : ""}>
          {record.verifiedAt
            ? record.active
              ? "Active"
              : "Inactive"
            : "Verification Pending"}
        </Tag>
      ),
    },

    {
      title: "Delete",
      key: "delete",
      render: (_, record) => (
        <Popconfirm
          placement="left"
          title="Are you sure to remove this user?"
          onConfirm={async () => {
            await removeMember({
              projectId: currentProject.id,
              userId: record.id,
            });
          }}
          okText="Yes, Remove"
          cancelText="No"
          disabled={!editProjectPermission}
        >
          <DeleteOutlined
            style={{
              fontSize: 17,
              color: editProjectPermission ? "black" : "grey",
              cursor: editProjectPermission ? "pointer" : "not-allowed",
            }}
          />
        </Popconfirm>
      ),
    },
  ];
  // if (loading) return null;
  return (
    <div style={{ paddingTop: 20 }}>
      <Loading loading={loading}>
        <div className="row ">
          <Card
            style={{
              minWidth: "calc(100% - 410px)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
              }}
            >
              <Meta
                title={
                  <div style={{ display: "flex", gap: 20 }}>
                    <Title style={{ textTransform: "capitalize" }} level={3}>
                      Project: {currentProject.name}
                    </Title>
                    <div style={{ color: "black" }}>
                      Created On
                      {moment(currentProject.createdAt).format("DD/MM/YY")} By
                      &nbsp;
                      {currentProject.createdBy && (
                        <UserAvatar user={currentProject.createdByUser} />
                      )}
                    </div>
                  </div>
                }
                description={
                  <>
                    <div style={{ maxWidth: 300, marginBottom: 10 }}>
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: 25,
                        }}
                      >
                        <Card>
                          <Meta
                            title="Start Date"
                            description={currentProject.startDate}
                          />
                        </Card>
                        <Card>
                          <Meta
                            title="End Date"
                            description={currentProject.endDate}
                          />
                        </Card>
                      </div>
                      {formatDates(
                        currentProject.startDate,
                        currentProject.endDate
                      )}
                    </div>
                  </>
                }
              />
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 25,
                }}
              >
                <Button
                  type="primary"
                  ghost
                  onClick={() => {
                    setEditProjectModal(true);
                  }}
                >
                  <EditOutlined /> Edit Project Details
                </Button>
              </div>
            </div>
            {currentProject.description && (
              <Meta
                title="Description"
                description={
                  <div
                    style={{ marginTop: "5px" }}
                    dangerouslySetInnerHTML={{
                      __html: currentProject.description,
                    }}
                  ></div>
                }
              />
            )}
          </Card>
          <Card style={{ boxShadow: "5px 10px #f6f6f6" }}>
            <ColumnGraph data={graphCount} />
          </Card>
        </div>
        <Card style={{ marginTop: 20 }}>
          {members && (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            >
              <Title
                level={5}
                style={{ display: "flex", flexWrap: "wrap", gap: 10 }}
              >
                <div>Members</div> <div>({members.length})</div>
                <MemberBadge members={members} />
              </Title>
              <Button
                type="primary"
                ghost
                onClick={() => {
                  setAddProjectMemberModal(true);
                }}
                style={{ marginTop: "-15px" }}
              >
                <PlusOutlined />
                Add Member
              </Button>
            </div>
          )}
          <Table
            scroll={{ x: true }}
            columns={columns}
            dataSource={members.filter((el) => {
              return el.deletedAt === null;
            })}
            size="small"
          />
        </Card>
      </Loading>
      {addProjectMemberModal && (
        <AddProjectMemberModal
          visible={addProjectMemberModal}
          setVisible={setAddProjectMemberModal}
        />
      )}
      {editProjectModal && (
        <AddEditProjectModal
          visible={editProjectModal}
          setVisible={setEditProjectModal}
          edit={true}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentProject: state.projects.currentProject,
  loading: state.projects.loading,
});

const mapDispatchToProps = { getProjectById, removeMember };

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetails);
