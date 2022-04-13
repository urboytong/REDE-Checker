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
import { useState, useEffect, useRef, useContext } from "react";
import firebaseApp from "../../firebase";
import { useLocation, Redirect } from "react-router-dom";
import { AuthContext } from "components/Auth/Auth.js";
import * as canvas from "canvas";
import * as faceapi from "face-api.js";
import yolo from "tfjs-yolo";
import Webcam from "react-webcam";
import Draggable from "react-draggable";
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
  Input,
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
  const [FaceBoxposition, setFaceBoxposition] = useState({ x: 165, y: 250 });
  const [ObjectBoxposition, setObjectBoxposition] = useState({
    x: 480,
    y: 250,
  });
  const [DetectionsBoxX, setDetectionsBoxX] = useState(false);
  const [DetectionsBoxY, setDetectionsBoxY] = useState(false);
  const [FaceBorderBoxColor, setFaceBorderBoxColor] =
    useState("2px solid #6b8be8");
  const [ObjectBoxX, setObjectBoxX] = useState(false);
  const [ObjectBoxY, setObjectBoxY] = useState(false);
  const [ObjectBorderBoxColor, setObjectBorderBoxColor] =
    useState("2px solid #6b8be8");
  const [ObjectSelect, setObjectSelect] = useState(false);
  const [ObjectArr, setObjectArr] = useState(false);
  const FaceBC = useRef();
  const ObjBC = useRef();
  const [Test1, setTest1] = useState(false);
  const [Test2, setTest2] = useState(false);
  const [Test3, setTest3] = useState(false);
  const [Test4, setTest4] = useState(false);

  const { currentUser } = useContext(AuthContext);
  const [User, setUser] = useState({});

  const location = useLocation();

  useEffect(() => {
    if (currentUser) {
      //ใช้ firebaseApp.auth().onAuthStateChanged เพื่อใช้ firebaseApp.auth().currentUser โดยไม่ติด error เมื่อทำการ signout
      firebaseApp.auth().onAuthStateChanged((user) => {
        const db = firebaseApp.firestore();
        const userCollection = db
          .collection("User")
          .where("Uid", "==", firebaseApp.auth().currentUser.uid);

        // subscription นี้จะเกิด callback กับทุกการเปลี่ยนแปลงของ collection Food
        const unsubscribe = userCollection.onSnapshot((ss) => {
          // ตัวแปร local
          let User = {};

          ss.forEach((document) => {
            // manipulate ตัวแปร local
            User = document.data();
          });

          // เปลี่ยนค่าตัวแปร state
          setUser(User);
          runCoco(User.FaceDescriptor);
        });

        return () => {
          // ยกเลิก subsciption เมื่อ component ถูกถอดจาก dom
          unsubscribe();
        };
      });
    }
  }, []);

  const runCoco = async (FaceDescriptor) => {
    const net = await yolo.v3();
    console.log("yolo model loaded.");

    setInterval(() => {
      detect(net, FaceDescriptor);
    }, 1000);
  };

  const detect = async (net, FaceDescriptor) => {
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

      const detections = await faceapi
        .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions()
        .withFaceDescriptors();

      const labeledFaceDescriptorsJson = JSON.parse(FaceDescriptor);
      console.log(FaceDescriptor);

      if (labeledFaceDescriptorsJson) {
        var labeledFaceDescriptors = labeledFaceDescriptorsJson.map((x) =>
          faceapi.LabeledFaceDescriptors.fromJSON(x)
        );

        const threshold = 0.6;
        const faceMatcher = new faceapi.FaceMatcher(
          labeledFaceDescriptors,
          threshold
        );

        const results = detections.map((fd) =>
          faceMatcher.findBestMatch(fd.descriptor)
        );

        if (results.length !== 0) {
          //console.log(results[0]._label)
          setFaceRec(results[0]._label);
          setDetectionsBoxX(
            (detections[0].detection._box._x +
              detections[0].detection._box._width / 2 -
              640) *
              -1
          );
          setDetectionsBoxY(
            detections[0].detection._box._y +
              detections[0].detection._box._height / 2
          );
        }
        if (results.length === 0) {
          setFaceRec("none");
          setDetectionsBoxX(false);
          setDetectionsBoxY(false);
        }
      }
      if (!labeledFaceDescriptorsJson) {
        setFaceRec("no data");
      }

      if (detections.length !== 0) {
        let max = Object.keys(detections[0].expressions).reduce(function (
          a,
          b
        ) {
          return detections[0].expressions[a] > detections[0].expressions[b]
            ? a
            : b;
        });
        //console.log(detections)
        setDetection(max);
      }
      if (detections.length === 0) {
        setDetection("none");
        setFaceBorderBoxColor("2px solid #6b8be8");
      }

      // Make Detections
      const obj = await net.predict(video);
      setObjectArr(obj);
      let text = "";
      if (obj.length >= 1) {
        for (let i = 0; i < obj.length; i++) {
          text += obj[i].class + ", ";
        }
        setObject(text);
        if (text == "") {
          setObject("none");
          setObjectBoxX(false);
          setObjectBoxY(false);
          setObjectBorderBoxColor("2px solid #6b8be8");
        }
      }
      if (obj.length == 0) {
        setObject("none");
        setObjectBoxX(false);
        setObjectBoxY(false);
        setObjectBorderBoxColor("2px solid #6b8be8");
      }
    }
  };

  useEffect(() => {
    //console.log((FaceBoxposition.x-100)+'<='+(DetectionsBoxX+125)+'>='+(FaceBoxposition.x+100))
    //console.log((FaceBoxposition.y-100)+'<='+(DetectionsBoxY+125)+'>='+(FaceBoxposition.y+100))
    if (
      DetectionsBoxX >= FaceBoxposition.x - 100 &&
      DetectionsBoxX <= FaceBoxposition.x + 100 &&
      DetectionsBoxY >= FaceBoxposition.y - 100 &&
      DetectionsBoxY <= FaceBoxposition.y + 100 &&
      FaceRec != "unknown"
    ) {
      setFaceBorderBoxColor("2px solid #79ffe1");
    } else {
      setFaceBorderBoxColor("2px solid #6b8be8");
    }
  }, [FaceBoxposition, DetectionsBoxX, DetectionsBoxY, FaceRec]);

  useEffect(() => {
    console.log(ObjectArr);
    if (ObjectArr.length >= 1) {
      for (let i = 0; i < ObjectArr.length; i++) {
        let check = 0;
        if (ObjectArr[i].class == ObjectSelect) {
          console.log(i);
          setObjectBoxX(
            (ObjectArr[i].left + ObjectArr[i].width / 2 - 640) * -1
          );
          setObjectBoxY(ObjectArr[i].top + ObjectArr[i].height / 2);
          check++;
          break;
        }
        if (check == 0) {
          setObjectBoxX(false);
          setObjectBoxY(false);
          setObjectBorderBoxColor("2px solid #6b8be8");
        }
      }
    }
    if (
      ObjectBoxX >= ObjectBoxposition.x - 100 &&
      ObjectBoxX <= ObjectBoxposition.x + 100 &&
      ObjectBoxY >= ObjectBoxposition.y - 100 &&
      ObjectBoxY <= ObjectBoxposition.y + 100
    ) {
      setObjectBorderBoxColor("2px solid #79ffe1");
    } else {
      setObjectBorderBoxColor("2px solid #6b8be8");
    }
  }, [ObjectBoxposition, ObjectBoxX, ObjectBoxY, ObjectArr, ObjectSelect]);

  useEffect(() => {
    FaceBC.current = FaceBorderBoxColor;
    ObjBC.current = ObjectBorderBoxColor;
    if (
      FaceBorderBoxColor == "2px solid #79ffe1" &&
      ObjectBorderBoxColor == "2px solid #79ffe1"
    ) {
      console.log(FaceBorderBoxColor + " " + ObjectBorderBoxColor);
      setTimeout(function () {
        if (
          FaceBC.current == "2px solid #79ffe1" &&
          ObjBC.current == "2px solid #79ffe1"
        ) {
          console.log(FaceBC.current + " " + ObjBC.current);
          alert("Success!");
        }
      }, 2000);
    }
  }, [FaceBorderBoxColor, ObjectBorderBoxColor]);

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = process.env.PUBLIC_URL + "/models";
      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
      ]);
    };
    loadModels();
  }, []);

  const FacetrackPos = (data) => {
    setFaceBoxposition({ x: data.x + 135, y: data.y + 135 });
  };
  const ObjecttrackPos = (data) => {
    setObjectBoxposition({ x: data.x + 135, y: data.y + 135 });
  };

  let lastUrl = window.location.href;
  new MutationObserver(() => {
    const url = window.location.href;
    if (url !== lastUrl) {
      lastUrl = url;
      onUrlChange();
    }
  }).observe(document, { subtree: true, childList: true });

  function onUrlChange() {
    window.location.reload();
  }

  return (
    <>
      {/* Page content */}
      {/* Table */}
      <div className="col">
        {location.search.substring(1)}
        <Row>
          <Col>
            <div style={{ position: "relative" }}>
              <Webcam
                ref={webcamRef}
                muted={true}
                style={{
                  width: 640,
                  height: 480,
                  transform: "rotateY(180deg)",
                }}
              />

              <div
                style={{
                  position: "absolute",
                  width: 640,
                  top: 0,
                  right: 0,
                  bottom: 0,
                  left: 0,
                }}
              >
                <div
                  className="box"
                  style={{
                    height: "480px",
                    width: "640px",
                    position: "relative",
                    overflow: "auto",
                    padding: "0",
                  }}
                >
                  <div
                    style={{
                      height: "480px",
                      width: "640px",
                      padding: "10px",
                      border: "2px solid #6b8be8",
                    }}
                  >
                    <Draggable
                      bounds="parent"
                      position={{
                        x: FaceBoxposition.x - 135,
                        y: FaceBoxposition.y - 135,
                      }}
                    >
                      <div
                        style={{
                          height: "250px",
                          width: "250px",
                          position: "absolute",
                          cursor: "move",
                          color: "#6b8be8",
                          borderRadius: "5px",
                          margin: "auto",
                          userSelect: "none",
                          border: FaceBorderBoxColor,
                        }}
                      >
                        Face
                      </div>
                    </Draggable>
                    <Draggable
                      bounds="parent"
                      position={{
                        x: ObjectBoxposition.x - 135,
                        y: ObjectBoxposition.y - 135,
                      }}
                    >
                      <div
                        style={{
                          height: "250px",
                          width: "250px",
                          position: "absolute",
                          cursor: "move",
                          color: "#6b8be8",
                          borderRadius: "5px",
                          margin: "auto",
                          userSelect: "none",
                          border: ObjectBorderBoxColor,
                        }}
                      >
                        Object
                      </div>
                    </Draggable>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col>
            <p>Person : {FaceRec}</p>
            <p>Emotion : {Detection}</p>
            <p>Object : {DObject}</p>
            <p>
              FaceDetect : x={DetectionsBoxX} y={DetectionsBoxY}
            </p>
            <p>
              FaceBox : x={FaceBoxposition.x} y={FaceBoxposition.y}
            </p>
            <p>
              ObjectDetect : x={ObjectBoxX} y={ObjectBoxY}
            </p>
            <p>
              ObjectBox : x={ObjectBoxposition.x} y={ObjectBoxposition.y}
            </p>
          </Col>
        </Row>
        <Row>
          <Col>
            <div
              className="box"
              style={{
                height: "480px",
                width: "640px",
                position: "relative",
                overflow: "auto",
                padding: "0",
                background: "lightgrey",
              }}
            >
              <div style={{ height: "480px", width: "640px", padding: "10px" }}>
                <Draggable
                  bounds="parent"
                  onDrag={(e, data) => FacetrackPos(data)}
                  defaultPosition={{ x: 30, y: 115 }}
                >
                  <div
                    style={{
                      height: "250px",
                      width: "250px",
                      position: "absolute",
                      cursor: "move",
                      color: "black",
                      borderRadius: "5px",
                      margin: "auto",
                      userSelect: "none",
                      background: "white",
                    }}
                  >
                    Face x: {FaceBoxposition.x.toFixed(0)}, y:{" "}
                    {FaceBoxposition.y.toFixed(0)}
                  </div>
                </Draggable>
                <Draggable
                  bounds="parent"
                  onDrag={(e, data) => ObjecttrackPos(data)}
                  defaultPosition={{ x: 345, y: 115 }}
                >
                  <div
                    style={{
                      height: "250px",
                      width: "250px",
                      position: "absolute",
                      cursor: "move",
                      color: "black",
                      borderRadius: "5px",
                      margin: "auto",
                      userSelect: "none",
                      background: "white",
                    }}
                  >
                    Object x: {ObjectBoxposition.x.toFixed(0)}, y:{" "}
                    {ObjectBoxposition.y.toFixed(0)}
                  </div>
                </Draggable>
              </div>
            </div>
          </Col>
          <Col>
            <Input
              type="select"
              placeholder="Department"
              style={{
                textAlignVertical: "center",
                textAlign: "center",
                width: "300px",
              }}
              onChange={(event) => setObjectSelect(event.target.value)}
            >
              <option value="" disabled selected hidden>
                Select Quest
              </option>

              <option value="cup">cup</option>
              <option value="bottle">bottle</option>
            </Input>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Icons;
