import React, { useState, useEffect } from "react";
import { Table, Popconfirm, Button, Tag } from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import moment from "moment";
import UserAvatar from "../Common/Avatar";
import { useNavigate } from "react-router-dom";
import Loading from "../Common/Loading";
import CustomSearch from "../Common/Search";
import { connect } from "react-redux";
import { getAllDefects, deleteDefect } from "../../Redux/Actions/defect";
import { usePermission } from "../../Utils/permission";
import styled from "styled-components";
const DefectList = ({
  loading = false,
  data = [],
  currentProjectId,
  getAllDefects,
  addDefectPermission,
  deleteDefect,
  setting,
}) => {
  const navigate = useNavigate();
  const deleteDefectPermission = usePermission("Defect", "delete");
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
        <div style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
          {text}
          <div style={{ marginTop: 5 }}>
            {record.tags?.map((el) => {
              return <Tag>{el}</Tag>;
            })}
          </div>
        </div>
      ),
    },
    {
      title: <StyledText>Status</StyledText>,
      dataIndex: "statusId",
      width: 150,
      render: (text) => (
        <StyledText>
          {
            setting.status.find((el) => {
              return el.id === text;
            })?.name
          }
        </StyledText>
      ),
    },
    {
      title: <StyledText>Priority</StyledText>,
      dataIndex: "priorityId",
      width: 100,
      render: (text) => (
        <StyledText>
          <div
            style={{
              color: setting.priority.find((el) => {
                return el.id === text;
              })?.color,
            }}
          >
            {
              setting.priority.find((el) => {
                return el.id === text;
              })?.name
            }
          </div>
        </StyledText>
      ),
    },
    {
      title: <StyledText>Severity</StyledText>,
      dataIndex: "severityId",
      width: 100,
      render: (text) => (
        <StyledText>
          {
            setting.severity.find((el) => {
              return el.id === text;
            })?.name
          }
        </StyledText>
      ),
    },
    {
      title: <StyledText>Assignee</StyledText>,
      dataIndex: "assigneeId",
      width: 100,
      render: (text) => (
        <StyledText>
          <UserAvatar user={text} />
        </StyledText>
      ),
    },
    {
      title: <StyledText> Reported At</StyledText>,
      dataIndex: "reporterId",
      width: 230,
      render: (text, record) => (
        <StyledText>
          {moment(record.createdAt).format("DD/MM/YYYY hh:mm a")} By &nbsp;
          <UserAvatar user={text} />
        </StyledText>
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
              await deleteDefect(record.id);
            }}
            okText="Yes, Delete"
            cancelText="No"
            disabled={!deleteDefectPermission}
          >
            <DeleteOutlined
              onClick={(e) => e.stopPropagation()}
              style={{
                fontSize: 17,
                cursor: deleteDefectPermission ? "pointer" : "not-allowed",
                color: deleteDefectPermission ? "black" : "grey",
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
              navigate("/Defect/new");
            }}
            disabled={!addDefectPermission}
          >
            <PlusOutlined /> New Defect
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
      </Loading>
    </>
  );
};

const mapStateToProps = (state) => ({
  currentProjectId: state.projects.currentProject?.id,
  data: state.defect.data,
  setting: state.defect.setting,
});

const mapDispatchToProps = { getAllDefects, deleteDefect };

export default connect(mapStateToProps, mapDispatchToProps)(DefectList);

const StyledText = styled.div`
  display: flex;
  justify-content: center;
  overflow: hidden;
  text-overflow: ellipsis;
`;
