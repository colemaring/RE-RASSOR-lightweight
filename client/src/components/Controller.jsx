import React from "react";
import Button from "react-bootstrap/Button";

function Controller({ connected, ws }) {
  const handleForward = () => {
    console.log("Forward button clicked");
    ws.send(
      JSON.stringify({ rover: connected, type: "move", direction: "forward" })
    );
  };

  const handleBackward = () => {
    console.log("Backward button clicked");
    ws.send(
      JSON.stringify({ rover: connected, type: "move", direction: "backward" })
    );
  };

  return (
    <div className="controller">
      <Button onClick={handleForward} disabled={!connected}>
        Forward
      </Button>
      <Button onClick={handleBackward} disabled={!connected}>
        Backward
      </Button>
    </div>
  );
}

export default Controller;
