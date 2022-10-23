import React from "react";
import Layout from "./Components/Layout";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
// import Home from "./Home";
import { connect } from "react-redux";
import { logout } from "./Redux/Actions/auth";
import ErrorPage from "./Views/ErrorPage";
import Setting from "./Components/Settings";
import Dashboard from "./Components/Dashboard";
import Support from "./Views/Support";
import Project from "./Components/Project";
import TestCase from "./Components/TestPlanning/TestCase";
import ReusableFlow from "./Components/TestPlanning/ReusableFlow";
function Routess({ user }) {
  const location = useLocation();
  return user ? (
    <Layout>
      <Routes>
        <Route exact path="/" element={<Dashboard />}></Route>
        <Route exact path="/support" element={<Support />}></Route>
        <Route exact path="/settings/:tab" element={<Setting />}></Route>
        <Route exact path="/project/*" element={<Project />}></Route>
        <Route
          exact
          path="/testPlanning/testCase/*"
          element={<TestCase />}
        ></Route>
        <Route
          exact
          path="/testPlanning/reusableFlow/*"
          element={<ReusableFlow />}
        ></Route>
        <Route
          exact
          path="*"
          element={
            <ErrorPage
              status="404"
              title="404"
              subTitle="Sorry, the page you visited does not exist."
            />
          }
        />
      </Routes>
    </Layout>
  ) : (
    <Navigate
      to={{
        pathname: "/signin",
        state: {
          from: location.pathname,
        },
      }}
    />
  );
}
const mapStateToProps = (state) => ({ user: state.auth.user });

const mapDispatchToProps = { logout };

export default connect(mapStateToProps, mapDispatchToProps)(Routess);
