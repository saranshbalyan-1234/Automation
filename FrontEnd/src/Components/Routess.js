import React from "react";
import Layout from "./Layout";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
// import Home from "./Home";
import { connect } from "react-redux";
import { logout } from "../Redux/Actions/auth";
import ErrorPage from "../Views/ErrorPage";
import Setting from "./Settings";
import Dashboard from "./Dashboard";
import Support from "../Views/Support";
function Routess({ user }) {
  const location = useLocation();
  return user ? (
    <Layout>
      <Routes>
        <Route exact path="/" element={<Dashboard />}></Route>
        <Route exact path="/support" element={<Support />}></Route>
        <Route exact path="/settings" element={<Setting />}></Route>
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
