import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

window.addEventListener('load', async () => {
  await window.ui && ui("theme", "#1f5731")
})

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
