import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  Typography,
  Progress,
  Card,
  Table,
  Button,
  Spin,
  Popconfirm,
} from "antd";
import Avatar from "../Common/Avatar";
import moment from "moment";
import { DeleteOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { getProjectById, removeMember } from "../../Redux/Actions/project";
const { Title } = Typography;
const { Meta } = Card;
export const ProjectDetails = ({
  currentProject,
  loading,
  getProjectById,
  removeMember,
}) => {
  const { id } = useParams();

  useEffect(() => {
    getProjectById(id);
  }, [id]);

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
      dataIndex: "active",
      render: (value, record) => {
        <div>
          saransh
          {record.verifiedAt
            ? record.active
              ? "Active"
              : "Inactive"
            : "Verification Pending"}
        </div>;
      },
    },
    {
      title: "Delete",
      key: "delete",
      render: (_, record) => (
        <Popconfirm
          title="Are you sure to remove this user?"
          onConfirm={async () => {
            await removeMember({
              projectId: currentProject.id,
              userId: record.id,
            });
          }}
          okText="Yes, Remove"
          cancelText="No"
        >
          <DeleteOutlined style={{ fontSize: 17 }} onClick={() => {}} />
        </Popconfirm>
      ),
    },
  ];
  if (loading) return null;
  return (
    <div style={{ paddingTop: 20 }}>
      <Spin spinning={loading}>
        <Card>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            <Meta
              title={
                <Title style={{ textTransform: "capitalize" }} level={3}>
                  Project: {currentProject.name}
                </Title>
              }
              description={
                <div style={{ color: "black" }}>
                  Created On{" "}
                  {moment(currentProject.createdAt).format("YYYY/MM/DD")} By
                  &nbsp;
                  {currentProject.createdBy && (
                    <Avatar name={currentProject.createdBy.name} />
                  )}
                </div>
              }
            />
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 25,
              }}
            >
              <Button type="primary" ghost>
                Edit Project
              </Button>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 30,
            }}
          >
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
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 25,
                alignSelf: "end",
              }}
            >
              <Card>
                <Meta
                  title="Start Date"
                  description={currentProject.startDate}
                />
              </Card>
              <Card>
                <Meta title="End Date" description={currentProject.endDate} />
              </Card>
            </div>
          </div>
        </Card>
        <Card style={{ marginTop: 20 }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            <Title level={5}>Members ({currentProject.members?.length})</Title>
            <Button type="primary" ghost>
              Add Member
            </Button>
          </div>
          <Table
            columns={columns}
            dataSource={currentProject.members}
            size="small"
          />
        </Card>
      </Spin>
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentProject: state.projects.currentProject,
  loading: state.projects.loading,
});

const mapDispatchToProps = { getProjectById, removeMember };

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetails);
