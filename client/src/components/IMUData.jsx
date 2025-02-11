import React, { useState, useEffect } from "react";

const IMUData = ({ connected, ws }) => {
  const [imu, setImu] = useState({ yaw: null, pitch: null, roll: null });

  useEffect(() => {
    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === "IMU") {
          setImu({ yaw: data.yaw, pitch: data.pitch, roll: data.roll });
        }
      } catch (err) {
        console.error("Error parsing message:", err);
      }
    };
  }, [ws]);

  if (!connected) return null;

  return (
    <div className="imu-readings">
      <h3>IMU Data</h3>
      <p>Yaw: {imu.yaw !== null ? imu.yaw : "N/A"}</p>
      <p>Pitch: {imu.pitch !== null ? imu.pitch : "N/A"}</p>
      <p>Roll: {imu.roll !== null ? imu.roll : "N/A"}</p>
    </div>
  );
};

export default IMUData;
