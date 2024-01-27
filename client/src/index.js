import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
// import { ProductProvider } from "./productsContext";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <ProductProvider> */}
      <App />
      {/* </ProductProvider> */}
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
