import React from "react";
import { connect } from "react-redux";
import { Typography } from "antd";
export const Dashboard = ({ user }) => {
  return <Typography.Title>Hi, {user.name}</Typography.Title>;
};

const mapStateToProps = (state) => ({ user: state.auth.user });

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
