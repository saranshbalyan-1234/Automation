import React from "react";
import { Dropdown, Menu } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  SettingOutlined,
} from "@ant-design/icons";
export default function StepMenu() {
  const menu = (
    <Menu
      theme="dark"
      items={[
        {
          label: (
            <>
              <PlusOutlined style={{ marginRight: "5px" }} /> Add Step Before
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
              <PlusOutlined style={{ marginRight: "5px" }} /> Add Step After
            </>
          ),
          key: "2",
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
        <SettingOutlined />
      </div>
    </Dropdown>
  );
}
