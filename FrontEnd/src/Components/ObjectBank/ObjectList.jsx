import React, { useState, useEffect } from "react";
import { Table, Popconfirm, Button, Tag } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import moment from "moment";
import AddEditObjectModal from "./AddEditObjectModal";
import UserAvatar from "../Common/Avatar";
import { useNavigate } from "react-router-dom";
import Loading from "../Common/Loading";
import CustomSearch from "../Common/Search";
import { connect } from "react-redux";
const ObjectList = ({
  onDelete,
  onSave = () => {},
  loading,
  data,
  name,
  link,
  getList = () => {},
  currentProjectId,
}) => {
  const navigate = useNavigate();
  const [addEditObjectModal, setAddEditObjectModal] = useState(false);
  const [searchedData, setSearchedData] = useState([]);

  useEffect(() => {
    getList();
  }, [currentProjectId]);

  useEffect(() => {
    setSearchedData(data);
  }, [data]);

  const handleSearch = (e) => {
    let value = e.target.value.toLowerCase();
    const temp = data.filter((el) => {
      return (
        el.name.toLowerCase().includes(value) ||
        el.tags?.some((el1) => {
          return el1.toLowerCase().includes(value);
        })
      );
    });
    setSearchedData(temp);
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      width: 500,
    },
    {
      title: "Tags",
      dataIndex: "tags",
      width: 300,
      render: (tags, record) => (
        <div>
          {tags?.map((el) => {
            return <Tag>{el}</Tag>;
          })}
        </div>
      ),
    },
    {
      title: "Created At",
      dataIndex: "createdBy",
      width: 290,
      render: (_, record) => (
        <div>
          {moment(record.createdAt).format("DD/MM/YYYY h:mm:ss a")} By &nbsp;
          {record.createdBy && <UserAvatar user={record.createdBy} />}
        </div>
        // <div>{<UserAvatar user={record.createdBy} />}</div>
      ),
    },

    {
      title: "Last Updated",
      key: "updatedAt",
      width: 210,
      render: (_, record) => (
        <div>{moment(record.updatedAt).format("DD/MM/YYYY h:mm:ss a")}</div>
      ),
    },

    {
      title: "Actions",
      key: "actions",
      width: 70,
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
      <Loading loading={loading}>
        {" "}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            padding: "10px 0px 10px 0px ",
          }}
        >
          <CustomSearch
            placeholder={`Search ${name}`}
            onSearch={handleSearch}
          />
          <Button
            type="primary"
            ghost
            onClick={() => {
              setAddEditObjectModal(true);
            }}
          >
            New {name}
          </Button>
        </div>
        <Table
          columns={columns}
          dataSource={searchedData}
          rowClassName="pointer"
          onRow={(record, rowIndex) => {
            return {
              onClick: () => {
                navigate(`/${link}/${record.id}/details`);
              },
            };
          }}
        />
        <AddEditObjectModal
          visible={addEditObjectModal}
          setVisible={setAddEditObjectModal}
          loading={loading}
          name={name}
          onSave={onSave}
        />
      </Loading>
    </>
  );
};

const mapStateToProps = (state) => ({
  currentProjectId: state.projects.currentProject?.id,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ObjectList);
