import React from "react";

function Status({ connected }) {
  if (connected != null) {
    return (
      <>
        <div
          style={{
            color: "green",
            fontWeight: "bold",
            marginBottom: "0.5rem",
          }}
        >
          Connected to {connected}.
        </div>
        Refresh to disconnect.
      </>
    );
  }
}

export default Status;
