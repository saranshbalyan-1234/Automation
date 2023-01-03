import React from "react";
import { connect } from "react-redux";
import { Table, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { deleteLocator } from "../../Redux/Actions/object";
import { usePermission } from "../../Utils/permission";
export const Locators = ({ locators, deleteLocator, history = false }) => {
  const editObjectPermission = usePermission("Object Bank", "edit");
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
            disabled={!editObjectPermission}
          >
            <DeleteOutlined
              style={{
                fontSize: 17,
                color: editObjectPermission ? "black" : "grey",
              }}
            />
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

const mapStateToProps = (state) => ({});

const mapDispatchToProps = { deleteLocator };

export default connect(mapStateToProps, mapDispatchToProps)(Locators);
