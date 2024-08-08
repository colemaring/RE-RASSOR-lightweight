import React from "react";
import Button from "react-bootstrap/Button";

function Controller({ connected, ws }) {
  const handleForward = () => {
    console.log("Forward button clicked");
    ws.send(
      JSON.stringify({ rover: connected, type: "move", direction: "forward" })
    );
  };

  const handleStop = () => {
    console.log("Stop button clicked");
    ws.send(
      JSON.stringify({ rover: connected, type: "move", direction: "stop" })
    );
  };

  const handleBackward = () => {
    console.log("Backward button clicked");
    ws.send(
      JSON.stringify({ rover: connected, type: "move", direction: "backward" })
    );
  };

  const handleLeft = () => {
    console.log("Left button clicked");
    ws.send(
      JSON.stringify({ rover: connected, type: "move", direction: "left" })
    );
  };

  const handleRight = () => {
    console.log("Right button clicked");
    ws.send(
      JSON.stringify({ rover: connected, type: "move", direction: "right" })
    );
  };

  return (
    <div className="controller">
      <Button onClick={handleForward} disabled={!connected}>
        Forward <i className="fa-solid fa-arrow-up"></i>
      </Button>
      <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
        <Button onClick={handleLeft} disabled={!connected}>
          Left <i className="fa-solid fa-arrow-left"></i>
        </Button>
        <Button onClick={handleStop} disabled={!connected} variant="danger">
          Stop <i className="fa-solid fa-stop"></i>
        </Button>
        <Button onClick={handleRight} disabled={!connected}>
          Right <i className="fa-solid fa-arrow-right"></i>
        </Button>
      </div>
      <Button onClick={handleBackward} disabled={!connected}>
        Backward <i className="fa-solid fa-arrow-down"></i>
      </Button>
    </div>
  );
}

export default Controller;
