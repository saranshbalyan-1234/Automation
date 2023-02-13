import React, { useEffect, useState } from "react";
import { Table, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import moment from "moment";
import UserAvatar from "../../Common/Avatar";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import {
  deleteExecutionHistory,
  getAllExecutionHistoryByTestCase,
  deleteAllExecutionHistory,
} from "../../../Redux/Actions/executionHistory";
import ViewExecutionHistoryModal from "./ViewExecutionHistoryModal";
import Loading from "../../Common/Loading";
import { usePermission } from "../../../Utils/permission";
export const List = ({
  getAllExecutionHistoryByTestCase,
  deleteExecutionHistory,
  deleteAllExecutionHistory,
  loading,
  data,
}) => {
  const deleteExecutionPermission = usePermission("Execution", "delete");
  const { testCaseId } = useParams();
  const [executionHistoryId, setExecutionHistoryId] = useState(0);
  useEffect(() => {
    getAllExecutionHistoryByTestCase(testCaseId);
    // eslint-disable-next-line
  }, [testCaseId]);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      width: 600,
    },
    {
      title: "Executed At",
      dataIndex: "executedByUser",
      render: (_, record) => (
        <div>
          {moment(record.createdAt).format("DD/MM/YY hh:mm a")} By &nbsp;
          <UserAvatar user={record.executedByUser} />
        </div>
      ),
      width: 180,
    },
    {
      title: "Result",
      width: 100,
      dataIndex: "result",
      render: (text, record) => (
        <div style={{ width: 100 }}>
          {text === true ? (
            <div
              style={{
                color: "green",
                fontWeight: 600,
              }}
            >
              PASS
            </div>
          ) : text === false ? (
            <div style={{ color: "red", fontWeight: 600 }}>FAIL</div>
          ) : (
            <div style={{ color: "grey", fontWeight: 600 }}>INCOMPLETE</div>
          )}
        </div>
      ),
    },

    {
      title: (
        <div style={{ display: "flex", gap: 10 }}>
          <Popconfirm
            placement="left"
            title={`Are you sure to delete all Execution History?`}
            onConfirm={async () => {
              await deleteAllExecutionHistory();
            }}
            okText="Yes, Delete"
            cancelText="No"
            disabled={!deleteExecutionPermission}
          >
            <DeleteOutlined
              style={{
                fontSize: 17,
                color: deleteExecutionPermission ? "black" : "grey",
                cursor: deleteExecutionPermission ? "pointer" : "not-allowed",
              }}
            />
          </Popconfirm>
        </div>
      ),
      key: "actions",
      width: 50,
      render: (_, record) => (
        <div style={{ display: "flex", gap: 10 }}>
          <Popconfirm
            placement="left"
            title={`Are you sure to delete this Execution History?`}
            onConfirm={async (e) => {
              e.stopPropagation();
              await deleteExecutionHistory(record.id);
            }}
            okText="Yes, Delete"
            cancelText="No"
            disabled={!deleteExecutionPermission}
          >
            <DeleteOutlined
              onClick={(e) => e.stopPropagation()}
              style={{
                fontSize: 17,
                color: deleteExecutionPermission ? "black" : "grey",
                cursor: deleteExecutionPermission ? "pointer" : "not-allowed",
              }}
            />
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <>
      <Loading loading={loading}>
        <Table
          sticky
          columns={columns}
          dataSource={data}
          rowClassName="pointer"
          onRow={(record, rowIndex) => {
            return {
              onClick: () => {
                setExecutionHistoryId(record.id);
              },
            };
          }}
        />
      </Loading>
      {executionHistoryId > 0 && (
        <ViewExecutionHistoryModal
          visible={executionHistoryId}
          setVisible={setExecutionHistoryId}
        />
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  data: state.executionHistory.data,
  loading: state.executionHistory.loading,
});

const mapDispatchToProps = {
  deleteExecutionHistory,
  deleteAllExecutionHistory,
  getAllExecutionHistoryByTestCase,
};

export default connect(mapStateToProps, mapDispatchToProps)(List);
