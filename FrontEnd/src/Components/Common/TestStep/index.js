import React, { useState } from "react";
import { connect } from "react-redux";
import StepMenu from "./StepMenu";
import { Table, Tag, Popconfirm } from "antd";
import AddEditStepModal from "./AddEditStepModal";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import ViewObjectModal from "./ViewObjectModal";
const TestStepTable = ({
  processId,
  testSteps,
  deleteStep,
  reusableFlowId,
}) => {
  console.log("saransh", testSteps);
  const [addEditStepModal, setAddEditStepModal] = useState(false);
  const [edit, setEdit] = useState(true);
  const [editData, setEditData] = useState({});
  const [viewObjectModal, setViewObjectModal] = useState(false);
  const [object, setObject] = useState({});
  const columns = [
    {
      title: "",
      width: 30,
      dataIndex: "action",
      render: (text, record) => (
        <div style={{ cursor: "pointer" }}>
          <StepMenu
            processId={processId}
            reusableFlowId={reusableFlowId}
            testStep={record}
          />
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
      dataIndex: "object",
      render: (text, record) => (
        <div>
          <Tag
            style={{ cursor: "pointer" }}
            color="blue"
            onClick={() => {
              setObject(text);
              setViewObjectModal(true);
            }}
          >
            {text?.name ? text.name : "N/A"}
          </Tag>
        </div>
      ),
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
              if (processId)
                await deleteStep(record.id, record.step, processId);
              else deleteStep(record.id, record.step);
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
          reusableFlowId={reusableFlowId}
          step={1}
          edit={edit}
          editData={editData}
          setEdit={setEdit}
          setEditData={setEditData}
        />
      )}
      <ViewObjectModal
        visible={viewObjectModal}
        setVisible={setViewObjectModal}
        object={object}
        setObject={setObject}
      />
    </>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TestStepTable);
