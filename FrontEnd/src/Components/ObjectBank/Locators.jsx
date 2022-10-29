import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  Typography,
  Tooltip,
  Progress,
  Card,
  Table,
  Button,
  Spin,
  Popconfirm,
  Tag,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { deleteLocator, getObjectLocator } from "../../Redux/Actions/object";
export const Locators = ({
  locators,
  currentObjectId,
  deleteLocator,
  getObjectLocator,
}) => {
  useEffect(() => {
    currentObjectId && getObjectLocator(currentObjectId);
  }, [currentObjectId]);

  const columns = [
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Locator",
      dataIndex: "locator",
    },

    {
      title: "Delete",
      key: "delete",
      render: (_, record) => (
        <Popconfirm
          title="Are you sure to remove this locator?"
          onConfirm={async () => {
            await deleteLocator(record.id);
          }}
          okText="Yes, Remove"
          cancelText="No"
        >
          <DeleteOutlined style={{ fontSize: 17 }} onClick={() => {}} />
        </Popconfirm>
      ),
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={locators} size="small" />
    </>
  );
};

const mapStateToProps = (state) => ({
  locators: state.objectBank.currentObject.locators,
  currentObjectId: state.objectBank.currentObject.id,
});

const mapDispatchToProps = { deleteLocator, getObjectLocator };

export default connect(mapStateToProps, mapDispatchToProps)(Locators);
