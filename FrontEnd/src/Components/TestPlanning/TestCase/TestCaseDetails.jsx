import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Typography, Card, Button, Spin, Popconfirm, Tag } from "antd";
import moment from "moment";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";

const { Title } = Typography;
const { Meta } = Card;
export const TestCaseDetails = ({
  currentProject,
  loading,
  getProjectById,
  removeMember,
}) => {
  const { testCaseId } = useParams();

  useEffect(() => {
    // getProjectById(id);
  }, [testCaseId]);

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
                  Test Case: {currentProject.name}
                </Title>
              }
              description={
                <div style={{ color: "black" }}>
                  Created On &nbsp;
                  {moment(currentProject.createdAt).format("DD/MM/YYYY")}
                  &nbsp;
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
              <Button
                type="primary"
                ghost
                // onClick={() => {
                //   setEditProjectModal(true);
                // }}
              >
                <EditOutlined />
                Edit TestCase Details
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

            <div>
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
          </div>
        </Card>
      </Spin>
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentProject: state.projects.currentProject,
  loading: state.projects.loading,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TestCaseDetails);
