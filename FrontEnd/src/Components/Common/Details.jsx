import React, { useState } from "react";
import { connect } from "react-redux";
import { Typography, Card, Button, Spin, Popconfirm, Tag } from "antd";
import moment from "moment";
import { EditOutlined } from "@ant-design/icons";
import UserAvatar from "./Avatar";
import AddEditModal from "./AddEditModal";
const { Title } = Typography;
const { Meta } = Card;
const Details = ({ loading, details, name, onEdit = () => {} }) => {
  const [addEditModal, setAddEditModal] = useState(false);
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
              description={<></>}
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
        </Card>
      </Spin>
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

export default Details;
