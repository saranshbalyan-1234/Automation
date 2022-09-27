import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "antd/dist/antd.min.css";
import "./index.css";
import Register from "./Auth/Register";
import Routess from "./Components/Routess";
import { Provider } from "react-redux";
import { store, persister } from "./Redux/store";
import { PersistGate } from "redux-persist/integration/react";
import SignIn from "./Auth/SignIn";
import SendResetMail from "./Auth/PasswordReset/SendResetMail";
import Agreement from "./Views/Agreement";
import VerifyEmail from "./Auth/VerifyEmail";
import PasswordReset from "./Auth/PasswordReset/PasswordReset";
import interceptor from "../src/Utils/interceptor";

interceptor.setup();

render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persister}>
        <Routes>
          <Route exact path="signin" element={<SignIn />} />
          <Route exact path="register" element={<Register />} />
          <Route exact path="verify-email/:token" element={<VerifyEmail />} />
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
      </PersistGate>
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
