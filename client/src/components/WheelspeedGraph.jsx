import React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { useState } from "react";

const WheelspeedGraph = () => {
  // Initialize dataset as an empty array so the graph is empty.
  const [dataset] = useState([]);

  return (
    <div>
      <LineChart
        dataset={dataset}
        xAxis={[{ dataKey: "x" }]} // x-axis is mapped to 'x'
        yAxis={[{ min: 0, max: 10 }]}
        series={[{ dataKey: "y", label: "Wheel speed", color: "blue" }]}
        height={300}
        margin={{ left: 30, right: 30, top: 30, bottom: 30 }}
        grid={{ vertical: true, horizontal: true }}
        skipAnimation
      />
    </div>
  );
};

export default WheelspeedGraph;
