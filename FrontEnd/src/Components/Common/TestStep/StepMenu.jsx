import React, { useState } from "react";
import { Dropdown, Menu } from "antd";
import { PlusOutlined, SettingOutlined } from "@ant-design/icons";
import AddEditStepModal from "./AddEditStepModal";
export default function StepMenu({ processId, testStep, reusableFlowId }) {
  const [addEditStepModal, setAddEditStepModal] = useState(false);
  const [step, setStep] = useState(0);
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
            setStep(testStep.step);
            setAddEditStepModal(true);
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
            setStep(testStep.step + 1);
            setAddEditStepModal(true);
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
      {addEditStepModal && (
        <AddEditStepModal
          visible={addEditStepModal}
          setVisible={setAddEditStepModal}
          processId={processId}
          reusableFlowId={reusableFlowId}
          step={step}
        />
      )}
    </>
  );
}
