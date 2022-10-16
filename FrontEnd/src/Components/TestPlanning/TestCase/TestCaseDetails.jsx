import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Typography, Card, Button, Spin, Popconfirm, Tag } from "antd";
import moment from "moment";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import UserAvatar from "../../Common/Avatar";
import AddEditTestCaseModal from "./AddEditTestCaseModal";
const { Title } = Typography;
const { Meta } = Card;
export const TestCaseDetails = ({
  currentTestCase,
  loading,
  getProjectById,
  removeMember,
}) => {
  const { testCaseId } = useParams();
  const [addEditTestCaseModal, setAddEditTestCaseModal] = useState(false);
  const [editData, setEditData] = useState({});
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
                  Test Case: {currentTestCase.name}
                </Title>
              }
              description={
                <div style={{ color: "black" }}>
                  Created On
                  {moment(currentTestCase.createdAt).format("DD/MM/YY")} By
                  &nbsp;
                  {currentTestCase.createdBy && (
                    <UserAvatar name={currentTestCase.createdBy.name} />
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
              <Button
                type="primary"
                ghost
                onClick={() => {
                  setEditData(currentTestCase);
                  setAddEditTestCaseModal(true);
                }}
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
                    __html: currentTestCase.description,
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
                {/* <Card>
                  <Meta
                    title="Start Date"
                    description={currentTestCase.startDate}
                  />
                </Card>
                <Card>
                  <Meta
                    title="End Date"
                    description={currentTestCase.endDate}
                  />
                </Card> */}
              </div>
            </div>
          </div>
        </Card>
      </Spin>
      {addEditTestCaseModal && (
        <AddEditTestCaseModal
          visible={addEditTestCaseModal}
          setVisible={setAddEditTestCaseModal}
          editData={editData}
          setEditData={setEditData}
          edit={true}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentTestCase: state.testCase.currentTestCase,
  loading: state.projects.loading,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TestCaseDetails);
