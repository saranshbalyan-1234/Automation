import React, { useState, useEffect } from "react";
import { Table, Popconfirm, Button, Tag } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import moment from "moment";
import AddEditDefectModal from "./AddEditDefectModal";
import UserAvatar from "../Common/Avatar";
import { useNavigate } from "react-router-dom";
import Loading from "../Common/Loading";
import CustomSearch from "../Common/Search";
import { connect } from "react-redux";
import { usePermission } from "../../Utils/permission";
import { getAllDefects } from "../../Redux/Actions/defect";
const DefectList = ({
  loading = false,
  data = [],
  currentProjectId,
  getAllDefects,
}) => {
  const navigate = useNavigate();
  const addDefectPermission = usePermission("Defect", "add");
  const [addEditDefectModal, setAddEditDefectModal] = useState(false);
  const [searchedData, setSearchedData] = useState([]);
  useEffect(() => {
    getAllDefects();
    // eslint-disable-next-line
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
      width: 100,
    },
    {
      title: "Priority",
      dataIndex: "priority",
      width: 100,
    },
    {
      title: "Severity",
      dataIndex: "severity",
      width: 100,
    },
    {
      title: "Assignee",
      dataIndex: "assigneeId",
      width: 100,
      render: (text) => <UserAvatar user={text} />,
    },
    {
      title: "Reported At",
      dataIndex: "reportedId",
      width: 150,
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
              setAddEditDefectModal(true);
            }}
            disabled={!addDefectPermission}
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
        {addEditDefectModal && (
          <AddEditDefectModal
            visible={addEditDefectModal}
            setVisible={setAddEditDefectModal}
          />
        )}
      </Loading>
    </>
  );
};

const mapStateToProps = (state) => ({
  currentProjectId: state.projects.currentProject?.id,
});

const mapDispatchToProps = { getAllDefects };

export default connect(mapStateToProps, mapDispatchToProps)(DefectList);
