import ReactDOM = require("react-dom");
import React from "react";
import App from "./App";
import Wrapper from "./components/wrapper";

ReactDOM.render(
  <Wrapper>
    <App />
  </Wrapper>,
  document.querySelector("#root")
);

// new Worker('./worker.ts');
