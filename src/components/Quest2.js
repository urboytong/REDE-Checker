// Import dependencies
import React, { useRef, useState, useEffect } from "react";
import yolo from 'tfjs-yolo';
import Webcam from "react-webcam";

function App() {
  const webcamRef = useRef(null);
  const [DObject, setObject] = useState(false);

  // Main function
  const runCoco = async () => {
    const net = await yolo.v3();
    console.log("yolo model loaded.");
    //  Loop and detect hands
    setInterval(() => {
      detect(net);
    }, 1000);
  };

  const detect = async (net) => {
    // Check data is available
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Make Detections
      const obj = await net.predict(video);
      let text = ''
      if(obj.length >= 1){
        for (let i = 0; i < obj.length; i++) {
          text += obj[i].class + ", ";
        }
        setObject(text)
      }
      

    }
  };

  useEffect(()=>{runCoco()},[]);

  return (
    <div className="App">
      <header className="App-header">
      <p>Object : {DObject}</p>
        <Webcam
          ref={webcamRef}
          muted={true} 
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />
        
      </header>
    </div>
  );
}

export default App;