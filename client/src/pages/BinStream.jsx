import React from "react";
import MyNavbar from "../components/MyNavbar";
import VideoJS from "../components/VideoJS";

const BinStream = () => {
  const playerRef = React.useRef(null);

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: "https://rerassor.com:8084/stream/test/channel/0/hls/live/index.m3u8",
      },
    ],
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // You can handle player events here, for example:
    player.on("waiting", () => {
      videojs.log("player is waiting");
    });

    player.on("dispose", () => {
      videojs.log("player will dispose");
    });
  };

  return (
    <>
      <MyNavbar />
      <div className="videoStreamContainer">
        <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
      </div>
    </>
  );
};

export default BinStream;
