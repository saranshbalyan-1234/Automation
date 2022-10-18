import React from "react";
import { Dropdown, Menu } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
export default function ProcessMenu() {
  const menu = (
    <Menu
      theme="dark"
      items={[
        {
          label: (
            <>
              <EditOutlined style={{ marginRight: "5px" }} /> Edit Process Name
            </>
          ),
          key: "1",
          onClick: (e) => {
            e.domEvent.stopPropagation();
          },
        },
        {
          label: (
            <>
              <DeleteOutlined style={{ marginRight: "5px" }} /> Delete Process
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
              <PlusOutlined style={{ marginRight: "5px" }} /> Add Process Before
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
              <PlusOutlined style={{ marginRight: "5px" }} /> Add Process After
            </>
          ),
          key: "4",
          onClick: (e) => {
            e.domEvent.stopPropagation();
          },
        },
        {
          label: (
            <>
              <PlusOutlined style={{ marginRight: "5px" }} /> Add Step
            </>
          ),
          key: "5",
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
