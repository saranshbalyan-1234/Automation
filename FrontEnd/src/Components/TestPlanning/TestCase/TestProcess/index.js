import React, { useEffect } from "react";
import { Table, Spin, Collapse, Tag } from "antd";
import {
  getTestCaseStepsById,
  addProcess,
} from "../../../../Redux/Actions/testCase";
import { connect } from "react-redux";
import ProcessMenu from "./ProcessMenu";
import { useParams } from "react-router-dom";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { TestStepTable } from "./TestStep";
const { Panel } = Collapse;
const TestStep = ({ getTestCaseStepsById, testSteps, addProcess }) => {
  const { testCaseId } = useParams();

  useEffect(() => {
    getTestCaseStepsById(testCaseId);
  }, [testCaseId]);

  return (
    <>
      <Spin spinning={false}>
        {testSteps.map((item, index) => {
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
                      Process: {item.name}
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "5px",
                        }}
                      ></div>
                    </div>
                    <div
                      style={{ display: "flex", gap: 10, alignItems: "center" }}
                    >
                      <EditOutlined />
                      <DeleteOutlined />
                    </div>
                  </div>
                }
              >
                <TestStepTable testSteps={item.testSteps} />
              </Panel>
            </Collapse>
          );
        })}
        {testSteps.length == 0 && (
          <Tag
            style={{ cursor: "pointer" }}
            onClick={() => {
              addProcess({ name: "First Process", testCaseId, step: 1 });
            }}
          >
            Add First Process
          </Tag>
        )}
      </Spin>
    </>
  );
};

const mapStateToProps = (state) => ({
  testSteps: state.testCase.currentTestCase.testSteps,
});

const mapDispatchToProps = { getTestCaseStepsById, addProcess };

export default connect(mapStateToProps, mapDispatchToProps)(TestStep);
