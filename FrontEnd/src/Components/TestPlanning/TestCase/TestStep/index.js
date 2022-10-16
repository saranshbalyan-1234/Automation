import React from "react";
import { connect } from "react-redux";

export const TestStep = (props) => {
  return <div>TestStep</div>;
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TestStep);
