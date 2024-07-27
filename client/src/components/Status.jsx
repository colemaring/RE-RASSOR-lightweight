import React from "react";

function Status({ connected }) {
  if (connected != null) {
    return (
      <div style={{ color: "green", fontWeight: "bold" }}>
        Connected to {connected}
      </div>
    );
  } else {
    return (
      <div style={{ color: "red", fontWeight: "bold" }}>Not Connected</div>
    );
  }
}

export default Status;
