import React, { useState } from "react";
import { connect } from "react-redux";
import { Table, Tag } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  CameraFilled,
  EyeOutlined,
} from "@ant-design/icons";
import ViewObjectModal from "../../Common/TestStep/ViewObjectModal";
import ViewParameterModal from "../../Common/TestStep/ViewParameterModal";
import ViewCommentModal from "../../Common/TestStep/ViewCommentModal";
const TestStepTable = ({ testSteps }) => {
  const [viewParameterModal, setViewParameterModal] = useState(false);
  const [parameters, setParameters] = useState([]);
  const [viewObjectModal, setViewObjectModal] = useState(false);
  const [object, setObject] = useState({});
  const [viewCommentModal, setViewCommentModal] = useState(false);
  const [comment, setComment] = useState("");
  const columns = [
    {
      title: "Action Event",
      dataIndex: "actionEvent",
    },
    {
      title: "Test Object",
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
      title: "Result",
      width: 100,
      dataIndex: "result",
      render: (text, record) =>
        text ? (
          <div
            style={{
              color: "green",
              fontWeight: 600,
              width: 40,
            }}
          >
            PASS
          </div>
        ) : (
          <div style={{ color: "red", fontWeight: 600, width: 40 }}>FAIL</div>
        ),
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={testSteps}
        pagination={false}
        sticky
      />
      {viewObjectModal && (
        <ViewObjectModal
          visible={viewObjectModal}
          setVisible={setViewObjectModal}
          object={object}
          history={true}
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

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TestStepTable);
