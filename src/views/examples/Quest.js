/*!

=========================================================
* Argon Dashboard React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import { useState, useEffect, useRef } from "react";
import * as canvas from 'canvas';
import * as faceapi from 'face-api.js';
import yolo from 'tfjs-yolo';
import Webcam from "react-webcam";
import Draggable from 'react-draggable';
// react component that copies the given text inside your clipboard
import { CopyToClipboard } from "react-copy-to-clipboard";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";
// core components

const Icons = () => {
  const videoHeight = 480;
  const videoWidth = 640;
  const [Detection, setDetection] = useState(false);
  const [FaceRec, setFaceRec] = useState(false);
  const [initializing, setinitializing] = useState(false);   
  const canvasRef = useRef();
  const webcamRef = useRef(null);
  const [DObject, setObject] = useState(false);
  const [FaceBoxposition, setFaceBoxposition] = useState({ x: 185, y: 250 });
  const [ObjectBoxposition, setObjectBoxposition] = useState({ x: 490, y: 250 });


  const runCoco = async () => {
    const net = await yolo.v3();
    console.log("yolo model loaded.");

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

      const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions().withFaceDescriptors();

      const labeledFaceDescriptorsJson = JSON.parse(localStorage.getItem('FaceDescription'));

      if(labeledFaceDescriptorsJson){
        var labeledFaceDescriptors = labeledFaceDescriptorsJson.map( x=>faceapi.LabeledFaceDescriptors.fromJSON(x) );

        
    
        const threshold = 0.6
        const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, threshold)
        
        const results = detections.map(fd => faceMatcher.findBestMatch(fd.descriptor))
    
        
    
        if(results.length !== 0){
          console.log(results[0]._label)
          setFaceRec(results[0]._label)
          
        } 
        if(results.length === 0){
          setFaceRec('none')        
        }
      }
      if(!labeledFaceDescriptorsJson){
        setFaceRec('no data')  
      }
  
  
      if(detections.length !== 0){
        let max = Object.keys(detections[0].expressions).reduce(function(a, b){ return detections[0].expressions[a] > detections[0].expressions[b] ? a : b });
        console.log(detections)
        setDetection(max)
        
      } 
      if(detections.length === 0){
        setDetection('none')        
      }

      // Make Detections
      const obj = await net.predict(video);
      let text = ''
      if(obj.length >= 1){
        for (let i = 0; i < obj.length; i++) {
          text += obj[i].class + ", ";
        }
        setObject(text)
        if(text == ''){
          setObject('none')
        }
      }
      if(obj.length == 0){
        setObject('none')
      }
      

    }
  };

  useEffect(()=>{runCoco()},[]);


  useEffect(() => {
    const loadModels = async () => {
        const MODEL_URL = process.env.PUBLIC_URL + '/models';
        Promise.all([
            faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
            faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
            faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
            faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
            faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
            faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
        ])
    }
    loadModels();
  }, [])


  const FacetrackPos = (data) => {
    setFaceBoxposition({ x: data.x+135, y: data.y+135 });
 };
 const ObjecttrackPos = (data) => {
    setObjectBoxposition({ x: data.x+135, y: data.y+135 });
  };


  



  
    let lastUrl = window.location.href; 
    new MutationObserver(() => {
      const url = window.location.href;
      if (url !== lastUrl) {
        lastUrl = url;
        onUrlChange();
      }
    }).observe(document, {subtree: true, childList: true});
     
     
    function onUrlChange() {
      window.location.reload();
    }
  


  
  return (
    <>
            <div
        className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
        style={{
          minHeight: "600px",
          backgroundImage:
            "url(" +
            require("../../assets/img/theme/FaceRecognition.png").default +
            ")",
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      >
        {/* Mask */}
        <span className="mask bg-gradient-default opacity-8" />
        {/* Header container */}

      </div>
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <h3 className="mb-0">QUEST</h3>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col>
                    <div>
                    <Webcam
          ref={webcamRef}
          muted={true} 
          style={{
            width: 640,
            height: 480,
          }}
        />
                          
                    </div>
                  </Col>
                  <Col>
                    <p>Person : {FaceRec}</p>
                    <p>Emotion : {Detection}</p>
                    <p>Object : {DObject}</p>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div className="box" style={{height: '480px', width: '640px', position: 'relative', overflow: 'auto', padding: '0', background: 'lightgrey'}}>
                      <div style={{height: '480px', width: '640px', padding: '10px'}}>
                        <Draggable bounds="parent" onDrag={(e, data) => FacetrackPos(data)} defaultPosition={{x: 50, y: 115}}>
                          <div style={{height: '250px', width: '250px', position: 'absolute', cursor: 'move', color: 'black', borderRadius: '5px', margin: 'auto', userSelect: 'none', background: 'white'}}>
                            Face x: {FaceBoxposition.x.toFixed(0)}, y: {FaceBoxposition.y.toFixed(0)}
                          </div>
                        </Draggable>
                        <Draggable bounds="parent" onDrag={(e, data) => ObjecttrackPos(data)} defaultPosition={{x: 355, y: 115}}>
                          <div style={{height: '250px', width: '250px', position: 'absolute', cursor: 'move', color: 'black', borderRadius: '5px', margin: 'auto', userSelect: 'none', background: 'white'}}>
                            Object x: {ObjectBoxposition.x.toFixed(0)}, y: {ObjectBoxposition.y.toFixed(0)}
                          </div>
                        </Draggable>
                      </div>
                    </div>
                  </Col>
                </Row>
                <div>---</div>
                <Row>
                  <Col>
                    <div className="box" style={{height: '480px', width: '640px', position: 'relative', overflow: 'auto', padding: '0', background: 'lightgrey'}}>
                      <div style={{height: '480px', width: '640px', padding: '10px'}}>
                        <Draggable bounds="parent" position={{x: FaceBoxposition.x-135, y: FaceBoxposition.y-135}}>
                          <div style={{height: '250px', width: '250px', position: 'absolute', cursor: 'move', color: 'black', borderRadius: '5px', margin: 'auto', userSelect: 'none', background: 'white'}}>
                            Face
                          </div>
                        </Draggable>
                        <Draggable bounds="parent" position={{x: ObjectBoxposition.x-135, y: ObjectBoxposition.y-135}}>
                          <div style={{height: '250px', width: '250px', position: 'absolute', cursor: 'move', color: 'black', borderRadius: '5px', margin: 'auto', userSelect: 'none', background: 'white'}}>
                            Object
                          </div>
                        </Draggable>
                      </div>
                    </div>
                  </Col>
                </Row>
                
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Icons;
