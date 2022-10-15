import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Table, Popconfirm, Button, Spin } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import moment from "moment";
import {
  getTestCaseByProject,
  deleteTestCase,
} from "../../../Redux/Actions/testCase";
import AddEditTestCaseModal from "./AddEditTestCaseModal";
import UserAvatar from "../../Common/Avatar";
import { useNavigate } from "react-router-dom";
export const List = ({
  currentProjectId,
  getTestCaseByProject,
  testCases,
  loading,
  deleteTestCase,
}) => {
  const navigate = useNavigate();
  const [addEditTestCaseModal, setAddEditTestCaseModal] = useState(false);
  const [editData, setEditData] = useState({});

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
          <EditOutlined
            style={{ fontSize: 17 }}
            onClick={() => {
              setAddEditTestCaseModal(true);
              setEditData(record);
            }}
          />
          <Popconfirm
            title="Are you sure to delete this TestCase?"
            onConfirm={async () => {
              await deleteTestCase(record.id);
            }}
            okText="Yes, Delete"
            cancelText="No"
          >
            <DeleteOutlined style={{ fontSize: 17 }} />
          </Popconfirm>
        </div>
      ),
    },
  ];
  useEffect(() => {
    getTestCaseByProject();
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
              setAddEditTestCaseModal(true);
            }}
          >
            New TestCase
          </Button>
        </div>
        <Table
          columns={columns}
          dataSource={testCases}
          rowClassName="cursor"
          onRow={(record, rowIndex) => {
            return {
              onClick: () => {
                navigate(`/TestPlanning/TestCase/${record.id}/Details`);
              },
            };
          }}
        />
        {addEditTestCaseModal && (
          <AddEditTestCaseModal
            visible={addEditTestCaseModal}
            setVisible={setAddEditTestCaseModal}
            setEditData={setEditData}
            editData={editData}
          />
        )}
      </Spin>
    </>
  );
};

const mapStateToProps = (state) => ({
  currentProjectId: state.projects.currentProject.id,
  testCases: state.testCase.data,
  loading: state.testCase.loading,
});

const mapDispatchToProps = { getTestCaseByProject, deleteTestCase };

export default connect(mapStateToProps, mapDispatchToProps)(List);
