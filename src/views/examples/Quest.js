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
import "assets/scss/argon-dashboard/custom/Quest.scss";
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
    useState("3px solid #6b8be8");
  const [ObjectBoxX, setObjectBoxX] = useState(false);
  const [ObjectBoxY, setObjectBoxY] = useState(false);
  const [ObjectBorderBoxColor, setObjectBorderBoxColor] =
    useState("3px solid #6b8be8");
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
  const [image, setimage] = useState("");
  const [ScreenShot, setScreenShot] = useState();

  const [CurrentQuest, setCurrentQuest] = useState({});
  const [QuestSuccess, setQuestSuccess] = useState(false);

  const [QuestForm, setQuestForm] = useState(true);
  const [SendQuestForm, setSendQuestForm] = useState(false);
  const [SendQuestComplete, setSendQuestComplete] = useState(false);

  const [Onloading, setOnloading] = useState(true);

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

  useEffect(() => {
    //ใช้ firebaseApp.auth().onAuthStateChanged เพื่อใช้ firebaseApp.auth().currentUser โดยไม่ติด error เมื่อทำการ signout
    firebaseApp.auth().onAuthStateChanged((user) => {
      const db = firebaseApp.firestore();
      const userCollection = db
        .collection("Quest")
        .where("ClassRoomId", "==", location.search.substring(1));

      // subscription นี้จะเกิด callback กับทุกการเปลี่ยนแปลงของ collection Food
      const unsubscribe = userCollection.onSnapshot((ss) => {
        // ตัวแปร local
        let CurrentQuest = {};

        ss.forEach((document) => {
          // manipulate ตัวแปร local
          if (document.data().EndTimeStamp >= Date.now()) {
            CurrentQuest = document.data();
            CurrentQuest.DocId = document.id;
          }
        });
        if (Object.keys(CurrentQuest).length == 0) {
          window.location.reload();
        }
        // เปลี่ยนค่าตัวแปร state
        setCurrentQuest(CurrentQuest);
        setObjectSelect(CurrentQuest.ObjectSelect);
        setFaceBoxposition({
          x: CurrentQuest.FaceBoxposition.x,
          y: CurrentQuest.FaceBoxposition.y,
        });
        setObjectBoxposition({
          x: CurrentQuest.ObjectBoxposition.x,
          y: CurrentQuest.ObjectBoxposition.y,
        });
        console.log(CurrentQuest);
      });

      return () => {
        // ยกเลิก subsciption เมื่อ component ถูกถอดจาก dom
        unsubscribe();
      };
    });
  }, []);

  const runCoco = async (FaceDescriptor) => {
    const net = await yolo.v3();
    console.log("yolo model loaded.");

    const interval = setInterval(() => {
      detect(net, FaceDescriptor);
    }, 1000);

    return () => clearInterval(interval);
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

      if (labeledFaceDescriptorsJson) {
        var labeledFaceDescriptors = labeledFaceDescriptorsJson.map((x) =>
          faceapi.LabeledFaceDescriptors.fromJSON(x)
        );

        const threshold = 0.55;
        const faceMatcher = new faceapi.FaceMatcher(
          labeledFaceDescriptors,
          threshold
        );

        const results = detections.map((fd) =>
          faceMatcher.findBestMatch(fd.descriptor)
        );

        if (results.length !== 0) {
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
        setFaceBorderBoxColor("3px solid #6b8be8");
      }

      // Make Detections
      const obj = await net.predict(video, {
        maxBoxes: 5, // defaults to 20
      });
      setObjectArr(obj);
      setOnloading(false);
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
          setObjectBorderBoxColor("3px solid #6b8be8");
        }
      }
      if (obj.length == 0) {
        setObject("none");
        setObjectBoxX(false);
        setObjectBoxY(false);
        setObjectBorderBoxColor("3px solid #6b8be8");
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
      setFaceBorderBoxColor("3px solid #79ffe1");
    } else {
      setFaceBorderBoxColor("3px solid #6b8be8");
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
          setObjectBorderBoxColor("3px solid #6b8be8");
        }
      }
    }
    if (
      ObjectBoxX >= ObjectBoxposition.x - 100 &&
      ObjectBoxX <= ObjectBoxposition.x + 100 &&
      ObjectBoxY >= ObjectBoxposition.y - 100 &&
      ObjectBoxY <= ObjectBoxposition.y + 100
    ) {
      setObjectBorderBoxColor("3px solid #79ffe1");
    } else {
      setObjectBorderBoxColor("3px solid #6b8be8");
    }
  }, [ObjectBoxposition, ObjectBoxX, ObjectBoxY, ObjectArr, ObjectSelect]);

  useEffect(() => {
    FaceBC.current = FaceBorderBoxColor;
    ObjBC.current = ObjectBorderBoxColor;
    if (
      FaceBorderBoxColor == "3px solid #79ffe1" &&
      ObjectBorderBoxColor == "3px solid #79ffe1"
    ) {
      console.log(FaceBorderBoxColor + " " + ObjectBorderBoxColor);
      const interval = setInterval(() => {
        if (
          FaceBC.current == "3px solid #79ffe1" &&
          ObjBC.current == "3px solid #79ffe1"
        ) {
          try {
            console.log(FaceBC.current + " " + ObjBC.current);
            setScreenShot(webcamRef.current.getScreenshot());
            setQuestSuccess(true);
          } catch (error) {
            console.log(error);
          }
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [FaceBorderBoxColor, ObjectBorderBoxColor]);

  useEffect(() => {
    if (QuestSuccess) {
      setQuestForm(false);
      setSendQuestForm(true);
      setQuestSuccess(false);
    }
  }, [QuestSuccess]);

  const SendQuest = async () => {
    if (!SendQuestComplete) {
      setSendQuestComplete(true);
      const files = ScreenShot;
      const data = new FormData();
      data.append("file", files);
      data.append("upload_preset", "Quest_images");
      const res = await fetch(
        "	https://api.cloudinary.com/v1_1/daxwfdlwj/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const file = await res.json();
      //เปลี่ยน setIimage เป็น setImage เพื่อเก็บ url โดยตรง
      setimage(file.secure_url);
      console.log(file.secure_url);

      let myquest = {
        Uid: firebaseApp.auth().currentUser.uid,
        Image: file.secure_url,
      };
      let complete = CurrentQuest.Complete;
      complete.push(myquest);
      const db = firebaseApp.firestore();
      const res2 = await db.collection("Quest").doc(CurrentQuest.DocId).update({
        Complete: complete,
      });
      window.location.reload();
    }
  };

  const Retake = async () => {
    setFaceBorderBoxColor("3px solid #6b8be8");
    setObjectBorderBoxColor("3px solid #6b8be8");
    setQuestForm(true);
    setSendQuestForm(false);
  };

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
        {QuestForm ? (
          <div className="text-center">
            <h1 className="mb-3">Object: {ObjectSelect}</h1>
          </div>
        ) : null}

        {QuestForm ? (
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

                {!Onloading ? (<div
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
                        border: "3px solid #6b8be8",
                      }}
                    >
                      <Draggable
                        bounds="parent"
                        position={{
                          x: FaceBoxposition.x - 110,
                          y: FaceBoxposition.y - 110,
                        }}
                      >
                        <div
                          style={{
                            height: "200px",
                            width: "200px",
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
                          x: ObjectBoxposition.x - 110,
                          y: ObjectBoxposition.y - 110,
                        }}
                      >
                        <div
                          style={{
                            height: "200px",
                            width: "200px",
                            position: "absolute",
                            cursor: "move",
                            color: "#6b8be8",
                            borderRadius: "5px",
                            margin: "auto",
                            userSelect: "none",
                            border: ObjectBorderBoxColor,
                          }}
                        >
                          {ObjectSelect}
                        </div>
                      </Draggable>
                    </div>
                  </div>
                </div>) : null}
                {Onloading ? (<div
                  style={{
                    position: "absolute",
                    width: 640,
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    textAlign: "center",
                    padding: "240px 0",
                    backgroundColor: "rgba(220,220,220, 0.3)"
                  }}
                >
                    <h1 className="mb-3">LOADING...</h1>
                </div>) : null}
              </div>
            </Col>
            <Col>
              {/*<p>Person : {FaceRec}</p>
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
            </p>*/}
            </Col>
          </Row>
        ) : null}
        {SendQuestForm ? (
          <div className="text-center">
            <h1 className="mb-3 text-green">Complete</h1>
          </div>
        ) : null}
        {SendQuestForm ? (
          <Row>
            {/* <Col> */}
            <div style={{ position: "relative" }}>
              <img
                src={ScreenShot}
                style={{
                  display: "block",
                  marginLeft: "auto",
                  marginRight: "auto",
                  transform: "rotateY(180deg)",
                }}
              />
              <Row>
                <Col>
                  <Button
                    className="mt-4 buttonStyle btn-quest"
                    color="success"
                    type="button"
                    onClick={() => SendQuest()}
                  >
                    SEND QUEST
                  </Button>
                </Col>
                <Col>
                  <Button
                    className="mt-4 buttonStyle btn-quest"
                    color="danger"
                    type="button"
                    onClick={() => Retake()}
                  >
                    RETAKE
                  </Button>
                </Col>
              </Row>
              {/* <Col>
              <Button
                className="mt-4 buttonStyle btn-quest"
                color="dark"
                type="button"
                onClick={() => SendQuest()}
              >
                SEND QUEST
              </Button>
            </Col> */}
              {/* <div className="box mt-3">
              <div className="line"></div>
              <div className="lightGray-textSize or">OR</div>
              <div className="line"></div>
            </div> */}
              {/* <Col>
                <Button
                  className="mt-4 buttonStyle btn-quest"
                  color="dark"
                  type="button"
                  onClick={() => Retake()}
                >
                  RETAKE
                </Button>
            </Col> */}
            </div>
            {/* </Col> */}
          </Row>
        ) : null}
        <Row></Row>
      </div>
    </>
  );
};

export default Icons;
