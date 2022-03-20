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

// reactstrap components
import React, { useState, useEffect, useContext, useRef } from "react";
import * as faceapi from "face-api.js";
import Webcam from "react-webcam";
import firebaseApp from "../../firebase";
import { Redirect } from "react-router-dom";
import { AuthContext } from "components/Auth/Auth.js";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";
import "assets/scss/argon-dashboard/custom/register.scss";

const Register = () => {
  const [role, setRole] = useState("Teacher1");
  const [TeacherRoleForm, setTeacherRoleForm] = useState(true);
  const [StudentRoleForm, setStudentRoleForm] = useState(false);
  const [RegisForm, setRegisForm] = useState(true);
  const [FaceRegisForm, setFaceRegisForm] = useState(false);

  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [AcademicRanks, setAcademicRanks] = useState("Assoc. Prof.");
  const [Faculty, setFaculty] = useState(
    "College of Multidisciplinary Science"
  );
  const [Department, setDepartment] = useState("");
  const [Major, setMajor] = useState("");
  const [FaceDescriptor, setFaceDescriptor] = useState(null);

  const [FirstNameError, setFirstNameError] = useState("");
  const [LastNameError, setLastNameError] = useState("");
  const [EmailError, setEmailError] = useState("");
  const [PasswordError, setPasswordError] = useState("");
  const [ConfirmPasswordError, setConfirmPasswordError] = useState("");
  const [AcademicRanksError, setAcademicRanksError] = useState("");
  const [FacultyError, setFacultyError] = useState("");
  const [DepartmentError, setDepartmentError] = useState("");
  const [MajorError, setMajorError] = useState("");
  const [FaceDescriptorError, setFaceDescriptorError] = useState("");

  const db = firebaseApp.firestore();
  const userCollection = db.collection("User");
  const [Signuped, setSignuped] = useState(false);

  const videoHeight = 480;
  const videoWidth = 640;
  const [Detection, setDetection] = useState(false);
  const [FaceRec, setFaceRec] = useState(false);
  const [initializing, setinitializing] = useState(false);
  const canvasRef = useRef();
  const webcamRef = useRef(null);
  const [DObject, setObject] = useState(false);
  const [imgSrc, setImgSrc] = useState(false);
  const [showWebcam, setshowWebcam] = useState(false);
  const [showImage, setshowImage] = useState(false);
  const [FaceDes, setFaceDes] = useState(false);
  const [Username, setUsername] = useState("User");
  const [Height, setHeight] = useState(false);
  const [Width, setWidth] = useState(false);
  const [X, setX] = useState(false);
  const [Y, setY] = useState(false);
  const [PositionCheck, setPositionCheck] = useState(false);
  const CurrFacePosition = useRef();
  const [ModelLoading, setModelLoading] = useState(true);
  const [FaceDesFillState, setFaceDesFillState] = useState(false);
  const [FaceDesEmptyState, setFaceDesEmptyState] = useState(true);
  const [VideoBorderColor, setVideoBorderColor] = useState("5px solid #5e72e4");
  const [FaceRegisLoading, setFaceRegisLoading] = useState(
    require("../../assets/img/image/Loading.gif").default
  );

  ////////////// Register //////////////

  async function insertDocumentforTeacher(Uid) {
    const documentRef = await userCollection.add({
      FirstName,
      LastName,
      Email,
      Uid,
      Faculty,
      Department,
      Major,
      AcademicRanks,
      role,
    });
    console.log(`new document has been inserted as ${documentRef.id}`);
    setSignuped(true);
  }

  async function insertDocumentforStudent(Uid) {
    const documentRef = await userCollection.add({
      FirstName,
      LastName,
      Email,
      Uid,
      Faculty,
      Department,
      Major,
      role,
      FaceDescriptor,
    });
    console.log(`new document has been inserted as ${documentRef.id}`);
    setSignuped(true);
  }

  const changeRole = (role) => {
    if (role === "Teacher") {
      setRole("Teacher1");
      setTeacherRoleForm(true);
      setStudentRoleForm(false);
    } else {
      setRole("Student");
      setTeacherRoleForm(false);
      setStudentRoleForm(true);
    }

    console.log("role :" + role);
  };

  const ShowFaceRegisForm = () => {
    setRegisForm(false);
    setFaceRegisForm(true);
    setshowImage(false);
    runCoco();
    setTimeout(function () {
      setModelLoading(false);
      setshowWebcam(true);
    }, 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    clearErrors();
    ErrorsCheck();

    try {
      if (role == "Teacher1") {
        if (
          FirstName !== "" &&
          LastName !== "" &&
          ConfirmPassword !== "" &&
          ConfirmPassword == Password &&
          AcademicRanks !== "" &&
          Faculty !== "" &&
          Department !== "" &&
          Major !== ""
        ) {
          firebaseApp
            .auth()
            .createUserWithEmailAndPassword(Email, Password)
            .then((res) => {
              if (res.user) {
                insertDocumentforTeacher(firebaseApp.auth().currentUser.uid);
                console.log(res.user);
              }
            })
            .catch((error) => {
              switch (error.code) {
                case "auth/email-already-in-use":
                  setEmailError(
                    "The email address is already in use by another account."
                  );
                  break;
                case "auth/invalid-email":
                  setEmailError("The email address is badly formatted.");
                  break;
                case "auth/weak-password":
                  setPasswordError("Password should be at least 6 characters.");
                  break;
              }
            });
        }
      }
      if (role == "Student") {
        if (
          FirstName !== "" &&
          LastName !== "" &&
          ConfirmPassword !== "" &&
          ConfirmPassword == Password &&
          AcademicRanks !== "" &&
          Faculty !== "" &&
          Department !== "" &&
          Major !== "" &&
          FaceDescriptor !== null
        ) {
          firebaseApp
            .auth()
            .createUserWithEmailAndPassword(Email, Password)
            .then((res) => {
              if (res.user) {
                insertDocumentforStudent(firebaseApp.auth().currentUser.uid);
                console.log(res.user);
              }
            })
            .catch((error) => {
              switch (error.code) {
                case "auth/email-already-in-use":
                case "auth/invalid-email":
                  setEmailError(
                    "The email address is already in use by another account"
                  );
                  break;
                case "auth/weak-password":
                  setPasswordError("Password should be at least 6 characters");
                  break;
              }
            });
        }
      }
    } catch (error) {
      alert(error);
    }
  };

  function ErrorsCheck() {
    if (Email == "") setEmailError("Must not be empty.");
    if (Password == "") setPasswordError("Must not be empty.");
    if (FirstName == "") setFirstNameError("Must not be empty.");
    if (LastName == "") setLastNameError("Must not be empty.");
    if (ConfirmPassword == "") setConfirmPasswordError("Must not be empty.");
    if (ConfirmPassword !== Password)
      setConfirmPasswordError("Passwords do not match.");
    if (AcademicRanks == "") setAcademicRanksError("Must not be empty.");
    if (Faculty == "") setFacultyError("Must not be empty.");
    if (Department == "") setDepartmentError("Must not be empty.");
    if (Major == "") setMajorError("Must not be empty.");
    if (FaceDescriptor == null)
      setFaceDescriptorError("Face Descriptor Must not be empty.");
  }

  const clearErrors = () => {
    setEmailError("");
    setPasswordError("");
    setFirstNameError("");
    setLastNameError("");
    setConfirmPasswordError("");
    setAcademicRanksError("");
    setFacultyError("");
    setDepartmentError("");
    setMajorError("");
    setFaceDescriptorError("");
  };

  useEffect(() => {
    if (FaceDescriptor) {
      setFaceDesFillState(true);
      setFaceDesEmptyState(false);
    }
    if (!FaceDescriptor) {
      setFaceDesFillState(false);
      setFaceDesEmptyState(true);
    }
  }, [FaceDescriptor]);

  ////////////// Face Recognition //////////////

  const retake = async () => {
    setshowWebcam(true);
    setshowImage(false);
  };

  const capture = async () => {
    try {
      if (FaceRegisForm && webcamRef && showWebcam) {
        if (PositionCheck == "Bad") {
          alert("ํYour position is not good.");
        }
        if (PositionCheck == "") {
          alert("No face detected.");
        }
        if (PositionCheck == "Good") {
          const imageSrc = webcamRef.current.getScreenshot();

          setImgSrc(imageSrc);
          setshowWebcam(false);
          setshowImage(true);

          const labels = ["User"];

          const labeledFaceDescriptors = await Promise.all(
            labels.map(async (label) => {
              // fetch image data from urls and convert blob to HTMLImage element
              const imgUrl = imageSrc;
              const img = await faceapi.fetchImage(imgUrl);

              // detect the face with the highest score in the image and compute it's landmarks and face descriptor
              const fullFaceDescription = await faceapi
                .detectSingleFace(img)
                .withFaceLandmarks()
                .withFaceDescriptor();

              if (!fullFaceDescription) {
                alert(`no faces detected`);
                setshowWebcam(true);
                setshowImage(false);
              }
              if (fullFaceDescription) {
                const faceDescriptors = [fullFaceDescription.descriptor];
                setFaceDes(faceDescriptors[0]);
                setTimeout(function () {
                  setFaceRegisLoading(
                    require("../../assets/img/image/CheckGreen.gif").default
                  );
                }, 2000);
                return new faceapi.LabeledFaceDescriptors(
                  label,
                  faceDescriptors
                );
              }
            })
          );
          console.log(labeledFaceDescriptors);
          setFaceDescriptor(JSON.stringify(labeledFaceDescriptors));
          localStorage.setItem(
            "FaceDescription",
            JSON.stringify(labeledFaceDescriptors)
          );
          const labeledFaceDescriptorsJson = JSON.parse(
            localStorage.getItem("FaceDescription")
          );
          var labeledFaceDescriptors2 = labeledFaceDescriptorsJson.map((x) =>
            faceapi.LabeledFaceDescriptors.fromJSON(x)
          );
          console.log(labeledFaceDescriptors2);
          setPositionCheck("");
          setVideoBorderColor("5px solid #5e72e4");
          setTimeout(function () {
            setModelLoading(true);
            setRegisForm(true);
            setFaceRegisForm(false);
          }, 3000);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("FaceDescriptor");
    console.log(FaceDescriptor);
  }, [FaceDescriptor]);

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

      const detections = await faceapi
        .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions()
        .withFaceDescriptors();

      if (detections.length !== 0) {
        setHeight(detections[0].detection._box._height);
        setWidth(detections[0].detection._box._width);
        setX(detections[0].detection._box._x);
        setY(detections[0].detection._box._y);
        if (
          detections[0].detection._box._height >= 100 &&
          detections[0].detection._box._width >= 100 &&
          detections[0].detection._box._x >= 160 &&
          detections[0].detection._box._x <= 240 &&
          detections[0].detection._box._y >= 120 &&
          detections[0].detection._box._y <= 180
        ) {
          setPositionCheck("Good");
          setVideoBorderColor("5px solid #4fbc78");
        } else {
          setPositionCheck("Bad");
          setVideoBorderColor("5px solid #db383a");
        }
        console.log(detections[0].detection);
      }
      if (detections.length === 0) {
        setHeight("");
        setWidth("");
        setX("");
        setY("");
        setPositionCheck("");
      }
    }
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

  useEffect(() => {
    CurrFacePosition.current = PositionCheck;
    if (PositionCheck == "Good") {
      setTimeout(function () {
        if (
          CurrFacePosition.current == "Good" &&
          FaceRegisForm &&
          webcamRef &&
          showWebcam
        ) {
          capture();
        }
      }, 2000);
    }
  }, [PositionCheck]);

  function BacktoRegisForm() {
    setRegisForm(true);
    setFaceRegisForm(false);
  }

  const { currentUser } = useContext(AuthContext);
  if (Signuped) {
    return <Redirect to="/auth/login" />;
  }

  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          {RegisForm ? (
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-muted mb-4">
                <h1 className="darkGray">REGISTER</h1>
              </div>
              <div className="flexBox">
                <div className="boxSwitch">
                  <button
                    onClick={() => changeRole("Teacher")}
                    className={
                      role === "Teacher1"
                        ? "selectRoleActive "
                        : "selectRole darkGray"
                    }
                    darkGray
                  >
                    Teacher
                  </button>
                  <button
                    onClick={() => changeRole("Student")}
                    className={
                      role === "Student"
                        ? "selectRoleActive "
                        : "selectRole darkGray"
                    }
                  >
                    Student
                  </button>
                </div>
              </div>

              {/* form regis teacher */}
              <div className="teacher">
                <div className="uploadImage">
                  <div className="image2">
                    <img
                      className="faceIcon"
                      alt="..."
                      src={require("../../assets/img/image/face.png").default}
                    />
                  </div>
                  <div className="boxButton">
                    {/* <div className="uploadButton2">
                    <i class="fas fa-pencil-alt penIcon"></i>
                  </div> */}
                    <div class="upload-btn-wrapper text-center">
                      <button class="btn-uploadFile-imgProfile">
                        <i class="fas fa-pencil-alt penIcon"></i>
                      </button>
                      <input type="file" name="myfile" />
                    </div>
                  </div>
                </div>
                <Form role="form" className="formTeacher">
                  {TeacherRoleForm ? (
                    <div className="topicForm">Academic Ranks</div>
                  ) : null}
                  {TeacherRoleForm ? (
                    <FormGroup>
                      <InputGroup className="input-group-alternative mb-3">
                        <Input
                          className="darkGray"
                          type="select"
                          placeholder="Academic Ranks"
                          value={AcademicRanks}
                          onChange={(e) => setAcademicRanks(e.target.value)}
                        >
                          <option>Assoc. Prof.</option>
                          <option>Asst. Prof.</option>
                          <option>Dr.</option>
                          <option>Instructor</option>
                          <option>Prof.</option>
                        </Input>
                      </InputGroup>
                      {AcademicRanksError}
                    </FormGroup>
                  ) : null}

                  <div className="topicForm lightGray">First Name</div>
                  <FormGroup>
                    <InputGroup className="input-group-alternative mb-3">
                      <Input
                        className="darkGray"
                        type="text"
                        value={FirstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </InputGroup>
                    {FirstNameError}
                  </FormGroup>

                  <div className="topicForm lightGray">Last Name</div>
                  <FormGroup>
                    <InputGroup className="input-group-alternative mb-3">
                      <Input
                        className="darkGray"
                        type="text"
                        value={LastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </InputGroup>
                    {LastNameError}
                  </FormGroup>

                  <div className="topicForm lightGray">Faculty</div>
                  <FormGroup>
                    <InputGroup className="input-group-alternative mb-3">
                      <Input
                        className="darkGray"
                        type="select"
                        placeholder="Faculty"
                        value={Faculty}
                        onChange={(e) => setFaculty(e.target.value)}
                      >
                        <option>College of Multidisciplinary Science</option>
                        <option>
                          Darunsikkhalai School of Innovation Learning
                        </option>
                        <option>Engineering</option>
                        <option>Engineering Science Classroom</option>
                        <option>
                          Graduate School of Management and Innovation
                        </option>
                        <option>Industrial Education and Technology</option>
                        <option>Institute of Field Robotics</option>
                        <option>KOSEN KMUTT</option>
                        <option>School of Architecture and Design</option>
                        <option>School of Bioresources and Technology</option>
                        <option>
                          School of Energy, Environment and Materials
                        </option>
                        <option>School of Information Technology</option>
                        <option>School of Liberal Arts</option>
                        <option>Science</option>
                        <option>
                          The Joint Graduate School of Energy and Environment
                        </option>
                      </Input>
                    </InputGroup>
                    {FacultyError}
                  </FormGroup>

                  <div className="topicForm lightGray">Department</div>
                  <FormGroup>
                    <InputGroup className="input-group-alternative mb-3">
                      <Input
                        className="darkGray"
                        type="text"
                        value={Department}
                        onChange={(e) => setDepartment(e.target.value)}
                      />
                    </InputGroup>
                    {DepartmentError}
                  </FormGroup>

                  <div className="topicForm lightGray">Major</div>
                  <FormGroup>
                    <InputGroup className="input-group-alternative mb-3">
                      <Input
                        className="darkGray"
                        type="text"
                        value={Major}
                        onChange={(e) => setMajor(e.target.value)}
                      />
                    </InputGroup>
                    {MajorError}
                  </FormGroup>

                  <div className="topicForm lightGray">Email</div>
                  <FormGroup>
                    <InputGroup className="input-group-alternative mb-3">
                      <Input
                        className="darkGray"
                        name="email"
                        type="text"
                        value={Email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </InputGroup>
                    {EmailError}
                  </FormGroup>

                  <div className="topicForm lightGray">Password</div>
                  <FormGroup>
                    <InputGroup className="input-group-alternative mb-3">
                      <Input
                        className="darkGray"
                        type="Password"
                        value={Password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </InputGroup>
                    {PasswordError}
                  </FormGroup>

                  <div className="topicForm lightGray">Confirm Password</div>
                  <FormGroup>
                    <InputGroup className="input-group-alternative mb-3">
                      <Input
                        className="darkGray"
                        type="password"
                        value={ConfirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </InputGroup>
                    {ConfirmPasswordError}
                  </FormGroup>

                  {StudentRoleForm ? (
                    <div className="topicForm lightGray">Face Registration</div>
                  ) : null}
                  {StudentRoleForm ? (
                    <div className="text-center lightGray">
                      <Button
                        style={{ backgroundColor: "white" }}
                        onClick={ShowFaceRegisForm}
                      >
                        {FaceDesFillState ? (
                          <img
                            className="faceIcon"
                            alt="..."
                            src={
                              require("../../assets/img/image/Verified.gif")
                                .default
                            }
                          />
                        ) : null}

                        {FaceDesEmptyState ? (
                          <img
                            className="faceIcon"
                            alt="..."
                            src={
                              require("../../assets/img/image/face.png").default
                            }
                          />
                        ) : null}
                      </Button>
                    </div>
                  ) : null}
                  {StudentRoleForm ? (
                    <div className="text-center">{FaceDescriptorError}</div>
                  ) : null}

                  <div className="text-center lightGray">
                    <Button
                      className="mt-4 buttonStyle"
                      color="primary"
                      type="submit"
                      onClick={handleSubmit}
                    >
                      SIGNUP
                    </Button>
                  </div>
                </Form>
              </div>

              {/* form regis student*/}

              {/* <div className="student">
              <div className="uploadImage">
                <div className="image2">
                  <img className="faceIcon"
                    alt="..."
                    src={
                      require("../../assets/img/image/face.png").default
                    }
                  />
                </div>
                <div className="boxButton">
                  <div className="uploadButton2">
                    <i class="fas fa-solid fa-camera penIcon"></i>
                  </div>
                </div>
              </div>

              <Form role="form" className="formStudent">
                <div className="topicForm lightGray">First Name</div>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <Input className="darkGray" type="text"/>
                  </InputGroup>
                </FormGroup>

                <div className="topicForm lightGray">Last Name</div>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <Input className="darkGray" type="text"/>
                  </InputGroup>
                </FormGroup>

                <div className="topicForm lightGray">Student ID</div>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <Input className="darkGray" type="text"/>
                  </InputGroup>
                </FormGroup>

                <div className="topicForm lightGray">Faculty</div>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <Input className="darkGray" type="select" placeholder="Faculty">
                      <option>College of Multidisciplinary Science</option>
                      <option>Darunsikkhalai School of Innovation Learning</option>
                      <option>Engineering</option>
                      <option>Engineering Science Classroom</option>
                      <option>Graduate School of Management and Innovation</option>
                      <option>Industrial Education and Technology</option>
                      <option>Institute of Field Robotics</option>
                      <option>KOSEN KMUTT</option>                    
                      <option>School of Architecture and Design</option>
                      <option>School of Bioresources and Technology</option>
                      <option>School of Energy, Environment and Materials</option>
                      <option>School of Information Technology</option>
                      <option>School of Liberal Arts</option>
                      <option>Science</option>
                      <option>The Joint Graduate School of Energy and Environment</option>
                    </Input>
                  </InputGroup>
                </FormGroup>

                <div className="topicForm lightGray">Department</div>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <Input className="darkGray" type="text"/>
                  </InputGroup>
                </FormGroup>

                <div className="topicForm lightGray">Major</div>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <Input className="darkGray" type="text"/>
                  </InputGroup>
                </FormGroup>

                <div className="topicForm lightGray">Email</div>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <Input className="darkGray" type="text"/>
                  </InputGroup>
                </FormGroup>

                <div className="topicForm lightGray">Password</div>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <Input className="darkGray" type="password"/>
                  </InputGroup>
                </FormGroup>

                <div className="topicForm lightGray">Confirm Password</div>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <Input className="darkGray" type="password" />
                  </InputGroup>
                </FormGroup>

                <div className="text-center">
                  <Button className="mt-4 buttonStyle" color="primary" type="button">
                    SIGNUP
                  </Button>
                </div>
              </Form>
            </div> */}
            </CardBody>
          ) : null}
          {FaceRegisForm ? (
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-muted mb-4">
                <h1 className="darkGray">FACE REGISTER</h1>
              </div>
              <Row>
                <Col>
                  <div
                    style={{
                      position: "relative",
                      display: "block",
                      marginLeft: "auto",
                      marginRight: "auto",
                      content: "",
                      clear: "both",
                      display: "table",
                    }}
                  >
                    {showWebcam ? (
                      <Webcam
                        ref={webcamRef}
                        muted={true}
                        style={{
                          width: 320,
                          height: 320,
                          borderRadius: "50%",
                          objectFit: "cover",
                          border: VideoBorderColor,
                          transform: "rotateY(180deg)",
                        }}
                      />
                    ) : null}

                    {showImage ? (
                      <img
                        src={FaceRegisLoading}
                        style={{
                          width: 320,
                          height: 320,
                          borderRadius: "50%",
                          objectFit: "cover",
                        }}
                      />
                    ) : null}

                    {ModelLoading ? (
                      <img
                        src={
                          require("../../assets/img/image/Loading.gif").default
                        }
                        style={{
                          width: 320,
                          height: 320,
                          borderRadius: "50%",
                          objectFit: "cover",
                        }}
                      />
                    ) : null}
                  </div>
                </Col>
                <Col>
                  <p className="text-center lightGray">
                    Position : {PositionCheck}
                  </p>
                  <div className="text-center lightGray">
                    <Button
                      className="mt-4 buttonStyle"
                      color="primary"
                      type="submit"
                      onClick={BacktoRegisForm}
                    >
                      Back
                    </Button>
                  </div>
                </Col>
              </Row>
            </CardBody>
          ) : null}
        </Card>
      </Col>
    </>
  );
};

export default Register;
