import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Typography, Statistic, Row, Col, Card, Spin } from "antd";
import axios from "axios";
import { Column } from "@ant-design/plots";
import {
  FileOutlined,
  BankOutlined,
  UserOutlined,
  ProjectOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import { VscDebugRestart } from "react-icons/vsc";
const { Title } = Typography;
export const Dashboard = ({ user }) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [graohData, setGraphData] = useState([]);
  useEffect(() => {
    axios.get("/dashboard").then((res) => {
      setData(res.data);
      setLoading(false);
      setGraphData(
        Object.entries(res.data)
          .filter((el) => {
            return (
              el[0] == "testCase" ||
              el[0] == "reusableFlow" ||
              el[0] == "testObject"
            );
          })
          .map((el) => {
            let key = "";
            if (el[0] == "testCase") {
              key = "Test Case";
            } else if (el[0] == "reusableFlow") {
              key = "Reusable Flow";
            } else if (el[0] == "testObject") {
              key = "Test Object";
            }
            return { name: key, Total: el[1] };
          })
      );
    });
  }, []);

  const config = {
    data: graohData,
    xField: "name",
    yField: "Total",
    label: {
      position: "middle",
      // 'top', 'bottom', 'middle',
      style: {
        fill: "white",
        opacity: 0.7,
      },
    },

    xAxis: {
      label: {
        style: {
          lineWidth: 2,
          fill: "black",
        },
      },
    },
    yAxis: {
      label: {
        style: {
          lineWidth: 2,
          fill: "black",
        },
      },
    },
    color: "#001529",
  };

  return (
    <Spin spinning={loading}>
      <StyledContainer>
        {/* <Title level={3}>Hi, {user.name}</Title> */}
        <Row gutter={[16, 16]} style={{ justifyContent: "space-between" }}>
          <div className="flex">
            <Col>
              <Card className="card">
                <Statistic
                  title={
                    <div className="title">
                      <ProjectOutlined className="icon" />
                      <Title level={5}>Projects Assigned</Title>
                    </div>
                  }
                  value={data.project}
                />
              </Card>
            </Col>
            <Col>
              <Card className="card">
                <Statistic
                  title={
                    <div className="title">
                      <UserOutlined className="icon" />
                      <Title level={5}>Total Users</Title>
                    </div>
                  }
                  value={data.user}
                />
              </Card>
            </Col>
          </div>
          <Card title="Data Oriented" className="card" style={{ width: 500 }}>
            <div style={{ width: 450, height: 350 }}>
              <Column {...config} />
            </div>
          </Card>
        </Row>

        {/*   <Row gutter={[16, 16]}>
       <Col>
            <Card className="card">
              <Statistic
                title={
                  <div className="title">
                    <FileOutlined className="icon" />
                    <Title level={5}>Test Cases</Title>
                  </div>
                }
                value={data.testCase}
              />
            </Card>
          </Col>

          <Col>
            <Card className="card">
              <Statistic
                title={
                  <div className="title">
                    <VscDebugRestart className="icon" />
                    <Title level={5}>Reusable Flow</Title>
                  </div>
                }
                value={data.reusableFlow}
              />
            </Card>
          </Col>

          <Col>
            <Card className="card">
              <Statistic
                title={
                  <div className="title">
                    <BankOutlined className="icon" />
                    <Title level={5}>Total Objects</Title>
                  </div>
                }
                value={data.testObject}
              />
            </Card>
          </Col>
        </Row> */}
      </StyledContainer>
    </Spin>
  );
};

const mapStateToProps = (state) => ({ user: state.auth.user });

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

const StyledContainer = styled.div`
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  .card {
    box-shadow: 5px 10px #f6f6f6;
    width: 220px;
  }
  .title {
    gap: 10px;
    display: flex;
  }
  .icon {
    margin-top: 5px;
    font-size: 18px;
  }
`;
