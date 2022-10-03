import React from "react";
import { createRoot } from "react-dom/client";
import interceptor from "../src/Utils/interceptor";
import App from "./app";

interceptor.setup();
const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
