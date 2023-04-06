import React from "react";
import Layout from "./Components/Layout";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "./Redux/Actions/auth";
import ErrorPage from "./Views/ErrorPage";
import Setting from "./Components/Settings";
import Dashboard from "./Components/Dashboard";
import Support from "./Views/Support";
import Project from "./Components/Project";
import TestCase from "./Components/TestCase";
import ReusableProcess from "./Components/ReusableProcess";
import ObjectBank from "./Components/ObjectBank";
import { usePermission } from "./Utils/permission";
function Routess({ user }) {
  const location = useLocation();
  const viewTestCasePermission = usePermission("Test Case", "view");
  const viewReusableProcessPermission = usePermission(
    "Reusable Process",
    "view"
  );
  const viewObjectBankPermission = usePermission("Object Bank", "view");
  const viewProjectPermission = usePermission("Project", "view");
  return user ? (
    <Layout
      viewTestCasePermission={viewTestCasePermission}
      viewReusableProcessPermission={viewReusableProcessPermission}
      viewObjectBankPermission={viewObjectBankPermission}
      viewProjectPermission={viewProjectPermission}
    >
      <Routes>
        <Route exact path="/" element={<Dashboard />}></Route>
        <Route exact path="/support" element={<Support />}></Route>
        <Route exact path="/settings/:tab" element={<Setting />}></Route>
        {viewProjectPermission && (
          <Route exact path="/project/*" element={<Project />}></Route>
        )}
        {viewTestCasePermission && (
          <Route exact path="/testCase/*" element={<TestCase />}></Route>
        )}
        {viewReusableProcessPermission && (
          <Route
            exact
            path="/reusableProcess/*"
            element={<ReusableProcess />}
          ></Route>
        )}

        {viewObjectBankPermission && (
          <Route exact path="/objectBank/*" element={<ObjectBank />}></Route>
        )}
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
