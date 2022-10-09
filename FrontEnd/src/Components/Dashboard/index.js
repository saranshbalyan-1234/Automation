import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Typography } from "antd";
// import axios from "axios";

import Tree from "../Common/Tree";
export const Dashboard = ({ user }) => {
  useEffect(() => {
    // axios.get("/project/myProject");
  }, []);

  return (
    <div>
      <Typography.Title>Hi, {user.name}</Typography.Title>
      {/* <Search /> */}
      <Tree />
    </div>
  );
};

const mapStateToProps = (state) => ({ user: state.auth.user });

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
