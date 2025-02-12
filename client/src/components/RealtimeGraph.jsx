import React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { useState } from "react";

const RealtimeGraph = () => {
  // Initialize dataset as an empty array so the graph is empty.
  const [dataset] = useState([]);

  // IDEA
  // for round trip latency we could just have the server send the current time to
  // any esp32 connected client, and the esp32 will send that same time back to the server,
  // and the server will do the math to determine the round trip latency.
  // what isnt considered here is the fact that we are sending data back to the server
  // on a fixed delay in a loop, so that is added delay which doesnt actually exist, which we could
  // actually subtract.

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

export default RealtimeGraph;
