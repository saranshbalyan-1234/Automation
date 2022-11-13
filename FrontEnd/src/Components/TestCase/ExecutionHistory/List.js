import React, { useEffect, useState } from "react";
import { Table, Popconfirm, Spin } from "antd";
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
    },

    {
      title: "Last Updated",
      key: "updatedAt",
      render: (_, record) => (
        <div>{moment(record.updatedAt).format("DD-MM-YYYY h:mm:ss a")}</div>
      ),
    },

    {
      title: "Actions",
      key: "actions",
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
      <Spin spinning={loading}>
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
      </Spin>
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
