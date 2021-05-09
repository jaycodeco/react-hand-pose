import React, { useRef } from "react";
import Webcam from "react-webcam";
import * as tf from "@tensorflow/tfjs";
import * as pose from "@tensorflow-models/handpose";
import { drawMarks, cam_style, graph_style } from "./draw";
import "./App.css";

function App() {
  const camRef = useRef(null);
  const graphRef = useRef(null);

  const runPose = async () => {
    const nu_net = await pose.load();
    console.log("loaded");

    setInterval(() => {
      detect(nu_net);
    }, 100);
  };

  const detect = async (nu_net) => {
    if (
      typeof camRef.current !== "undefined" &&
      camRef.current !== null &&
      camRef.current.video.readyState === 4
    ) {
      const video = camRef.current.video;
      const vid_width = camRef.current.video.videoWidth;
      const vid_height = camRef.current.video.videoHeight;

      camRef.current.video.width = vid_width;
      camRef.current.video.height = vid_height;

      graphRef.current.width = vid_width;
      graphRef.current.height = vid_height;

      const plots = await nu_net.estimateHands(video);
      console.log(plots);

      const ctx = graphRef.current.getContext("2d");
      drawMarks(plots, ctx);
    }
  };

  runPose();

  return (
    <div className="App">
      <header className="App-header">
        <Webcam ref={camRef} style={cam_style} />

        <canvas ref={graphRef} style={graph_style} />
      </header>
    </div>
  );
}

export default App;
