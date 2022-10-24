import React, { useState } from "react";
import { connect } from "react-redux";
import { Typography, Card, Button, Spin, Popconfirm, Tag } from "antd";
import moment from "moment";
import { EditOutlined } from "@ant-design/icons";
import UserAvatar from "../../../Common/Avatar";
import AddEditTestCaseModal from "./AddEditTestCaseModal";
const { Title } = Typography;
const { Meta } = Card;
export const Details = ({ loading, details, reusable = false }) => {
  const [addEditTestCaseModal, setAddEditTestCaseModal] = useState(false);
  const [editData, setEditData] = useState({});

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
                  {`${reusable ? "Reusable Flow:" : "Test Case:"} ${
                    details.name
                  }`}
                </Title>
              }
              description={
                <div style={{ color: "black" }}>
                  Created On &nbsp;
                  {moment(details.createdAt).format("DD/MM/YY")} By &nbsp;
                  {details.createdBy && (
                    <UserAvatar name={details.createdBy.name} />
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
                  setEditData(details);
                  setAddEditTestCaseModal(true);
                }}
              >
                <EditOutlined />
                Edit {reusable ? "Reusable Flow" : "Test Case"} Details
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
                    __html: details.description,
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
          reusable={reusable}
          loading={loading}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Details);
