import React from "react";
import MyNavbar from "../components/MyNavbar";
import fpvstreamplaceholder from "../assets/fpvstreamplaceholder.png";

const FPVStream = () => {
  return (
    <>
      <MyNavbar />
      <div className="streamContainer">
        <img
          src={fpvstreamplaceholder}
          className="streamImage"
          alt="Bin Stream"
        />
      </div>
    </>
  );
};

export default FPVStream;
