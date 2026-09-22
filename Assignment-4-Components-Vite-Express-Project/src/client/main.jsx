import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import Home from "./Home"
import {BrowserRouter, Routes, Route} from "react-router-dom";

//Something wierd is going on with how it is interpreting this because it load th page if there is paragraph tag in it but not if not
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<App />} />
        <Route path="/home" element={<Home />} />
        <Route path="/home.html" element={<Home />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
