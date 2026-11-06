import React from "react";
import ReactDOM from "react-dom/client";

import GameScreen from "./GameScreen"

import "beercss";

import "./colors.css"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GameScreen />
  </React.StrictMode>,
);
