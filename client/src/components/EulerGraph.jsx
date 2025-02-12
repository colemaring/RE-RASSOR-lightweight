import React, { useState, useEffect } from "react";
import { LineChart } from "@mui/x-charts/LineChart";

const EulerGraph = ({ connected, ws }) => {
  const [dataset, setDataset] = useState([]);

  useEffect(() => {
    if (!connected || !ws) {
      setDataset([]); // Clear dataset when not connected
      return;
    }

    const handleIMUMessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === "IMU") {
          setDataset((prevDataset) => {
            const newDataPoint = {
              x:
                prevDataset.length > 0
                  ? prevDataset[prevDataset.length - 1].x + 1
                  : 0, // Increment x or start at 0
              y1: data.pitch,
              y2: data.yaw,
              y3: data.roll,
            };

            const maxDataPoints = 10; // Keep a rolling window of data
            const newDataset =
              prevDataset.length >= maxDataPoints
                ? [...prevDataset.slice(1), newDataPoint]
                : [...prevDataset, newDataPoint];
            return newDataset;
          });
        }
      } catch (err) {
        console.error("Error parsing message:", err);
      }
    };

    ws.addEventListener("message", handleIMUMessage);

    return () => {
      ws.removeEventListener("message", handleIMUMessage);
    };
  }, [connected, ws]);

  if (!connected) {
    return (
      <div>
        <LineChart
          dataset={[]}
          xAxis={[{ dataKey: "x" }]}
          yAxis={[{ min: -180, max: 180 }]}
          series={[]}
          height={300}
          margin={{ left: 30, right: 30, top: 30, bottom: 30 }}
          grid={{ vertical: true, horizontal: true }}
          skipAnimation
        />
      </div>
    );
  }

  return (
    <div>
      <h3>IMU Data</h3>
      <LineChart
        dataset={dataset}
        xAxis={[{ dataKey: "x" }]}
        yAxis={[{ min: -180, max: 180 }]}
        series={[
          {
            dataKey: "y1",
            label: "Pitch",
            color: "black",
            showDots: false,
          },
          {
            dataKey: "y2",
            label: "Yaw",
            color: "red",
            showDots: false,
          },
          {
            dataKey: "y3",
            label: "Roll",
            color: "blue",
            showDots: false,
          },
        ]}
        height={300}
        margin={{ left: 30, right: 30, top: 30, bottom: 30 }}
        grid={{ vertical: true, horizontal: true }}
        skipAnimation
      />
    </div>
  );
};

export default EulerGraph;
