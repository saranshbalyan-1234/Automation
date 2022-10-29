import React, { useEffect, useState } from "react";
import { Modal, Descriptions, Spin } from "antd";
import { connect } from "react-redux";
import axios from "axios";
const ViewObjectModal = ({ visible, setVisible, object, setObject }) => {
  const [locators, setLocators] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getObjectLocators();
  }, [object.id]);

  const getObjectLocators = async () => {
    const { data } = await axios.get(`/object/${object.id}/locator`);
    setLoading(false);
    setLocators(data);
  };
  return (
    <Modal
      title={
        <div style={{ display: "flex", gap: 10 }}>
          <div>Object Name:</div> <div>{object.name}</div>
        </div>
      }
      visible={visible}
      footer={false}
      onCancel={() => {
        setObject({});
        setVisible(false);
      }}
    >
      <Spin spinning={loading}>
        <div style={{ marginTop: "-10px" }}>
          <Descriptions title="Locators">
            {locators.map((el) => {
              return (
                <Descriptions.Item key={`locator_${el.id}`} label={el.type}>
                  {el.locator}
                </Descriptions.Item>
              );
            })}
          </Descriptions>
        </div>
      </Spin>
    </Modal>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ViewObjectModal);
