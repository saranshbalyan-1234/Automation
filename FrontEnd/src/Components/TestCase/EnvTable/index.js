import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import { Table, Button, Popconfirm, Input } from "antd";
import CustomSearch from "../../Common/Search";
import {
  DeleteOutlined,
  PlusOutlined,
  PlusCircleFilled,
} from "@ant-design/icons";
export default function DataTable({ visible, setVisible }) {
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const [searchedData, setSearchedData] = useState([]);
  useEffect(() => {
    setSearchedData(rows);
  }, [rows]);

  useEffect(() => {
    setColumns([
      {
        title: "Environment",
        dataIndex: "env",
        render: (text, record) =>
          record.editing ? (
            <Input
              showCount
              maxLength={30}
              onBlur={(e) => {
                handleAddEdit(e, record);
              }}
              defaultValue={text}
            />
          ) : (
            <div>{text}</div>
          ),
      },
      {
        title: "Actions",
        key: "actions",
        render: (_, record) => (
          <Popconfirm
            title={`Are you sure to delete this Env?`}
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
        ),
      },
    ]);
  }, []);

  const handleSearch = (e) => {
    let value = e.target.value.toLowerCase();
    const temp = rows.filter((el) => {
      return el.env && el.env.toLowerCase().includes(value);
    });
    setSearchedData(temp);
  };
  const onDelete = (id) => {
    const deletedData = searchedData.filter((el) => {
      return el.id !== id;
    });
    setSearchedData(deletedData);
  };
  const handleAddEdit = (e, record) => {
    const value = e.target.value;
    if (record.id) {
      //edit
    } else {
      // add new
      const addedData = searchedData.map((el) => {
        return { ...el, env: value, editing: false };
      });
      setSearchedData(addedData);
    }
  };
  const startEditMode = (id) => {};

  return (
    <Modal
      // title="Environment"
      width={1000}
      centered
      visible={visible}
      footer={false}
      onCancel={() => {
        setVisible(false);
      }}
      // closable={false}
    >
      <div style={{ maxHeight: "70vh", overflow: "auto", minHeight: "70vh" }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            marginRight: 20,
          }}
        >
          <CustomSearch
            width="300px"
            placeholder={`Search By Env Name or Column Value`}
            onSearch={handleSearch}
          />
          <div className="row">
            <Button
              type="primary"
              ghost
              style={{ marginBottom: 5 }}
              onClick={() => {
                setRows([...rows, { env: "Enter Name", editing: true }]);
              }}
            >
              <PlusOutlined /> Column
            </Button>
            <Button
              type="primary"
              style={{ marginBottom: 5 }}
              onClick={() => {
                setRows([...rows, { env: "Enter Name", editing: true }]);
              }}
            >
              <PlusOutlined />
              Environment
            </Button>
          </div>
        </div>
        <Table
          size="small"
          columns={columns}
          dataSource={searchedData}
          pagination={false}
          sticky
        />
      </div>
    </Modal>
  );
}
