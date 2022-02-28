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
// react component that copies the given text inside your clipboard
import { CopyToClipboard } from "react-copy-to-clipboard";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
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
  const [imgSrc, setImgSrc] = useState(false);
  const [showWebcam, setshowWebcam] = useState(true)
  const [showImage, setshowImage] = useState(false)
  const [FaceDes, setFaceDes] = useState(false)
  const [Username, setUsername] = useState('User')
  const [Height, setHeight] = useState(false)
  const [Width, setWidth] = useState(false)
  const [X, setX] = useState(false)
  const [Y, setY] = useState(false)
  const [PositionCheck, setPositionCheck] = useState(false)


  const retake = async () => {
    setshowWebcam(true);
    setshowImage(false);
  }

  const capture = async () => {
    if(PositionCheck =='Bad'){
      alert('ํYour position is not good.')
    }
    if(PositionCheck ==''){
      alert('No face detected.')
    }
    if(PositionCheck =='Good'){
      const imageSrc = webcamRef.current.getScreenshot();
    
      setImgSrc(imageSrc);
      setshowWebcam(false);
      setshowImage(true);
  
      const labels = [Username]
    
      const labeledFaceDescriptors = await Promise.all(
        labels.map(async label => {
          // fetch image data from urls and convert blob to HTMLImage element
          const imgUrl = imageSrc
          const img = await faceapi.fetchImage(imgUrl)
          
          // detect the face with the highest score in the image and compute it's landmarks and face descriptor
          const fullFaceDescription = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
          
          if(!fullFaceDescription) {
            alert(`no faces detected`)
            setshowWebcam(true);
            setshowImage(false);
          }
          if(fullFaceDescription) {
              const faceDescriptors = [fullFaceDescription.descriptor]
              setFaceDes(faceDescriptors[0])
              alert('ํFace registration was success.')
              return new faceapi.LabeledFaceDescriptors(label, faceDescriptors)
          }
  
        },)
      )
      console.log(labeledFaceDescriptors)
      localStorage.setItem('FaceDescription', JSON.stringify(labeledFaceDescriptors));
      const labeledFaceDescriptorsJson = JSON.parse(localStorage.getItem('FaceDescription'));
      var labeledFaceDescriptors2 = labeledFaceDescriptorsJson.map( x=>faceapi.LabeledFaceDescriptors.fromJSON(x) );
      console.log(labeledFaceDescriptors2)
    }

    
  };


  const runCoco = async () => {
    setInterval(() => {
      detect();
    }, 1000);
  };

  const detect = async () => {





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
  
  
      if(detections.length !== 0){
        setHeight(detections[0].detection._box._height);
        setWidth(detections[0].detection._box._width);
        setX(detections[0].detection._box._x);
        setY(detections[0].detection._box._y);
        if(detections[0].detection._box._height >= 200 && detections[0].detection._box._width >= 200 && detections[0].detection._box._x >= 160 && detections[0].detection._box._x <= 240
          && detections[0].detection._box._y >= 120 && detections[0].detection._box._y <= 180){
            setPositionCheck('Good');
        }
        else{
          setPositionCheck('Bad');
        }
        console.log(detections[0].detection)

        
      } 
      if(detections.length === 0){
        setHeight('');
        setWidth('');
        setX('');
        setY('');
        setPositionCheck('');
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

  useEffect(()=>{
    if(PositionCheck =='Good'){
      capture();
    }
  },[PositionCheck]);



  



  
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
                <h3 className="mb-0">Face Registration</h3>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col>
                    <div style={{position: "relative"}}>
                    { showWebcam ? <Webcam
                    ref={webcamRef}
                    muted={true} 
                    style={{
                        width: 640,
                        height: 480,
                    }}
                    /> : null }

                    { showImage ? <img
                    src={imgSrc}
                    /> : null }

                    { showWebcam ? <div style={{position: "absolute", width: 640, top: 0 , right: 0 , bottom: 0 , left: 0}}>
                      <svg
                          width="100%"
                          height="98.5%"
                          className="svg"
                          viewBox="0 0 260 200"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink">
                          <defs>
                              <mask id="overlay-mask" x="0" y="0" width="100%" height="100%">
                                  <rect x="0" y="0" width="100%" height="100%" fill="#fff"/>
                                  <circle cx="50%" cy="50%" r="70" />
                              </mask>
                          </defs>
                          <rect x="0" y="0" width="100%" height="100%" mask="url(#overlay-mask)" fillOpacity="0.7"/>
                      </svg>
                    </div> : null }

                          
                    </div>
                    <div className="topicForm lightGray">Name</div>
                    <FormGroup>
                      <InputGroup className="input-group-alternative mb-3">
                        <Input className="darkGray" type="text" onChange={event => setUsername(event.target.value)}/>
                      </InputGroup>
                    </FormGroup>
                    
                    { showWebcam ? <Button color="primary" type="button" onClick={capture}>Capture photo</Button> : null }
                    { showImage ? <Button color="primary" type="button" onClick={retake}>Retake</Button> : null }

                    <div className="topicForm lightGray">Face Descriptors : {FaceDes}</div>
                  </Col>
                  <Col>
                    <p>Height : {Height}</p>
                    <p>Width : {Width}</p>
                    <p>x : {X}</p>
                    <p>y : {Y}</p>
                    <p>Position : {PositionCheck}</p>

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
