import React from "react";
import Form from "react-bootstrap/Form";
import { useState } from "react";

function SpeedSlider({ connected, ws }) {
  const [speed, setSpeed] = useState(1);

  const handleSpeedChange = (event) => {
    const newSpeed = event.target.value;
    setSpeed(newSpeed);
    console.log(`Speed changed to: ${newSpeed}`);
    ws.send(
      JSON.stringify({ rover: connected, type: "speed", speed: newSpeed })
    );
  };

  return (
    <div style={{ textAlign: "center", marginTop: "4rem" }}>
      <h5>Speed Multiplier: {speed}</h5>
      <Form.Range
        disabled={!connected}
        value={speed}
        min={0.2}
        max={3}
        step={0.1}
        onChange={handleSpeedChange}
        style={{ width: "200px", margin: "0 auto" }} // Center the slider
      />
    </div>
  );
}

export default SpeedSlider;
