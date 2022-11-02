import React from "react";
import { createRoot } from "react-dom/client";
import interceptor from "../src/Utils/interceptor";
import App from "./app";
import "react-quill/dist/quill.snow.css";

interceptor.setup();
const root = createRoot(document.getElementById("root"));
root.render(<App />);
