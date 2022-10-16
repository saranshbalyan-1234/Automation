import { Switch, Table } from "antd";
import React, { useState } from "react";
import { connect } from "react-redux";
const columns = [
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
const data = [];

const TestStep = () => {
  return (
    <>
      <Table columns={columns} dataSource={data} sticky />
    </>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TestStep);
