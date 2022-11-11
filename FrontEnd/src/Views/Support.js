import { Collapse, Space } from "antd";
import React from "react";
const { Panel } = Collapse;
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
export default function Support() {
  return (
    <Space direction="vertical" style={{ minWidth: "100%" }}>
      <Collapse collapsible="header">
        <Panel header="What is Test Case?" key="1">
          <p>{text}</p>
        </Panel>
      </Collapse>
      <Collapse collapsible="header">
        <Panel header="What is Object Bank?" key="1">
          <p>{text}</p>
        </Panel>
      </Collapse>
      <Collapse collapsible="header">
        <Panel header="What is Reusable Process?" key="1">
          <p>{text}</p>
        </Panel>
      </Collapse>
    </Space>
  );
}
