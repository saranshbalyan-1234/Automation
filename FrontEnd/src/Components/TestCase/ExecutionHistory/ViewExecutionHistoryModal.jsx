import React, { useEffect } from "react";
import { Modal, Spin, Card, Typography, Table } from "antd";
import { getExecutionHistoryById } from "../../../Redux/Actions/executionHistory";
import { connect } from "react-redux";
import moment from "moment";
import UserAvatar from "../../Common/Avatar";
import Process from "./Process";
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
      width={1200}
      centered
      visible={visible}
      footer={false}
      onCancel={() => {
        setVisible(false);
      }}
    >
      <Spin spinning={loading}>
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
                  Executed By &nbsp;
                  {currentExecutionHistory.executedBy && (
                    <UserAvatar user={currentExecutionHistory.executedBy} />
                  )}
                </div>
              </div>
            }
            description={
              <>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 25,
                    marginBottom: 10,
                  }}
                >
                  <Card>
                    <Meta
                      title="Starting Time"
                      description={moment(
                        currentExecutionHistory.createdAt
                      ).format("DD/MM/YY hh:mm A")}
                    />
                  </Card>
                  <Card>
                    <Meta
                      title="Finishing Time"
                      description={
                        currentExecutionHistory.finishedAt
                          ? moment(currentExecutionHistory.finishedAt).format(
                              "DD/MM/YY hh:mm A"
                            )
                          : "Execution Incomplete"
                      }
                    />
                  </Card>
                  <Card>
                    <Meta
                      title="Execution Time"
                      description={
                        currentExecutionHistory.executionTime ||
                        "Execution Incomplete"
                      }
                    />
                  </Card>
                </div>
              </>
            }
          />
        </div>
        {currentExecutionHistory.description && (
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
        )}

        <div style={{ marginTop: 20 }}>
          {/* <Table
            columns={columns}
            dataSource={currentExecutionHistory.testSteps}
          /> */}
          <Process />
        </div>
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
