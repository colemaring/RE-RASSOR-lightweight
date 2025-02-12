import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Resources from "./pages/Resources";
import Media from "./pages/Media";
import App from "./App";
import Graphs from "./pages/Graphs";
import BinStream from "./pages/BinStream";
import FPVStream from "./pages/FPVStream";
import Location from "./pages/Location";
import { DarkModeProvider } from "./context/DarkContext";
import { WebSocketsProvider } from "./context/WebSocketsContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <DarkModeProvider>
    <WebSocketsProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/media" element={<Media />} />
          <Route path="/graphs" element={<Graphs />} />
          <Route path="/binstream" element={<BinStream />} />
          <Route path="/fpvstream" element={<FPVStream />} />
          <Route path="/location" element={<Location />} />
        </Routes>
      </BrowserRouter>
    </WebSocketsProvider>
  </DarkModeProvider>
);
