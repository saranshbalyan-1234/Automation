import React, { useState } from "react";
import { Dropdown, Menu } from "antd";
import { PlusOutlined, SettingOutlined } from "@ant-design/icons";
import AddEditProcessModal from "./AddEditProcessModal";
export default function ProcessMenu({ process }) {
  const [addEditProcessModal, setAddEditProcessModal] = useState(false);
  const [step, setStep] = useState(0);
  const [addReusable, setAddReusable] = useState(false);

  const menu = (
    <Menu
      
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
            setStep(process.step);
            setAddReusable(false);
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
            setAddReusable(false);
            setAddEditProcessModal(true);
          },
        },
        {
          label: (
            <>
              <PlusOutlined style={{ marginRight: "5px" }} /> Add Reusable
              Process Before
            </>
          ),
          key: "3",
          onClick: (e) => {
            e.domEvent.stopPropagation();
            setStep(process.step);
            setAddReusable(true);
            setAddEditProcessModal(true);
          },
        },
        {
          label: (
            <>
              <PlusOutlined style={{ marginRight: "5px" }} /> Add Reusable
              Process After
            </>
          ),
          key: "4",
          onClick: (e) => {
            e.domEvent.stopPropagation();
            setStep(process.step + 1);
            setAddReusable(true);
            setAddEditProcessModal(true);
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
      {addEditProcessModal && (
        <AddEditProcessModal
          visible={addEditProcessModal}
          setVisible={setAddEditProcessModal}
          step={step}
          addReusable={addReusable}
        />
      )}
    </>
  );
}
