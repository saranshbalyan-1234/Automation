import React from "react";
import { connect } from "react-redux";
import StepMenu from "./StepMenu";
import { Table } from "antd";
export const TestStepTable = (props) => {
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

  return (
    <Table
      columns={columns}
      dataSource={[{ actionEvent: "saransh" }]}
      pagination={false}
      sticky
    />
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TestStepTable);
