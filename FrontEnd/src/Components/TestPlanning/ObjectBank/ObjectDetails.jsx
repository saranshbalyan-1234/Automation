import React, { useState } from "react";
import { connect } from "react-redux";
import { Typography, Card, Button, Spin, Popconfirm, Tag } from "antd";
import moment from "moment";
import { EditOutlined } from "@ant-design/icons";
import UserAvatar from "../../Common/Avatar";
import AddEditObjectModal from "./AddEditObjectModal";
const { Title } = Typography;
const { Meta } = Card;
export const ObjectDetails = ({ loading, currentObject }) => {
  const [addEditObjectModal, setAddEditObjectModal] = useState(false);
  const [editData, setEditData] = useState({});

  if (loading) return <Spin />;
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
                  Object: &nbsp;
                  {currentObject.name}
                </Title>
              }
              description={
                <div style={{ color: "black" }}>
                  Created On &nbsp;
                  {moment(currentObject.createdAt).format("DD/MM/YY")} By &nbsp;
                  {currentObject.createdBy && (
                    <UserAvatar name={currentObject.createdBy.name} />
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
                  setEditData(currentObject);
                  setAddEditObjectModal(true);
                }}
              >
                <EditOutlined />
                Edit Object Details
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
                    __html: currentObject.description,
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
      {addEditObjectModal && (
        <AddEditObjectModal
          visible={addEditObjectModal}
          setVisible={setAddEditObjectModal}
          editData={editData}
          setEditData={setEditData}
          edit={true}
          loading={loading}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentObject: state.objectBank.currentObject,
  loading: state.objectBank.loading,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ObjectDetails);
