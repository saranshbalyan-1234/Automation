import React, { useState, useEffect } from "react";
import { Table, Popconfirm, Button, Tag } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import moment from "moment";
// import AddEditModal from "./AddEditModal";
import UserAvatar from "../Common/Avatar";
import { useNavigate } from "react-router-dom";
import Loading from "../Common/Loading";
import CustomSearch from "../Common/Search";
import { connect } from "react-redux";
const DefectList = ({ loading = false, data = [], currentProjectId }) => {
  const navigate = useNavigate();
  const [addEditModal, setAddEditModal] = useState(false);
  const [searchedData, setSearchedData] = useState([]);
  useEffect(() => {
    // getList();
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
      title: "Title",
      dataIndex: "title",
      width: 550,
      render: (text, record) => (
        <div>
          {text}
          <div style={{ overflow: "auto" }}>
            {record.tags?.map((el) => {
              return <Tag>{el}</Tag>;
            })}
          </div>
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      width: 150,
    },
    {
      title: "Priority",
      dataIndex: "priority",
      width: 150,
    },
    {
      title: "Severity",
      dataIndex: "severity",
      width: 150,
    },
    {
      title: "Assignee",
      dataIndex: "assigneeId",
      render: (text) => <UserAvatar user={text} />,
    },
    {
      title: "Reported At",
      dataIndex: "reportedId",

      render: (text, record) => (
        <div>
          {moment(record.createdAt).format("DD/MM/YYYY hh:mm:ss a")} By &nbsp;
          <UserAvatar user={text} />
        </div>
      ),
    },

    {
      title: "",
      key: "actions",
      width: 50,
      render: (_, record) => (
        <div style={{ display: "flex", gap: 10 }}>
          <Popconfirm
            placement="left"
            title={`Are you sure to delete this Defect?`}
            onConfirm={async (e) => {
              e.stopPropagation();
              //   await onDelete(record.id);
            }}
            okText="Yes, Delete"
            cancelText="No"
            // disabled={!deletePermission}
          >
            <DeleteOutlined
              onClick={(e) => e.stopPropagation()}
              style={{
                fontSize: 17,
                // cursor: deletePermission ? "pointer" : "not-allowed",
                // color: deletePermission ? "black" : "grey",
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
          <CustomSearch placeholder={`Search Defect`} onSearch={handleSearch} />
          <Button
            type="primary"
            ghost
            onClick={() => {
              setAddEditModal(true);
            }}
            // disabled={!addPermission}
          >
            New Defect
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
                navigate(`/Defect/${record.id}/details`);
              },
            };
          }}
        />
        {/* {addEditModal && (
          <AddEditModal
            visible={addEditModal}
            setVisible={setAddEditModal}
            loading={loading}
            name={name}
            onSave={onSave}
          />
        )} */}
      </Loading>
    </>
  );
};

const mapStateToProps = (state) => ({
  currentProjectId: state.projects.currentProject?.id,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(DefectList);
