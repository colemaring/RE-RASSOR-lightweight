import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Assembly from "./pages/Assembly";
import Media from "./pages/Media";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/about" element={<About />} />
        <Route path="/assembly" element={<Assembly />} />
        <Route path="/media" element={<Media />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
