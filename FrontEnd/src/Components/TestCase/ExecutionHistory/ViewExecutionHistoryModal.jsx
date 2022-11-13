import React, { useEffect } from "react";
import { Modal, Spin, Card, Typography } from "antd";
import { getExecutionHistoryById } from "../../../Redux/Actions/executionHistory";
import { connect } from "react-redux";
import moment from "moment";
import UserAvatar from "../../Common/Avatar";
const { Meta } = Card;
const { Title } = Typography;
const ViewExecutionHistoryModal = ({
  visible,
  setVisible,
  currentExecutionHistory,
  getExecutionHistoryById,
  loading,
}) => {
  useEffect(() => {
    getExecutionHistoryById(visible);
  }, []);

  return (
    <Modal
      title={`ExecutionHistory Name: ${currentExecutionHistory.name}`}
      width={1000}
      centered
      visible={visible}
      footer={false}
      onCancel={() => {
        setVisible(false);
      }}
    >
      <Spin spinning={loading}>
        <Card>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            <Meta
              title={
                <div style={{ display: "flex", gap: 20 }}>
                  <Title style={{ textTransform: "capitalize" }} level={3}>
                    {`Execution History: ${currentExecutionHistory.name}`}
                  </Title>
                  <div style={{ color: "black" }}>
                    Executed On &nbsp;
                    {moment(currentExecutionHistory.createdAt).format(
                      "DD/MM/YY"
                    )}{" "}
                    By &nbsp;
                    {currentExecutionHistory.executedBy && (
                      <UserAvatar user={currentExecutionHistory.executedBy} />
                    )}
                  </div>
                </div>
              }
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 30,
            }}
          >
            <Meta
              title="Description"
              description={
                <div
                  style={{ marginTop: "5px" }}
                  dangerouslySetInnerHTML={{
                    __html: currentExecutionHistory.description,
                  }}
                ></div>
              }
            />
          </div>
        </Card>
      </Spin>
    </Modal>
  );
};
const mapStateToProps = (state) => ({
  loading: state.executionHistory.loading,
  currentExecutionHistory: state.executionHistory.currentExecutionHistory,
});

const mapDispatchToProps = {
  getExecutionHistoryById,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewExecutionHistoryModal);
