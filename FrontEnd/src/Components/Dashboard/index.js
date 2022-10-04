import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Typography } from "antd";
import axios from "axios";
export const Dashboard = ({ user }) => {
  useEffect(() => {
    axios.get("/project/6/user");
  }, []);

  return <Typography.Title>Hi, {user.name}</Typography.Title>;
};

const mapStateToProps = (state) => ({ user: state.auth.user });

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
