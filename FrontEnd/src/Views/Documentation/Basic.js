import { Collapse, Space } from "antd";
import React from "react";
const { Panel } = Collapse;

export default function Documentation() {
  return (
    <Space direction="vertical" style={{ minWidth: "100%", marginTop: 10 }}>
      <Collapse collapsible="header">
        <Panel header="What is Test Case?" key="1">
          <p>Test Case is where your actual script will be executed.</p>

          <p>
            <br />
            You have multiple sections in a TestCase.
          </p>

          <ul>
            <li>Process: A process it a collection of steps.</li>
            <li>
              Step: A step is the smallest entity in a TestCase. This is the
              actual part where the selenium steps are defined.
            </li>
            <li>
              Environment: You can also have your multiple environments so that
              you dont have to edit values again and again if you want to
              execute same script with different values.
            </li>
            <li>
              Object: A object is the part where you define the HTML element. A
              element is located with the help of locators which can be of type
              <ul>
                <li>ClassName</li>
                <li>CSS</li>
                <li>Id</li>
                <li>JS</li>
                <li>LinkText</li>
                <li>Name</li>
                <li>PartialLinkText</li>
                <li>TagName</li>
                <li>XPATH</li>
              </ul>
            </li>
          </ul>
        </Panel>
      </Collapse>
      <Collapse collapsible="header">
        <Panel header="What is Reusable Process?" key="2">
          <p>
            Reusable Process is similar to a process in Test Case, but it can be
            reused in any of the Test Case.
          </p>
        </Panel>
      </Collapse>
      <Collapse collapsible="header">
        <Panel header="What is Object Bank?" key="3">
          A object is the part where you define the HTML element. A element is
          located with the help of locators which can be of type
          <ul>
            <li>ClassName</li>
            <li>CSS</li>
            <li>Id</li>
            <li>JS</li>
            <li>LinkText</li>
            <li>Name</li>
            <li>PartialLinkText</li>
            <li>TagName</li>
            <li>XPATH</li>
          </ul>
        </Panel>
      </Collapse>
    </Space>
  );
}
