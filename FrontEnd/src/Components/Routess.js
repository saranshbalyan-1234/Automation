import React from "react";
import Layout from "./Layout";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Home from "./Home";
import { connect } from "react-redux";
import { logout } from "../Redux/Actions/auth";
import NotFound from "./Errors/NotFound";
import Setting from "./Settings";
function Routess({ user }) {
  const location = useLocation();
  return user ? (
    <Layout>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/settings" element={<Setting />}></Route>
        <Route exact path="*" element={<NotFound />} />
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
