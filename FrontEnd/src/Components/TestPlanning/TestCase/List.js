import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Table, Popconfirm, Button, Typography } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { getTestCaseByProject } from "../../../Redux/Actions/testCase";
import AddEditTestCaseModal from "./AddEditTestCaseModal";
import UserAvatar from "../../Common/Avatar";
export const List = ({
  currentProjectId,
  getTestCaseByProject,
  testCases,
  loading,
}) => {
  const { Title } = Typography;
  const [addEditTestCaseModal, setAddEditTestCaseModal] = useState(false);
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
          <EditOutlined style={{ fontSize: 17 }} onClick={() => {}} />
          <Popconfirm
            title="Are you sure to remove this user?"
            // onConfirm={async () => {
            //   await removeMember({
            //     projectId: currentProject.id,
            //     userId: record.id,
            //   });
            // }}
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
      <AddEditTestCaseModal
        visible={addEditTestCaseModal}
        setVisible={setAddEditTestCaseModal}
      />
    </>
  );
};

const mapStateToProps = (state) => ({
  currentProjectId: state.projects.currentProject.id,
  testCases: state.testCase.data,
  loading: state.testCase.loading,
});

const mapDispatchToProps = { getTestCaseByProject };

export default connect(mapStateToProps, mapDispatchToProps)(List);
