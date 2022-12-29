import React from "react";
import { connect } from "react-redux";
import { Table, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { deleteLocator } from "../../Redux/Actions/object";
export const Locators = ({
  currentObjectId,
  locators,
  deleteLocator,
  history = false,
}) => {
  const handleDeleteLocator = async (id, name, type) => {
    return await deleteLocator(id, name, type);
  };
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
              await handleDeleteLocator(record.id, record.locator, record.type);
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
