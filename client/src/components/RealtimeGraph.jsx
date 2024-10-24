import React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { useState, useEffect } from "react";

// Functions to generate placeholder data streams

// Function to generate the initial dataset
const generateInitialDataset = () => {
  const initialDataset = [];
  for (let i = 0; i < 10; i++) {
    initialDataset.push({ x: i, y: Math.floor(Math.random() * 20) + 10 });
  }
  return initialDataset;
};

// Function to create a data stream
const generateDataStream = (setDataset) => {
  let xValue = 10; // Start xValue after the initial dataset
  const intervalId = setInterval(() => {
    setDataset((prevDataset) => {
      const newDataset = [
        ...prevDataset.slice(1), // Remove the first element to maintain dataset size
        { x: xValue++, y: Math.floor(Math.random() * 20) + 10 }, // Add new data with unique x
      ];
      return newDataset;
    });
  }, 1000); // Update the chart every 1 second

  return () => clearInterval(intervalId); // Clear the interval when the component unmounts
};

const RealtimeGraph = ({ name }) => {
  const [dataset, setDataset] = useState(generateInitialDataset());

  useEffect(() => {
    const clearStream = generateDataStream(setDataset);
    return () => clearStream(); // Clear the interval on component unmount
  }, []);

  let color = "black";
  if (name === "graph1") {
    color = "black";
  } else if (name === "graph2") {
    color = "blue";
  } else if (name === "Latency") {
    color = "green";
  } else if (name === "graph4") {
    color = "purple";
  }

  return (
    <div>
      <LineChart
        dataset={dataset}
        xAxis={[{ dataKey: "x" }]} // x-axis is mapped to 'x'
        yAxis={[{ min: 0, max: 40 }]}
        series={[{ dataKey: "y", label: name || "Data", color: color }]} // y-axis is mapped to 'y'
        height={300}
        margin={{ left: 30, right: 30, top: 30, bottom: 30 }}
        grid={{
          horizontal: true,
          vertical: true,
        }}
        skipAnimation
      />
    </div>
  );
};

export default RealtimeGraph;
