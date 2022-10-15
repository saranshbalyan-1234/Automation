import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Table, Popconfirm, Button, Spin } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {
  getTestCaseByProject,
  deleteTestCase,
} from "../../../Redux/Actions/testCase";
import AddEditTestCaseModal from "./AddEditTestCaseModal";
import UserAvatar from "../../Common/Avatar";
export const List = ({
  currentProjectId,
  getTestCaseByProject,
  testCases,
  loading,
  deleteTestCase,
}) => {
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
      render: (_, record) => <div>{record.updatedAt}</div>,
    },

    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <>
          <EditOutlined
            style={{ fontSize: 17 }}
            onClick={() => {
              setAddEditTestCaseModal(true);
              setEditData(record);
            }}
          />
          <Popconfirm
            title="Are you sure to remove this user?"
            onConfirm={async () => {
              await deleteTestCase(record.id);
            }}
            okText="Yes, Remove"
            cancelText="No"
          >
            <DeleteOutlined style={{ fontSize: 17 }} />
          </Popconfirm>
        </>
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
        <Table columns={columns} dataSource={testCases} />
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
