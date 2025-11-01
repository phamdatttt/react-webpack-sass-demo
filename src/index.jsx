import React from "react";
import { createRoot } from "react-dom/client";

// bootstrap css từ reactstrap ecosystem
import "bootstrap/dist/css/bootstrap.min.css";

// scss custom của mình
import "./styles/main.scss";

import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(<App />);
