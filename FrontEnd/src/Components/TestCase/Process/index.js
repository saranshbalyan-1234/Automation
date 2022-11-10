import React, { useEffect, useState } from "react";
import { Popconfirm, Spin, Collapse, Tag } from "antd";
import {
  getTestCaseStepsById,
  deleteProcess,
  deleteStep,
} from "../../../Redux/Actions/testCase";
import { connect } from "react-redux";
import ProcessMenu from "./ProcessMenu";
import { useParams } from "react-router-dom";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import TestStepTable from "../../Common/TestStep";
import AddEditProcessModal from "./AddEditProcessModal";
import ViewCommentModal from "../../Common/TestStep/ViewCommentModal";
const { Panel } = Collapse;
const Process = ({
  getTestCaseStepsById,
  process,
  deleteProcess,
  deleteStep,
}) => {
  const [addEditProcessModal, setAddEditProcessModal] = useState(false);
  const [comment, setComment] = useState(false);
  const [editProcessData, setEditProcessData] = useState({});
  const [edit, setEdit] = useState(true);
  const { testCaseId } = useParams();

  useEffect(() => {
    testCaseId && getTestCaseStepsById(testCaseId);
  }, [testCaseId]);

  return (
    <>
      <Spin spinning={false}>
        {process.map((item, index) => {
          return (
            <Collapse style={{ marginTop: "10px" }} key={index}>
              <Panel
                header={
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "10px",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "10px",
                        alignItems: "center",
                      }}
                    >
                      <ProcessMenu process={item} />

                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "5px",
                        }}
                      >
                        Process: {item.name}
                      </div>
                      {item.reusableFlow && (
                        <Tag color="red">
                          ReusableFlow : {item.reusableFlow.name}
                        </Tag>
                      )}
                    </div>
                    <div
                      style={{ display: "flex", gap: 10, alignItems: "center" }}
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      {item.comment && (
                        <Tag
                          color="red"
                          onClick={() => {
                            setComment(item.comment);
                          }}
                        >
                          View Comment
                        </Tag>
                      )}
                      <EditOutlined
                        onClick={() => {
                          setEditProcessData(item);
                          setAddEditProcessModal(true);
                        }}
                      />
                      <Popconfirm
                        title="Are you sure to remove this process?"
                        onConfirm={async () => {
                          await deleteProcess(item.id, item.step);
                        }}
                        okText="Yes, Remove"
                        cancelText="No"
                      >
                        <DeleteOutlined />
                      </Popconfirm>
                    </div>
                  </div>
                }
              >
                <TestStepTable
                  testSteps={item.testSteps}
                  processId={item.id}
                  reusableFlowId={item.reusableFlow?.id}
                  deleteStep={deleteStep}
                />
              </Panel>
            </Collapse>
          );
        })}
        {process.length === 0 && (
          <Tag
            style={{ cursor: "pointer" }}
            onClick={() => {
              setEdit(false);
              setAddEditProcessModal(true);
            }}
          >
            Add First Process
          </Tag>
        )}
      </Spin>
      {addEditProcessModal && (
        <AddEditProcessModal
          visible={addEditProcessModal}
          setVisible={setAddEditProcessModal}
          editData={editProcessData}
          setEditData={setEditProcessData}
          edit={edit}
          step={1}
          setEdit={setEdit}
        />
      )}
      {comment && (
        <ViewCommentModal
          comment={comment}
          visible={comment}
          setVisible={setComment}
        />
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  process: state.testCase.currentTestCase.process,
});

const mapDispatchToProps = { getTestCaseStepsById, deleteProcess, deleteStep };

export default connect(mapStateToProps, mapDispatchToProps)(Process);
