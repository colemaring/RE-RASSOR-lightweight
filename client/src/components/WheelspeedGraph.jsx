import React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { useState, useEffect } from "react";

// Functions to generate placeholder data streams

// Function to generate the initial dataset
const generateInitialDataset = () => {
  const initialDataset = [];
  for (let i = 0; i < 10; i++) {
    initialDataset.push({ x: i, y: Math.floor(Math.random() * 5) + 2 });
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
        { x: xValue++, y: Math.floor(Math.random() * 3) + 4 }, // Add new data with unique x
      ];
      return newDataset;
    });
  }, 1000); // Update the chart every 1 second

  return () => clearInterval(intervalId); // Clear the interval when the component unmounts
};

const WheelspeedGraph = () => {
  const [dataset, setDataset] = useState(generateInitialDataset());

  useEffect(() => {
    const clearStream = generateDataStream(setDataset);
    return () => clearStream(); // Clear the interval on component unmount
  }, []);

  return (
    <div>
      <LineChart
        dataset={dataset}
        xAxis={[{ dataKey: "x" }]} // x-axis is mapped to 'x'
        yAxis={[{ min: 0, max: 10 }]}
        series={[
          { dataKey: "y", label: "Wheel speed" || "Data", color: "blue" },
        ]} // y-axis is mapped to 'y'
        height={300}
        margin={{ left: 30, right: 30, top: 30, bottom: 30 }}
        grid={{ vertical: true, horizontal: true }}
        skipAnimation
      />
    </div>
  );
};

export default WheelspeedGraph;
