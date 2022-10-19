import React, { useState, useEffect } from "react";
import { Dropdown, Menu } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import AddEditProcessModal from "./AddEditProcessModal";
export default function ProcessMenu({ process }) {
  const [addEditProcessModal, setAddEditProcessModal] = useState(false);
  const [step, setStep] = useState(0);

  const menu = (
    <Menu
      theme="dark"
      items={[
        {
          label: (
            <>
              <PlusOutlined style={{ marginRight: "5px" }} /> Add Process Before
            </>
          ),
          key: "1",
          onClick: (e) => {
            e.domEvent.stopPropagation();
            setStep(process.step - 1);
            setAddEditProcessModal(true);
          },
        },
        {
          label: (
            <>
              <PlusOutlined style={{ marginRight: "5px" }} /> Add Process After
            </>
          ),
          key: "2",
          onClick: (e) => {
            e.domEvent.stopPropagation();
            setStep(process.step + 1);
            setAddEditProcessModal(true);
          },
        },
        {
          label: (
            <>
              <PlusOutlined style={{ marginRight: "5px" }} /> Add Step
            </>
          ),
          key: "3",
          onClick: (e) => {
            e.domEvent.stopPropagation();
          },
        },
      ]}
    />
  );

  return (
    <>
      <Dropdown overlay={menu} trigger={["hover"]}>
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <SettingOutlined />
        </div>
      </Dropdown>
      <AddEditProcessModal
        visible={addEditProcessModal}
        setVisible={setAddEditProcessModal}
        step={step}
      />
    </>
  );
}
