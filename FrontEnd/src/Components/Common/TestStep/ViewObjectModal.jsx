import React from "react";
import { Modal, Spin } from "antd";
import { connect } from "react-redux";
import Details from "../../ObjectBank/Details";
const ViewObjectModal = ({ visible, setVisible, object, setObject }) => {
  return (
    <Modal
      width={1000}
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
      <Spin spinning={false}>
        <Details newObjectId={object.id} />
      </Spin>
    </Modal>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ViewObjectModal);
