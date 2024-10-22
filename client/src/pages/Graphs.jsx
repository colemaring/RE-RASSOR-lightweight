import React from "react";
import MyNavbar from "../components/MyNavbar";
import RealtimeGraph from "../components/RealtimeGraph";
import EulerGraph from "../components/EulerGraph";
import WheelspeedGraph from "../components/WheelspeedGraph";

const Graphs = () => {
  return (
    <>
      <MyNavbar />
      <div className="graphsContainer">
        <div className="graph1Container">
          <EulerGraph />
        </div>
        <div className="graph2Container">
          <WheelspeedGraph />
        </div>
        <div className="graph3Container">
          <RealtimeGraph name="graph3" />
        </div>
        <div className="graph4Container">
          <RealtimeGraph name="graph4" />
        </div>
      </div>
    </>
  );
};

export default Graphs;
