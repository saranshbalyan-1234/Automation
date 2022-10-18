import React from "react";
import { Dropdown, Menu } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
export default function StepMenu() {
  const menu = (
    <Menu
      theme="dark"
      items={[
        {
          label: (
            <>
              <DeleteOutlined style={{ marginRight: "5px" }} /> Delete Step
            </>
          ),
          key: "2",
          onClick: (e) => {
            e.domEvent.stopPropagation();
          },
        },
        {
          label: (
            <>
              <PlusOutlined style={{ marginRight: "5px" }} /> Add Step Before
            </>
          ),
          key: "3",
          onClick: (e) => {
            e.domEvent.stopPropagation();
          },
        },
        {
          label: (
            <>
              <PlusOutlined style={{ marginRight: "5px" }} /> Add Step After
            </>
          ),
          key: "4",
          onClick: (e) => {
            e.domEvent.stopPropagation();
          },
        },
      ]}
    />
  );

  return (
    <Dropdown overlay={menu} trigger={["hover"]}>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <EditOutlined />
      </div>
    </Dropdown>
  );
}
