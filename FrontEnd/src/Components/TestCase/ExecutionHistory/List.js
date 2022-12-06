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
} from "../../../Redux/Actions/executionHistory";
import ViewExecutionHistoryModal from "./ViewExecutionHistoryModal";
import Loading from "../../Common/Loading";

export const List = ({
  getAllExecutionHistoryByTestCase,
  deleteExecutionHistory,
  loading,
  data,
}) => {
  const { testCaseId } = useParams();
  const [executionHistoryId, setExecutionHistoryId] = useState(0);
  useEffect(() => {
    getAllExecutionHistoryByTestCase(testCaseId);
  }, [testCaseId]);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      width: 600,
    },
    {
      title: "Executed At",
      dataIndex: "executedBy",
      render: (_, record) => (
        <div>
          {moment(record.createdAt).format("DD/MM/YY")} By &nbsp;
          {record.executedBy && <UserAvatar user={record.executedBy} />}
        </div>
      ),
      width: 130,
    },
    {
      title: "Result",
      width: 100,
      dataIndex: "result",
      render: (text, record) =>
        text == true ? (
          <div
            style={{
              color: "green",
              fontWeight: 600,
              width: 40,
            }}
          >
            PASS
          </div>
        ) : text == false ? (
          <div style={{ color: "red", fontWeight: 600, width: 40 }}>FAIL</div>
        ) : (
          <div style={{ color: "grey", fontWeight: 600, width: 100 }}>
            INCOMPLETE
          </div>
        ),
    },

    {
      title: "Actions",
      key: "actions",
      width: 100,
      render: (_, record) => (
        <div style={{ display: "flex", gap: 10 }}>
          <Popconfirm
            title={`Are you sure to delete this Execution History?`}
            onConfirm={async (e) => {
              e.stopPropagation();
              await deleteExecutionHistory(record.id);
            }}
            okText="Yes, Delete"
            cancelText="No"
          >
            <DeleteOutlined
              onClick={(e) => e.stopPropagation()}
              style={{ fontSize: 17 }}
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
  getAllExecutionHistoryByTestCase,
};

export default connect(mapStateToProps, mapDispatchToProps)(List);
