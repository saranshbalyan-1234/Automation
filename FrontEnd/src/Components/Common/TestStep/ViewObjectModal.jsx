import React from "react";
import { Modal, Spin } from "antd";
import { connect } from "react-redux";
import Details from "../../ObjectBank/Details";
const ViewObjectModal = ({ visible, setVisible, object }) => {
  return (
    <Modal
      width={1000}
      title={"Object Details"}
      visible={visible}
      footer={false}
      onCancel={() => {
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
