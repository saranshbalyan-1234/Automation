import React, { useEffect } from "react";
import { Table, Spin, Collapse, Tag } from "antd";
import {
  getTestCaseStepsById,
  addFirstProcess,
} from "../../../../Redux/Actions/testCase";
import { connect } from "react-redux";
import ProcessMenu from "./ProcessMenu";
import StepMenu from "./StepMenu";
import { useParams } from "react-router-dom";
const { Panel } = Collapse;
const TestStep = ({ getTestCaseStepsById, testSteps, addFirstProcess }) => {
  const { testCaseId } = useParams();

  useEffect(() => {
    getTestCaseStepsById(testCaseId);
  }, [testCaseId]);

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
      width: 100,
      dataIndex: "actionEvent",
    },
    {
      title: "Test Object",
      width: 100,
      dataIndex: "testObject",
    },
    {
      title: "Test Parameter",
      width: 100,
      dataIndex: "testParameter",
    },
    {
      title: "Options",
      width: 100,
      dataIndex: "options",
    },
    {
      title: "Comment",
      width: 100,
      dataIndex: "comment",
    },
  ];

  const renderProcessSteps = (item) => {
    return (
      <Table
        columns={columns}
        dataSource={[{ actionEvent: "saransh" }]}
        pagination={false}
        sticky
      />
    );
  };
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
                      <ProcessMenu />
                      Process: {item.name}
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "5px",
                        }}
                      ></div>
                    </div>
                  </div>
                }
              >
                {renderProcessSteps(item)}
              </Panel>
            </Collapse>
          );
        })}
        {testSteps.length == 0 && (
          <Tag
            style={{ cursor: "pointer" }}
            onClick={() => {
              addFirstProcess({ name: "First Process", testCaseId });
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

const mapDispatchToProps = { getTestCaseStepsById, addFirstProcess };

export default connect(mapStateToProps, mapDispatchToProps)(TestStep);
