import React from "react";
import MyNavbar from "../components/MyNavbar";

const Graphs = () => {
  const containerStyle = {
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  };

  const imageStyle = {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  };

  return (
    <>
      <MyNavbar />
      <div style={containerStyle}>
        <img src="./src/assets/graph.png" alt="Graphs" style={imageStyle} />
      </div>
    </>
  );
};

export default Graphs;
