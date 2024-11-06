import React from "react";
import MyNavbar from "../components/MyNavbar";
import binstreamplaceholder from "../assets/binstreamplaceholder.png";

const BinStream = () => {
  return (
    <>
      <MyNavbar />
      <div className="streamContainer">
        <img
          src={binstreamplaceholder}
          className="streamImage"
          alt="Bin Stream"
        />
      </div>
    </>
  );
};

export default BinStream;
