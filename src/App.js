import React from "react";

import Chart from "./Chart";
import Header from "./Header";
import "./App.css";

require("dotenv").config();

function App() {
  return (
    <div className="App">
      <Header />
      <Chart />
    </div>
  );
}

export default App;
