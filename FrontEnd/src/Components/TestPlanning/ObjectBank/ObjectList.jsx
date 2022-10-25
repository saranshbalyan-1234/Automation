import React, { useState, useEffect } from "react";
import { Table, Popconfirm, Button, Spin } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import moment from "moment";
import AddEditObjectModal from "./AddEditObjectModal";
import UserAvatar from "../../Common/Avatar";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import {
  getTestObjectByProject,
  deleteObject,
} from "../../../Redux/Actions/TestPlanning/testObject";
export const ObjectList = ({
  deleteObject,
  loading,
  currentProjectId,
  objectList,
  getTestObjectByProject,
}) => {
  useEffect(() => {
    getTestObjectByProject();
  }, [currentProjectId]);

  const navigate = useNavigate();
  const [addEditObjectModal, setAddEditObjectModal] = useState(false);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Created By",
      dataIndex: "createdBy",
      render: (_, record) => (
        <div>{<UserAvatar name={record.createdBy.name} />}</div>
      ),
    },

    {
      title: "Last Updated",
      key: "updatedAt",
      render: (_, record) => (
        <div>{moment(record.updatedAt).format("DD-MM-YYYY h:mm:ss a")}</div>
      ),
    },

    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div style={{ display: "flex", gap: 10 }}>
          <Popconfirm
            title={`Are you sure to delete this Object?`}
            onConfirm={async (e) => {
              e.stopPropagation();
              await deleteObject(record.id);
            }}
            okText="Yes, Delete"
            cancelText="No"
          >
            <DeleteOutlined
              onClick={(e) => e.stopPropagation()}
              style={{ fontSize: 17 }}
            />
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <>
      <Spin spinning={loading}>
        {" "}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            padding: "10px 0px 10px 0px ",
          }}
        >
          <div></div>
          <Button
            type="primary"
            ghost
            onClick={() => {
              setAddEditObjectModal(true);
            }}
          >
            New Object
          </Button>
        </div>
        <Table
          columns={columns}
          dataSource={objectList}
          rowClassName="pointer"
          onRow={(record, rowIndex) => {
            return {
              onClick: () => {
                navigate(`/TestPlanning/objectBank/${record.id}/details`);
              },
            };
          }}
        />
        {addEditObjectModal && (
          <AddEditObjectModal
            visible={addEditObjectModal}
            setVisible={setAddEditObjectModal}
            loading={loading}
          />
        )}
      </Spin>
    </>
  );
};

const mapStateToProps = (state) => ({
  currentProjectId: state.projects.currentProject.id,
  objectList: state.objectBank.data,
  loading: state.objectBank.loading,
});
const mapDispatchToProps = { getTestObjectByProject, deleteObject };

export default connect(mapStateToProps, mapDispatchToProps)(ObjectList);
