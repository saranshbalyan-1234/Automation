import React, { useState } from "react";
import { connect } from "react-redux";
import StepMenu from "./StepMenu";
import { Table, Tag } from "antd";
import AddEditStepModal from "./AddEditStepModal";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

export const TestStepTable = ({ processId, testSteps }) => {
  const [addEditStepModal, setAddEditStepModal] = useState(false);
  const [edit, setEdit] = useState(true);
  const [editData, setEditData] = useState({});
  const columns = [
    {
      title: "",
      width: 30,
      dataIndex: "action",
      render: (text, record) => (
        <div style={{ cursor: "pointer" }}>
          <StepMenu />
        </div>
      ),
    },
    {
      title: "Action Event",
      // width: 100,
      dataIndex: "actionEvent",
    },
    {
      title: "Test Object",
      // width: 100,
      dataIndex: "testObject",
    },
    {
      title: "Test Parameter",
      // width: 100,
      dataIndex: "testParameter",
    },
    {
      title: "Options",
      // width: 100,
      dataIndex: "options",
    },
    {
      title: "Comment",
      // width: 100,
      dataIndex: "comment",
    },
    {
      title: "",
      width: 70,
      dataIndex: "editDelete",
      render: (text, record) => (
        <div style={{ display: "flex", gap: 10, cursor: "pointer" }}>
          <EditOutlined
            onClick={() => {
              setEditData(record);
              setAddEditStepModal(true);
            }}
          />
          <DeleteOutlined />
        </div>
      ),
    },
  ];

  return (
    <>
      <Table
        locale={{
          emptyText: (
            <div
              style={{
                display: "flex",
                justifyContent: "start",
                cursor: "pointer",
              }}
              onClick={() => {
                setEdit(false);
                setAddEditStepModal(true);
              }}
            >
              <Tag> Add First Step</Tag>
            </div>
          ),
        }}
        columns={columns}
        dataSource={testSteps}
        pagination={false}
        sticky
      />
      <AddEditStepModal
        visible={addEditStepModal}
        setVisible={setAddEditStepModal}
        processId={processId}
        step={1}
        edit={edit}
        editData={editData}
        setEdit={setEdit}
        setEditData={setEditData}
      />
    </>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TestStepTable);
