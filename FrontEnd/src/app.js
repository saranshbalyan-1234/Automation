import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "antd/dist/antd.min.css";
import "./index.css";
import Register from "./Auth/Register";
import Routess from "./Routess";
import { Provider } from "react-redux";
import { store, persister } from "./Redux/store";
import { PersistGate } from "redux-persist/integration/react";
import SignIn from "./Auth/SignIn";
import SendResetMail from "./Auth/PasswordReset/SendResetMail";
import Agreement from "./Views/Agreement";
import VerifyEmail from "./Auth/VerifyEmail";
import PasswordReset from "./Auth/PasswordReset/PasswordReset";
import styled from "styled-components";

export default function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persister}>
          <GlobalStyleContainer>
            <Routes>
              <Route exact path="signin" element={<SignIn />} />
              <Route exact path="register" element={<Register />} />
              <Route
                exact
                path="auth/verify-user/:token"
                element={<VerifyEmail />}
              />
              <Route
                exact
                path="auth/verify-customer/:token"
                element={<VerifyEmail />}
              />
              <Route
                exact
                path="reset-password/send-mail"
                element={<SendResetMail />}
              />
              <Route
                exact
                path="reset-password/:token"
                element={<PasswordReset />}
              />
              <Route exact path="user-agreement" element={<Agreement />} />
              <Route path="/*" element={<Routess />} />
            </Routes>
          </GlobalStyleContainer>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  );
}

const GlobalStyleContainer = styled.div`
  .flex {
    display: flex;
    flex-wrap: wrap;
  }
`;
