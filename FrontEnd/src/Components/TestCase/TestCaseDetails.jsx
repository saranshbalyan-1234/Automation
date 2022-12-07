import React, { useState } from "react";
import { Typography, Card, Button, Tag } from "antd";
import moment from "moment";
import { EditOutlined } from "@ant-design/icons";
import UserAvatar from "../Common/Avatar";
import AddEditModal from "../Common/AddEditModal";
import Loading from "../Common/Loading";
const { Title } = Typography;
const { Meta } = Card;
const TestCasetails = ({ loading, details, name, onEdit = () => {} }) => {
  const [addEditModal, setAddEditModal] = useState(false);
  const [editData, setEditData] = useState({});

  if (loading) return <Loading />;
  return (
    <div style={{ paddingTop: 20 }}>
      <Loading loading={loading}>
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
                <div style={{ display: "flex", gap: 20 }}>
                  <Title style={{ textTransform: "capitalize" }} level={3}>
                    {`${name}: ${details.name}`}
                  </Title>
                  <div style={{ color: "black" }}>
                    Created On &nbsp;
                    {moment(details.createdAt).format("DD/MM/YY")} By &nbsp;
                    {details.createdBy && (
                      <UserAvatar user={details.createdBy} />
                    )}
                  </div>
                </div>
              }
              description={
                <>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 25,
                      marginBottom: 10,
                    }}
                  >
                    <Card>
                      <Meta
                        title="Total Process"
                        description={details.totalProcess || "N/A"}
                      />
                    </Card>
                    <Card>
                      <Meta
                        title="Reusable Process"
                        description={details.reusableProcessCount || "N/A"}
                      />
                    </Card>
                    <Card>
                      <Meta
                        title="Total Steps"
                        description={details.stepCount || "N/A"}
                      />
                    </Card>
                  </div>

                  <div style={{ display: "flex", gap: 10 }}>
                    <div>Tags:</div>
                    <div>
                      {details.tags?.length > 0
                        ? details.tags.map((el) => {
                            return <Tag>{el}</Tag>;
                          })
                        : "N/A"}
                    </div>
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
                  setEditData(details);
                  setAddEditModal(true);
                }}
              >
                <EditOutlined />
                Edit {name} Details
              </Button>
            </div>
          </div>
          {details.description && (
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
            </div>
          )}
        </Card>
      </Loading>
      {addEditModal && (
        <AddEditModal
          visible={addEditModal}
          setVisible={setAddEditModal}
          editData={editData}
          setEditData={setEditData}
          edit={true}
          name={name}
          onEdit={onEdit}
          loading={loading}
        />
      )}
    </div>
  );
};

export default TestCasetails;
