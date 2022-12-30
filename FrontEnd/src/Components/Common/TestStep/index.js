import React, { useState } from "react";
import StepMenu from "./StepMenu";
import { Table, Tag, Popconfirm } from "antd";
import AddEditStepModal from "./AddEditStepModal";
import {
  DeleteOutlined,
  EditOutlined,
  CameraFilled,
  EyeOutlined,
} from "@ant-design/icons";
import ViewObjectModal from "./ViewObjectModal";
import ViewParameterModal from "./ViewParameterModal";
import ViewCommentModal from "./ViewCommentModal";
const TestStepTable = ({ process, testSteps, deleteStep, reusableProcess }) => {
  const [addEditStepModal, setAddEditStepModal] = useState(false);
  const [viewParameterModal, setViewParameterModal] = useState(false);
  const [parameters, setParameters] = useState([]);
  const [edit, setEdit] = useState(true);
  const [editData, setEditData] = useState({});
  const [viewObjectModal, setViewObjectModal] = useState(false);
  const [object, setObject] = useState({});
  const [viewCommentModal, setViewCommentModal] = useState(false);
  const [comment, setComment] = useState("");
  const columns = [
    {
      title: "",
      width: 40,
      dataIndex: "action",
      render: (text, record) => (
        <div className="pointer">
          <StepMenu
            process={process}
            reusableProcess={reusableProcess}
            testStep={record}
          />
        </div>
      ),
    },
    {
      title: "",
      width: 40,
      dataIndex: "index",
      render: (text, record, index) => (
        <div style={{ display: "flex", justifyContent: "center" }}>
          {index + 1}
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
      render: (text, record) =>
        text?.name ? (
          <div>
            <Tag
              style={{
                cursor: "pointer",
              }}
              color="#108ee9"
              onClick={() => {
                setObject(text);
                setViewObjectModal(true);
              }}
            >
              {text.name}
            </Tag>
          </div>
        ) : (
          "N/A"
        ),
    },
    {
      title: "Test Parameters",
      // width: 100,
      dataIndex: "testParameters",
      render: (text, record) =>
        text?.length ? (
          <div>
            <Tag
              style={{ cursor: "pointer" }}
              color="#108ee9"
              onClick={() => {
                setParameters(text);
                setViewParameterModal(true);
              }}
            >
              <EyeOutlined /> View
            </Tag>
          </div>
        ) : (
          "N/A"
        ),
    },

    {
      title: "Comment",
      dataIndex: "comment",
      render: (text, record) =>
        text.length ? (
          <div>
            <Tag
              style={{ cursor: "pointer" }}
              color="#108ee9"
              onClick={() => {
                setComment(text);
                setViewCommentModal(true);
              }}
            >
              <EyeOutlined /> View
            </Tag>
          </div>
        ) : (
          "N/A"
        ),
    },
    {
      title: <CameraFilled style={{ fontSize: 15 }} />,
      width: 50,
      dataIndex: "options",
      render: (text, record) => (
        <>
          {record.screenshot && (
            <div style={{ cursor: "not-allowed" }}>
              <CameraFilled style={{ fontSize: 15 }} />
            </div>
          )}
        </>
      ),
    },
    {
      title: "",
      width: 100,
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
            placement="left"
            title="Are you sure to remove this step?"
            onConfirm={async () => {
              await deleteStep(
                record.id,
                record.step,
                process,
                reusableProcess
              );
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
        scroll={{ x: true }}
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
        size="small"
      />
      {addEditStepModal && (
        <AddEditStepModal
          visible={addEditStepModal}
          setVisible={setAddEditStepModal}
          process={process}
          reusableProcess={reusableProcess}
          step={1}
          edit={edit}
          editData={editData}
          setEdit={setEdit}
          setEditData={setEditData}
        />
      )}
      {viewObjectModal && (
        <ViewObjectModal
          visible={viewObjectModal}
          setVisible={setViewObjectModal}
          object={object}
          setObject={setObject}
        />
      )}

      {viewParameterModal && (
        <ViewParameterModal
          visible={viewParameterModal}
          setVisible={setViewParameterModal}
          parameters={parameters}
        />
      )}
      {viewCommentModal && (
        <ViewCommentModal
          visible={viewCommentModal}
          setVisible={setViewCommentModal}
          comment={comment}
        />
      )}
    </>
  );
};

export default TestStepTable;
