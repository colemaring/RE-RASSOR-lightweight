import React from "react";
import MyNavbar from "../components/MyNavbar";
import RealtimeGraph from "../components/RealtimeGraph";
import EulerGraph from "../components/EulerGraph";
import WheelspeedGraph from "../components/WheelspeedGraph";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useState, useEffect, useContext } from "react";
import { DarkModeContext } from "../context/DarkContext";
import { WebSocketsContext } from "../context/WebSocketsContext";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

const Graphs = () => {
  const { darkMode } = useContext(DarkModeContext);
  const { connected, setConnected, ws } = useContext(WebSocketsContext);
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <MyNavbar />
      <div className="graphsContainer">
        <div className="graph1Container">
          <EulerGraph connected={connected} ws={ws} />
        </div>
        <div className="graph2Container">
          <WheelspeedGraph />
        </div>
        <div className="graph3Container">
          <RealtimeGraph name="Latency" />
        </div>
        <div className="graph4Container">
          <RealtimeGraph name="graph4" />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Graphs;
