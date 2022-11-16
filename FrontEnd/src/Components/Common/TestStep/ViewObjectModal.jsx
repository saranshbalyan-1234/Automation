import React from "react";
import { Modal, Spin } from "antd";
import { connect } from "react-redux";
import Details from "../../ObjectBank/Details";
const ViewObjectModal = ({ visible, setVisible, object, history }) => {
  return (
    <Modal
      centered
      width={1000}
      // title={"Object Details"}
      visible={visible}
      footer={false}
      onCancel={() => {
        setVisible(false);
      }}
    >
      <Spin spinning={false}>
        <Details newObject={object} history={history} />
      </Spin>
    </Modal>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ViewObjectModal);
