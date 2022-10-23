import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Table, Popconfirm, Button, Spin } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import moment from "moment";
import {
  getReusableFlowByProject,
  deleteReusableFlow,
} from "../../../Redux/Actions/reusableFlow";
import AddEditReusableFlowModal from "./AddEditReusableFlowModal";
import UserAvatar from "../../Common/Avatar";
import { useNavigate } from "react-router-dom";
const ReusableFlowList = ({
  currentProjectId,
  getReusableFlowByProject,
  reusableFlows,
  loading,
  deleteReusableFlow,
}) => {
  const navigate = useNavigate();
  const [addEditReusableFlowModal, setAddEditReusableFlowModal] =
    useState(false);

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
            title="Are you sure to delete this ReusableFlow?"
            onConfirm={async (e) => {
              e.stopPropagation();
              await deleteReusableFlow(record.id);
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
  useEffect(() => {
    getReusableFlowByProject();
  }, [currentProjectId]);

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
              setAddEditReusableFlowModal(true);
            }}
          >
            New ReusableFlow
          </Button>
        </div>
        <Table
          columns={columns}
          dataSource={reusableFlows}
          rowClassName="cursor"
          onRow={(record, rowIndex) => {
            return {
              onClick: () => {
                navigate(`/TestPlanning/ReusableFlow/${record.id}/details`);
              },
            };
          }}
        />
        {addEditReusableFlowModal && (
          <AddEditReusableFlowModal
            visible={addEditReusableFlowModal}
            setVisible={setAddEditReusableFlowModal}
          />
        )}
      </Spin>
    </>
  );
};

const mapStateToProps = (state) => ({
  currentProjectId: state.projects.currentProject.id,
  reusableFlows: state.reusableFlow.data,
  loading: state.reusableFlow.loading,
});

const mapDispatchToProps = { getReusableFlowByProject, deleteReusableFlow };

export default connect(mapStateToProps, mapDispatchToProps)(ReusableFlowList);
