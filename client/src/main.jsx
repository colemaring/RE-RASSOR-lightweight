import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Resources from "./pages/Resources";
import Media from "./pages/Media";
import App from "./App";
import Graphs from "./pages/Graphs";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/about" element={<About />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/media" element={<Media />} />
        <Route path="/graphs" element={<Graphs />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
