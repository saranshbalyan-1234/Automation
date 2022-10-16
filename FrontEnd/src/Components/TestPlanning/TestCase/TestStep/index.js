import { Switch, Table } from "antd";
import React, { useState } from "react";
import { connect } from "react-redux";
const columns = [
  {
    title: "Action Event",
    width: 100,
    dataIndex: "actionEvent",
    key: "name",
  },
  {
    title: "Age",
    width: 100,
    dataIndex: "age",
    key: "age",
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
