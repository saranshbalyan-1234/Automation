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
import { usePermission } from "../../Utils/permission";
const ObjectList = ({
  onDelete,
  onSave = () => {},
  loading,
  data,
  getList = () => {},
  currentProjectId,
}) => {
  const navigate = useNavigate();
  const addObjectPermission = usePermission("Object Bank", "add");
  const deleteObjectPermission = usePermission("Object Bank", "delete");
  const [addEditObjectModal, setAddEditObjectModal] = useState(false);
  const [searchedData, setSearchedData] = useState([]);

  useEffect(() => {
    getList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      width: 400,
    },
    {
      title: "Tags",
      dataIndex: "tags",
      width: 300,
      render: (tags, record) => (
        <div style={{ overflow: "auto" }}>
          {tags?.map((el) => {
            return <Tag>{el}</Tag>;
          })}
        </div>
      ),
    },
    {
      title: "Created At",
      dataIndex: "createdBy",
      width: 250,
      render: (_, record) => (
        <div>
          {moment(record.createdAt).format("DD/MM/YYYY h:mm:ss a")} By &nbsp;
          {record.createdBy && <UserAvatar user={record.createdBy.id} />}
        </div>
        // <div>{<UserAvatar user={record.createdBy} />}</div>
      ),
    },

    // {
    //   title: "Last Updated",
    //   key: "updatedAt",
    //   width: 190,
    //   render: (_, record) => (
    //     <div>{moment(record.updatedAt).format("DD/MM/YYYY h:mm:ss a")}</div>
    //   ),
    // },

    {
      title: "",
      key: "actions",
      width: 50,
      render: (_, record) => (
        <div style={{ display: "flex", gap: 10 }}>
          <Popconfirm
            placement="left"
            title={`Are you sure to delete this Object?`}
            onConfirm={async (e) => {
              e.stopPropagation();
              await onDelete(record.id);
            }}
            okText="Yes, Delete"
            cancelText="No"
            disabled={!deleteObjectPermission}
          >
            <DeleteOutlined
              onClick={(e) => e.stopPropagation()}
              style={{
                fontSize: 17,
                cursor: deleteObjectPermission ? "pointer" : "not-allowed",
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
        {" "}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            padding: "10px 0px 10px 0px ",
          }}
        >
          <CustomSearch placeholder={`Search Object`} onSearch={handleSearch} />
          <Button
            type="primary"
            ghost
            onClick={() => {
              setAddEditObjectModal(true);
            }}
            disabled={!addObjectPermission}
          >
            New Object
          </Button>
        </div>
        <Table
          scroll={{ x: true }}
          sticky
          columns={columns}
          dataSource={searchedData}
          rowClassName="pointer"
          onRow={(record, rowIndex) => {
            return {
              onClick: () => {
                navigate(`/ObjectBank}/${record.id}/details`);
              },
            };
          }}
        />
        <AddEditObjectModal
          visible={addEditObjectModal}
          setVisible={setAddEditObjectModal}
          loading={loading}
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
