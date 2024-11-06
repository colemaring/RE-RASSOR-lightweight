import React from "react";
import MyNavbar from "../components/MyNavbar";
import RealtimeGraph from "../components/RealtimeGraph";
import EulerGraph from "../components/EulerGraph";
import WheelspeedGraph from "../components/WheelspeedGraph";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { DarkModeContext } from "../context/DarkContext";

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

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <MyNavbar />
      <div className="graphsContainer">
        <div className="graph1Container">
          <EulerGraph />
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
