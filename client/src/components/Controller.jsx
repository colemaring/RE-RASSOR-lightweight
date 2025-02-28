import React from "react";
import Button from "react-bootstrap/Button";

function Controller({ connected, ws }) {
  const handleForward = () => {
    ws.send(
      JSON.stringify({ rover: connected, type: "move", direction: "forward" })
    );
  };

  const handleStop = () => {
    ws.send(
      JSON.stringify({ rover: connected, type: "move", direction: "stop" })
    );
  };

  const handleBackward = () => {
    ws.send(
      JSON.stringify({ rover: connected, type: "move", direction: "backward" })
    );
  };

  const handleLeft = () => {
    ws.send(
      JSON.stringify({ rover: connected, type: "move", direction: "left" })
    );
  };

  const handleRight = () => {
    ws.send(
      JSON.stringify({ rover: connected, type: "move", direction: "right" })
    );
  };

  const handleForwardLeft = () => {
    ws.send(
      JSON.stringify({
        rover: connected,
        type: "move",
        direction: "forwardLeft",
      })
    );
  };

  const handleForwardRight = () => {
    ws.send(
      JSON.stringify({
        rover: connected,
        type: "move",
        direction: "forwardRight",
      })
    );
  };

  const handleBackwardLeft = () => {
    ws.send(
      JSON.stringify({
        rover: connected,
        type: "move",
        direction: "backwardLeft",
      })
    );
  };

  const handleBackwardRight = () => {
    ws.send(
      JSON.stringify({
        rover: connected,
        type: "move",
        direction: "backwardRight",
      })
    );
  };

  return (
    <div className="controller">
      <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
        <Button onClick={handleForwardLeft} disabled={!connected}>
          <i
            className="fa-solid fa-arrow-up"
            style={{ transform: "rotate(-45deg)" }}
          ></i>
        </Button>
        <Button onClick={handleForward} disabled={!connected}>
          <i className="fa-solid fa-arrow-up"></i>
        </Button>
        <Button onClick={handleForwardRight} disabled={!connected}>
          <i
            className="fa-solid fa-arrow-up"
            style={{ transform: "rotate(45deg)" }}
          ></i>
        </Button>
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
        <Button onClick={handleLeft} disabled={!connected}>
          <i className="fa-solid fa-arrow-left"></i>
        </Button>
        <Button onClick={handleStop} disabled={!connected} variant="danger">
          <i className="fa-solid fa-stop"></i>
        </Button>
        <Button onClick={handleRight} disabled={!connected}>
          <i className="fa-solid fa-arrow-right"></i>
        </Button>
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
        <Button onClick={handleBackwardLeft} disabled={!connected}>
          <i
            className="fa-solid fa-arrow-down"
            style={{ transform: "rotate(45deg)" }}
          ></i>
        </Button>
        <Button onClick={handleBackward} disabled={!connected}>
          <i className="fa-solid fa-arrow-down"></i>
        </Button>
        <Button onClick={handleBackwardRight} disabled={!connected}>
          <i
            className="fa-solid fa-arrow-down"
            style={{ transform: "rotate(-45deg)" }}
          ></i>
        </Button>
      </div>
    </div>
  );
}

export default Controller;
