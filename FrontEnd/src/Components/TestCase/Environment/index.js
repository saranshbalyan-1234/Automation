import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import { Table, Button, Popconfirm, Spin } from "antd";
import CustomSearch from "../../Common/Search";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import AddModal from "./AddModal";
import { connect } from "react-redux";
import {
  getAllEnvironments,
  updateColumnValue,
  deleteColumn,
  deleteEnvironment,
} from "../../../Redux/Actions/environment";
const Environment = ({
  visible,
  setVisible,
  currentTestCaseId,
  getAllEnvironments,
  environments,
  loading,
  updateColumnValue,
  deleteColumn,
  deleteEnvironment,
}) => {
  const [columns, setColumns] = useState([]);
  const [searchedData, setSearchedData] = useState([]);
  const [addModal, setAddModal] = useState({ active: false });

  useEffect(() => {
    setSearchedData(environments);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [environments]);
  useEffect(() => {
    getAllEnvironments(currentTestCaseId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTestCaseId]);
  const handleUpdateValue = (record, column, e) => {
    updateColumnValue({
      envId: record.envId,
      name: column,
      value: e.target.innerText,
    });
  };
  useEffect(() => {
    if (environments.length === 0) return;

    const tempDynamicKeys = Object.keys(environments[0]).map((el) => {
      let temp = {
        title:
          el !== "Environment" && el !== "envId" ? (
            <div style={{ paddingLeft: 10 }}>
              {el}
              <Popconfirm
                title={`Are you sure to delete this Column?`}
                onConfirm={async (e) => {
                  e.stopPropagation();
                  await deleteColumn(el);
                }}
                okText="Yes, Delete"
                cancelText="No"
              >
                <DeleteOutlined
                  onClick={(e) => e.stopPropagation()}
                  style={{ fontSize: 14, marginLeft: 5 }}
                />
              </Popconfirm>
            </div>
          ) : (
            el
          ),
        dataIndex: el,
        width: "100%",
      };
      if (el !== "Environment") {
        temp.render = (text, record) => (
          <div style={{ minHeight: 30 }}>
            <div
              className="show-boundary"
              style={{ minHeight: 25 }}
              contentEditable
              onBlur={(e) => handleUpdateValue(record, el, e)}
            >
              {text}
            </div>
          </div>
        );
      }
      return temp;
    });
    const dynamicKeys = tempDynamicKeys.filter((el) => {
      return el.title !== "envId";
    });
    setColumns([
      ...dynamicKeys,
      {
        title: "Actions",
        key: "actions",
        render: (_, record) => (
          <Popconfirm
            title={`Are you sure to delete this Env?`}
            onConfirm={async (e) => {
              e.stopPropagation();
              await deleteEnvironment(record.envId);
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
        width: 70,
      },
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [environments.length > 0 && Object.keys(environments[0]).length]);

  const handleSearch = (e) => {
    let value = e.target.value.toLowerCase();
    const temp = environments.filter((el) => {
      return Object.keys(environments[0]).some((el1) => {
        return (
          el1 !== "envId" &&
          el[el1] &&
          String(el[el1]).toLowerCase().includes(value)
        );
      });
    });
    setSearchedData(temp);
  };

  return (
    <>
      <Modal
        width={1000}
        centered
        visible={visible}
        footer={false}
        onCancel={() => {
          setVisible(false);
        }}
      >
        <Spin spinning={loading}>
          <div
            style={{ maxHeight: "70vh", overflow: "auto", minHeight: "70vh" }}
          >
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                marginRight: 20,
              }}
            >
              <CustomSearch
                width="310px"
                placeholder={`Search By Env Name or Column Value`}
                onSearch={handleSearch}
              />
              <div className="row">
                <Button
                  type="primary"
                  ghost
                  style={{ marginBottom: 5 }}
                  onClick={() => {
                    // setRows([...rows, { env: "Enter Name", editing: true }]);
                    setAddModal({ active: true, type: "Column" });
                  }}
                  disabled={searchedData.length === 0}
                >
                  <PlusOutlined /> Column
                </Button>
                <Button
                  type="primary"
                  style={{ marginBottom: 5 }}
                  onClick={() => {
                    // setRows([...rows, { env: "Enter Name", editing: true }]);
                    setAddModal({ active: true, type: "Environment" });
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
        </Spin>
      </Modal>
      {addModal.active && (
        <AddModal
          visible={addModal.active}
          type={addModal.type}
          setVisible={setAddModal}
        />
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  currentTestCaseId: state.testCase.currentTestCase?.id,
  environments: state.environment.data,
  loading: state.environment.loading,
});
const mapDispatchToProps = {
  getAllEnvironments,
  updateColumnValue,
  deleteColumn,
  deleteEnvironment,
};

export default connect(mapStateToProps, mapDispatchToProps)(Environment);
