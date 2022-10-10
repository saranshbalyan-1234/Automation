import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Typography, Statistic, Row, Col, Card } from "antd";
// import axios from "axios";

import Tree from "../Common/Tree";
export const Dashboard = ({ user }) => {
  useEffect(() => {
    // axios.get("/project/myProject");
  }, []);

  return (
    <div style={{ paddingTop: 20 }}>
      <Typography.Title level={3}>Hi, {user.name}</Typography.Title>
      <Row gutter={[16, 16]}>
        <Col>
          <Card style={{ backgroundColor: "#f6f6f6" }}>
            <Statistic title="Test Cases" value={2} />
          </Card>
        </Col>

        <Col>
          <Card style={{ backgroundColor: "#f6f6f6" }}>
            <Statistic title="Reusable Flows" value={29} />
          </Card>
        </Col>
        <Col>
          <Card style={{ backgroundColor: "#f6f6f6" }}>
            <Statistic title="Object Bank" value={15} />
          </Card>
        </Col>
        <Col>
          <Card style={{ backgroundColor: "#f6f6f6" }}>
            <Statistic title="Team Members" value={55} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (state) => ({ user: state.auth.user });

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
