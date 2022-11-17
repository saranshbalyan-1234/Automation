import React, { useState } from "react";
import { Table, Popconfirm, Button, Spin } from "antd";
import { DeleteOutlined, LoadingOutlined } from "@ant-design/icons";
import moment from "moment";
import AddEditModal from "./AddEditModal";
import UserAvatar from "./Avatar";
import { useNavigate } from "react-router-dom";
const loadingIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
export const List = ({
  onDelete,
  onSave = () => {},
  loading,
  data,
  name,
  link,
}) => {
  const navigate = useNavigate();
  const [addEditModal, setAddEditModal] = useState(false);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Created At",
      dataIndex: "createdBy",
      render: (_, record) => (
        <div>
          {moment(record.createdAt).format("DD/MM/YY")} By &nbsp;
          {record.createdBy && <UserAvatar user={record.createdBy} />}
        </div>
        // <div>{<UserAvatar user={record.createdBy} />}</div>
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
            title={`Are you sure to delete this ${name}?`}
            onConfirm={async (e) => {
              e.stopPropagation();
              await onDelete(record.id);
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
      <Spin spinning={loading} indicator={loadingIcon}>
        {" "}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            padding: "10px 0px 10px 0px ",
          }}
        >
          <div></div>
          <Button
            type="primary"
            ghost
            onClick={() => {
              setAddEditModal(true);
            }}
          >
            New {name}
          </Button>
        </div>
        <Table
          columns={columns}
          dataSource={data}
          rowClassName="pointer"
          onRow={(record, rowIndex) => {
            return {
              onClick: () => {
                navigate(`/${link}/${record.id}/details`);
              },
            };
          }}
        />
        {addEditModal && (
          <AddEditModal
            visible={addEditModal}
            setVisible={setAddEditModal}
            loading={loading}
            name={name}
            onSave={onSave}
          />
        )}
      </Spin>
    </>
  );
};

export default List;
