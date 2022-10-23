import React, { useState } from "react";
import { connect } from "react-redux";
import StepMenu from "./StepMenu";
import { Table, Tag, Popconfirm } from "antd";
import AddEditStepModal from "./AddEditStepModal";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { deleteStep } from "../../../../../Redux/Actions/testCase";
const TestStepTable = ({ processId, testSteps, deleteStep }) => {
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
          <StepMenu processId={processId} testStep={record} />
        </div>
      ),
    },
    {
      title: "Action Event",
      // width: 100,
      dataIndex: "actionEvent",
      onCell: (record, index) => ({
        colSpan: record.reusableFlow ? 5 : 1,
      }),
      render: (text, record) => (
        <div>
          {record.reusableFlow ? (
            <div>ReusableFlow: {record.reusableFlow.name}</div>
          ) : (
            <div>{text}</div>
          )}
        </div>
      ),
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
          <Popconfirm
            title="Are you sure to remove this step?"
            onConfirm={async () => {
              await deleteStep(record.id, processId, record.step);
            }}
            okText="Yes, Remove"
            cancelText="No"
          >
            <DeleteOutlined />
          </Popconfirm>
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
      {addEditStepModal && (
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
      )}
    </>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = { deleteStep };

export default connect(mapStateToProps, mapDispatchToProps)(TestStepTable);
