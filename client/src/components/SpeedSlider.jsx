import React, { useEffect, useCallback } from "react";
import Form from "react-bootstrap/Form";
import { useState } from "react";

function SpeedSlider({ connected, ws }) {
  const [speed, setSpeed] = useState(1);
  const [hasInitialized, setHasInitialized] = useState(false);

  const sendSpeedUpdate = useCallback(
    (newSpeed) => {
      if (ws?.readyState === WebSocket.OPEN && connected) {
        console.log("sending new speed", newSpeed);
        try {
          ws.send(
            JSON.stringify({ rover: connected, type: "speed", speed: newSpeed })
          );
        } catch (err) {
          console.error("Failed to send speed update:", err);
        }
      }
    },
    [ws, connected]
  );

  // Handle manual speed changes
  const handleSpeedChange = (event) => {
    const newSpeed = parseFloat(event.target.value);
    setSpeed(newSpeed);
    sendSpeedUpdate(newSpeed);
  };

  // Send initial speed only once when connection is established
  useEffect(() => {
    if (!hasInitialized && ws?.readyState === WebSocket.OPEN && connected) {
      console.log("Sending initial speed", speed);
      sendSpeedUpdate(speed);
      setHasInitialized(true);
    }
  }, [ws?.readyState, connected, hasInitialized, sendSpeedUpdate, speed]);

  // Reset initialization flag when connection changes
  useEffect(() => {
    if (!connected) {
      setHasInitialized(false);
    }
  }, [connected]);

  return (
    <div style={{ textAlign: "center", marginTop: "4rem" }}>
      <h5>Speed Multiplier: {speed}</h5>
      <Form.Range
        disabled={!connected || !ws || ws.readyState !== WebSocket.OPEN}
        value={speed}
        min={0.1}
        max={10}
        step={0.1}
        onChange={handleSpeedChange}
        style={{ width: "200px", margin: "0 auto" }}
      />
    </div>
  );
}

export default SpeedSlider;
