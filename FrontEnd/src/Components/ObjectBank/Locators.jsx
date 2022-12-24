import React from "react";
import { connect } from "react-redux";
import { Table, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { deleteLocator } from "../../Redux/Actions/object";
export const Locators = ({ locators, deleteLocator, history = false }) => {
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
      title: "",
      key: "delete",
      render: (_, record) =>
        !history && (
          <Popconfirm
            placement="left"
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
      <Table sticky columns={columns} dataSource={locators} size="small" />
    </>
  );
};

const mapStateToProps = (state) => ({
  currentObjectId: state.objectBank.currentObject.id,
});

const mapDispatchToProps = { deleteLocator };

export default connect(mapStateToProps, mapDispatchToProps)(Locators);
