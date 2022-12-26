import React, { useState, useEffect } from "react";
import { Typography, Card, Button, Tag } from "antd";
import moment from "moment";
import { EditOutlined } from "@ant-design/icons";
import UserAvatar from "../Common/Avatar";
import AddEditModal from "../Common/AddEditModal";
import ColumnGraph from "../Common/ColumnGraph";
import Loading from "../Common/Loading";
import axios from "axios";
import { useParams } from "react-router-dom";
import DetailedExecutionReportModal from "../Dashboard/ExecutedByReport/DetailedExecutionReportModal";
const { Title } = Typography;
const { Meta } = Card;
const TestCasetails = ({ loading, details, name, onEdit = () => {} }) => {
  const { testCaseId } = useParams();
  const [addEditModal, setAddEditModal] = useState(false);
  const [graphLoading, setGraphLoading] = useState(true);
  const [graphData, setGraphData] = useState([]);
  const [editData, setEditData] = useState({});
  const [detailedExecutionReportModal, setDetailedExecutionReportModal] =
    useState(false);

  useEffect(() => {
    axios.post("/dashboard/execution-report", { testCaseId }).then((res) => {
      setGraphLoading(false);
      let tempExecutedData = { ...res.data };
      delete tempExecutedData.Total;
      let executedData = Object.entries(tempExecutedData)
        .filter((el) => {
          return el !== "Total";
        })
        .map((el) => {
          return { name: el[0], Total: el[1] };
        });
      setGraphData(executedData);
    });
  }, [testCaseId]);

  if (loading) return <Loading />;
  return (
    <div style={{ paddingTop: 20 }}>
      <Loading loading={loading}>
        <div className="row" style={{ justifyContent: "space-between" }}>
          <Card
            style={{
              minWidth: "calc(100% - 410px)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
              }}
            >
              <Meta
                title={
                  <div style={{ display: "flex", gap: 20 }}>
                    <Title style={{ textTransform: "capitalize" }} level={3}>
                      {`${name}: ${details.name}`}
                    </Title>
                    <div style={{ color: "black" }}>
                      Created On &nbsp;
                      {moment(details.createdAt).format("DD/MM/YY")} By &nbsp;
                      {details.createdBy && (
                        <UserAvatar user={details.createdBy.id} />
                      )}
                    </div>
                  </div>
                }
                description={
                  <>
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 25,
                        marginBottom: 10,
                      }}
                    >
                      <Card>
                        <Meta
                          title="Total Process"
                          description={details.totalProcess || "N/A"}
                        />
                      </Card>
                      <Card>
                        <Meta
                          title="Reusable Process"
                          description={details.reusableProcessCount || "N/A"}
                        />
                      </Card>
                      <Card>
                        <Meta
                          title="Total Steps"
                          description={details.stepCount || "N/A"}
                        />
                      </Card>
                    </div>

                    <div style={{ display: "flex", gap: 10, maxWidth: 500 }}>
                      <div>Tags:</div>
                      <div>
                        {details.tags?.length > 0
                          ? details.tags.map((el) => {
                              return <Tag>{el}</Tag>;
                            })
                          : "N/A"}
                      </div>
                    </div>
                  </>
                }
              />
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 25,
                }}
              >
                <Button
                  type="primary"
                  ghost
                  onClick={() => {
                    setEditData(details);
                    setAddEditModal(true);
                  }}
                >
                  <EditOutlined />
                  Edit {name} Details
                </Button>
              </div>
            </div>
            {details.description && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: 30,
                }}
              >
                <Meta
                  title="Description"
                  description={
                    <div
                      style={{ marginTop: "5px" }}
                      dangerouslySetInnerHTML={{
                        __html: details.description,
                      }}
                    ></div>
                  }
                />
              </div>
            )}
          </Card>
          <Card style={{ boxShadow: "5px 10px #f6f6f6" }}>
            <Tag
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                cursor: "pointer",
              }}
              onClick={() => {
                setDetailedExecutionReportModal(true);
              }}
            >
              More Details
            </Tag>
            <Loading loading={graphLoading}>
              <ColumnGraph data={graphData} />
            </Loading>
          </Card>
        </div>
      </Loading>
      {addEditModal && (
        <AddEditModal
          visible={addEditModal}
          setVisible={setAddEditModal}
          editData={editData}
          setEditData={setEditData}
          edit={true}
          name={name}
          onEdit={onEdit}
          loading={loading}
        />
      )}
      {detailedExecutionReportModal && (
        <DetailedExecutionReportModal
          visible={detailedExecutionReportModal}
          setVisible={setDetailedExecutionReportModal}
          dashboard={false}
        />
      )}
    </div>
  );
};

export default TestCasetails;
