import React, { useState } from "react";
import { Collapse, Tag } from "antd";
import { connect } from "react-redux";
import { EyeOutlined } from "@ant-design/icons";
import TestStepTable from "./TestStepTable";
import ViewCommentModal from "../../Common/TestStep/ViewCommentModal";
import Loading from "../../Common/Loading";

const { Panel } = Collapse;
const Process = ({ process, loading }) => {
  const [comment, setComment] = useState(false);

  return (
    <>
      <Loading loading={loading}>
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
                      Process: {item.name}
                      {item.reusableProcess && (
                        <Tag color="blue">
                          Reusable Process : {item.reusableProcess.name}
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
                          color="#108ee9"
                          onClick={() => {
                            setComment(item.comment);
                          }}
                        >
                          <EyeOutlined /> View Comment
                        </Tag>
                      )}

                      <Tag color="blue" style={{ cursor: "default" }}>
                        Step Count : {item.testSteps.length}
                      </Tag>
                      <div style={{ width: 90 }}>
                        {item.result == true ? (
                          <div
                            style={{
                              color: "green",
                              fontWeight: 600,
                            }}
                          >
                            PASS
                          </div>
                        ) : item.result == false ? (
                          <div style={{ color: "red", fontWeight: 600 }}>
                            FAIL
                          </div>
                        ) : (
                          <div
                            style={{
                              color: "grey",
                              fontWeight: 600,
                            }}
                          >
                            INCOMPLETE
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                }
              >
                <TestStepTable testSteps={item.testSteps} />
              </Panel>
            </Collapse>
          );
        })}
      </Loading>

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
  process: state.executionHistory.currentExecutionHistory.process,
  loading: state.executionHistory.loading,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Process);
