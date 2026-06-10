import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
// index.css가 css 폴더로 이동했으므로 경로 수정! (안 쓰신다면 주석 처리해도 무방합니다)
import "./css/index.css";
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
