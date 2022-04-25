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
import React, { useState, useEffect } from "react";
import firebaseApp from "../../firebase";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";

import {
  Button,
  Badge,
  Card,
  CardTitle,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  UncontrolledCollapse,
  Modal,
  ModalBody,
  ModalFooter,
  UncontrolledTooltip,
} from "reactstrap";

import "assets/scss/argon-dashboard/custom/Headerprofessor.scss";
import JoinClass from "components/Headers/JoinClass.js";

const Header2 = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [copiedText, setCopiedText] = useState();
  const [BGHeight, setBGHeight] = useState(document.documentElement.scrollHeight);
  const d = new Date();
  let Year = d.getFullYear();
  let Month = d.getMonth() + 1;

  const [SubjectCode, setSubjectCode] = useState("");
  const [Section, setSection] = useState("");
  const [SubjectName, setSubjectName] = useState("");
  const [ClassDate, setClassDate] = useState("Monday");
  const [StartTime, setStartTime] = useState("");
  const [EndTime, setEndTime] = useState("");
  const [AcademicYear, setAcademicYear] = useState("");
  const [Semester, setSemester] = useState("1");

  const [SubjectCodeError, setSubjectCodeError] = useState("");
  const [SectionError, setSectionError] = useState("");
  const [SubjectNameError, setSubjectNameError] = useState("");
  const [ClassDateError, setClassDateError] = useState("");
  const [StartTimeError, setStartTimeError] = useState("");
  const [EndTimeError, setEndTimeError] = useState("");
  const [AcademicYearError, setAcademicYearError] = useState("");
  const [SemesterError, setSemesterError] = useState("");

  const db = firebaseApp.firestore();
  const userCollection = db.collection("ClassRoom");

  const [ClassRoom, setClassRoom] = useState({});
  const [FinishedClassRoom, setFinishedClassRoom] = useState({});
  const [EmptyClassRoom, setEmptyClassRoom] = useState(false);
  const [DaysColor, setDaysColor] = useState({
    Monday: "#ffd600",
    Tuesday: "#f3a4b5",
    Wednesday: "#2dce89",
    Thursday: "#fb6340",
    Friday: "#5e72e4",
    Saturday: "#8965e0",
    Sunday: "#f5365c",
  });

  const history = useHistory();

  const routeChange = (e) => {
    history.push({
      pathname: "/professor/profile-home/profile-class",
      search: e,
      state: { detail: e },
    });
  };

  const ModalOpens = () => {
    clearErrors();
    let ayearcheck;
    let semestercheck;

    if (Month >= 1 && Month <= 6) {
      semestercheck = 2;
      ayearcheck = Year - 1;
    }
    if (Month >= 7 && Month <= 12) {
      semestercheck = 1;
      ayearcheck = Year;
    }
    
    setSubjectCode("");
    setSection("");
    setSubjectName("");
    setClassDate("Monday");
    setStartTime("");
    setEndTime("");
    setSemester(semestercheck);
    setAcademicYear(ayearcheck);
    setModalOpen(!modalOpen);
  };

  async function CreateClass() {
    clearErrors();
    ErrorsCheck();
    let UId = firebaseApp.auth().currentUser.uid;
    let members = [];
    let request = [];
    if (
      SubjectCode != "" &&
      Section != "" &&
      SubjectName != "" &&
      ClassDate != "" &&
      StartTime != "" &&
      EndTime != "" &&
      AcademicYear != "" &&
      Semester != ""
    ) {
      const documentRef = await userCollection.add({
        SubjectCode,
        Section,
        SubjectName,
        ClassDate,
        StartTime,
        EndTime,
        UId,
        Members: members,
        Request: request,
        AcademicYear,
        Semester,
      });
      setModalOpen(!modalOpen);
      setSubjectCode("");
      setSection("");
      setSubjectName("");
      setClassDate("Monday");
      setStartTime("");
      setEndTime("");
      setAcademicYear("");
      setSemester("");
    }

    //console.log(`new document has been inserted as ${documentRef.id}`);
  }

  function ErrorsCheck() {
    if (SubjectCode == "") setSubjectCodeError("Empty.");
    if (Section == "") setSectionError("Empty.");
    if (SubjectName == "") setSubjectNameError("Empty.");
    if (ClassDate == "") setClassDateError("Empty.");
    if (StartTime == "") setStartTimeError("Empty.");
    if (EndTime == "") setEndTimeError("Empty.");
    if (AcademicYear == "") setAcademicYearError("Empty.");
    if (Semester == "") setSemesterError("Empty.");
  }

  const clearErrors = () => {
    setSubjectCodeError("");
    setSectionError("");
    setSubjectNameError("");
    setClassDateError("");
    setStartTimeError("");
    setEndTimeError("");
    setAcademicYearError("");
    setSemesterError("");
  };

  useEffect(() => {
    //ใช้ firebaseApp.auth().onAuthStateChanged เพื่อใช้ firebaseApp.auth().currentUser โดยไม่ติด error เมื่อทำการ signout
    if (firebaseApp.auth().currentUser) {
      firebaseApp.auth().onAuthStateChanged((user) => {
        const db = firebaseApp.firestore();
        const userCollection = db
          .collection("ClassRoom")
          .where("UId", "==", firebaseApp.auth().currentUser.uid);

        // subscription นี้จะเกิด callback กับทุกการเปลี่ยนแปลงของ collection Food
        const unsubscribe = userCollection.onSnapshot((ss) => {
          // ตัวแปร local
          const ClassRoom = [];
          const FinishedClassRoom = [];
          let count = 0;
          let count2 = 0;
          let ayearcheck;
          let semestercheck;

          if (Month >= 1 && Month <= 6) {
            semestercheck = 2;
            ayearcheck = Year - 1;
          }
          if (Month >= 7 && Month <= 12) {
            semestercheck = 1;
            ayearcheck = Year;
          }

          ss.forEach((document) => {
            // manipulate ตัวแปร local
            //document.data().Semester >= semestercheck && document.data().AcademicYear >= ayearcheck
            if (document.data().AcademicYear > ayearcheck) {
              ClassRoom[count] = document.data();
              ClassRoom[count].key = document.id;
              ClassRoom[count].daycolor = DaysColor[ClassRoom[count].ClassDate];
              if (document.data().Request.length == 0) {
                ClassRoom[count].RequestBool = false;
              }
              if (document.data().Request.length != 0) {
                ClassRoom[count].RequestBool = true;
              }
              count++;
            }
            if (document.data().AcademicYear == ayearcheck) {
              if (document.data().Semester > semestercheck) {
                ClassRoom[count] = document.data();
                ClassRoom[count].key = document.id;
                ClassRoom[count].daycolor =
                  DaysColor[ClassRoom[count].ClassDate];
                if (document.data().Request.length == 0) {
                  ClassRoom[count].RequestBool = false;
                }
                if (document.data().Request.length != 0) {
                  ClassRoom[count].RequestBool = true;
                }
                count++;
              }
              if (document.data().Semester == semestercheck) {
                ClassRoom[count] = document.data();
                ClassRoom[count].key = document.id;
                ClassRoom[count].daycolor =
                  DaysColor[ClassRoom[count].ClassDate];
                if (document.data().Request.length == 0) {
                  ClassRoom[count].RequestBool = false;
                }
                if (document.data().Request.length != 0) {
                  ClassRoom[count].RequestBool = true;
                }
                count++;
              }
              if (document.data().Semester < semestercheck) {
                FinishedClassRoom[count2] = document.data();
                FinishedClassRoom[count2].key = document.id;
                FinishedClassRoom[count2].daycolor =
                  DaysColor[FinishedClassRoom[count2].ClassDate];
                if (document.data().Request.length == 0) {
                  FinishedClassRoom[count2].RequestBool = false;
                }
                if (document.data().Request.length != 0) {
                  FinishedClassRoom[count2].RequestBool = true;
                }
                count2++;
              }
            }
            if (document.data().AcademicYear < ayearcheck) {
              FinishedClassRoom[count2] = document.data();
              FinishedClassRoom[count2].key = document.id;
              FinishedClassRoom[count2].daycolor =
                DaysColor[FinishedClassRoom[count2].ClassDate];
              if (document.data().Request.length == 0) {
                FinishedClassRoom[count2].RequestBool = false;
              }
              if (document.data().Request.length != 0) {
                FinishedClassRoom[count2].RequestBool = true;
              }
              count2++;
            }
          });

          // เปลี่ยนค่าตัวแปร state
          ClassRoom.sort((a, b) =>
            a.SubjectCode > b.SubjectCode
              ? 1
              : b.SubjectCode > a.SubjectCode
              ? -1
              : 0
          );
          FinishedClassRoom.sort((a, b) =>
            a.SubjectCode > b.SubjectCode
              ? 1
              : b.SubjectCode > a.SubjectCode
              ? -1
              : 0
          );
          setClassRoom(ClassRoom);
          setFinishedClassRoom(FinishedClassRoom);
          console.log(ClassRoom);
          if (ClassRoom.length == 0) {
            setEmptyClassRoom(true);
          }
          if (ClassRoom.length != 0) {
            setEmptyClassRoom(false);
          }
        });

        return () => {
          // ยกเลิก subsciption เมื่อ component ถูกถอดจาก dom
          unsubscribe();
        };
      });
    }
  }, []);

  useEffect(() => {   
    const interval = setInterval(() => {
      setBGHeight(document.documentElement.scrollHeight)
    }, );
    return () => clearInterval(interval);
  }, [document.documentElement.scrollHeight]);

  return (
    <>
      <Modal
        toggle={() => setModalOpen(!modalOpen)}
        isOpen={modalOpen}
        size="lg"
      >
        <div className=" modal-header">
          <button
            aria-label="Close"
            className=" close"
            type="button"
            onClick={() => setModalOpen(!modalOpen)}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <ModalBody>
          <Col className="order-xl-1" xl="12">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Create Classroom</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    <div class="upload-btn-wrapper text-center">
                      <button class="btn-uploadCoverimg">
                        Select Cover Image
                      </button>
                      <input type="file" name="myfile" />
                    </div>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                {/*<Form>*/}
                <h6 className="heading-small text-muted mb-4">
                  Classroom information
                </h6>

                <div>
                  <Row>
                    <Col lg="6">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-username"
                        >
                          Subject Code
                          <span className="text-red">*</span>
                          &nbsp;
                          <span className="text-red">{SubjectCodeError}</span>
                        </label>

                        <Input
                          className="form-control-alternative"
                          id=""
                          placeholder="CSS xxx"
                          type="text"
                          onChange={(e) => setSubjectCode(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="6">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-username"
                        >
                          Section
                          <span className="text-red">*</span>
                          &nbsp;
                          <span className="text-red">{SectionError}</span>
                        </label>

                        <Input
                          className="form-control-alternative"
                          type="text"
                          placeholder="xxx"
                          onChange={(e) => setSection(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup>
                        <label className="form-control-label">
                          Subject Name
                          <span className="text-red">*</span>
                          &nbsp;
                          <span className="text-red">{SubjectNameError}</span>
                        </label>
                        <Input
                          className="form-control-alternative"
                          id=""
                          placeholder="Software Engineer"
                          onChange={(e) => setSubjectName(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="6">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-username"
                        >
                          Academic Year
                          <span className="text-red">*</span>
                          &nbsp;
                          <span className="text-red">{AcademicYearError}</span>
                        </label>

                        <Input
                          className="form-control-alternative"
                          id=""
                          placeholder="Academic Year"
                          type="number"
                          min="1900"
                          max="2099"
                          step="1"
                          value={AcademicYear}
                          onChange={(e) => setAcademicYear(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="6">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-username"
                        >
                          Semester
                          <span className="text-red">*</span>
                          &nbsp;
                          <span className="text-red">{SemesterError}</span>
                        </label>

                        <Input
                          className="form-control-alternative"
                          type="select"
                          placeholder="x"
                          value={Semester}
                          onChange={(e) => setSemester(e.target.value)}
                        >
                          <option>1</option>
                          <option>2</option>
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="4">
                      <FormGroup>
                        <label className="form-control-label">
                          Class Date
                          <span className="text-red">*</span>
                          &nbsp;
                          <span className="text-red">{ClassDateError}</span>
                        </label>
                        <Input
                          className="form-control-alternative"
                          defaultValue="Lucky"
                          id="input-first-name"
                          placeholder="First name"
                          type="select"
                          onChange={(e) => setClassDate(e.target.value)}
                        >
                          <option>Monday</option>
                          <option>Tuesday</option>
                          <option>Wednesday</option>
                          <option>Thursday</option>
                          <option>Friday</option>
                          <option>Saturday</option>
                          <option>Sunday</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col lg="4">
                      <FormGroup>
                        <label className="form-control-label">
                          Start time
                          <span className="text-red">*</span>
                          &nbsp;
                          <span className="text-red">{StartTimeError}</span>
                        </label>
                        <input
                          type="time"
                          name="time"
                          className="form-control-alternative form-time"
                          onChange={(e) => setStartTime(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="4">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-last-name"
                        >
                          End time
                          <span className="text-red">*</span>
                          &nbsp;
                          <span className="text-red">{EndTimeError}</span>
                        </label>
                        <input
                          type="time"
                          name="time"
                          className="form-control-alternative form-time"
                          onChange={(e) => setEndTime(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </div>

                <div className="text-center">
                  <Button
                    className="mt-2 button-modal-detailClassroom"
                    color="dark"
                    onClick={(e) => CreateClass()}
                  >
                    Create Classroom
                  </Button>
                </div>
                {/*</Form>*/}
              </CardBody>
            </Card>
          </Col>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </Modal>

      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8 bg-home-teacher" style={{height: BGHeight}}>
        <Container fluid>
          <div className="header-body">
            <Row>
              {ClassRoom.length != 0 ? (
                <Col>
                  <h1 className="classroom-active-text text-white">
                    Active Classroom
                  </h1>
                </Col>
              ) : null}
              {ClassRoom.length == 0 ? (
                <Col>
                  <h1 className="classroom-active-text text-white"></h1>
                </Col>
              ) : null}
              {(ClassRoom.length != 0 && FinishedClassRoom.length != 0) ||
              (ClassRoom.length != 0 && FinishedClassRoom.length == 0) ||
              (ClassRoom.length == 0 && FinishedClassRoom.length != 0) ? (
                <Button color="dark" onClick={() => ModalOpens()}>
                  Create Classroom
                </Button>
              ) : null}
            </Row>
            {EmptyClassRoom && FinishedClassRoom.length == 0 ? (
              <Row>
                <h2 className="text-home">
                  Let's create classroom and start to create Quest Check.
                </h2>
                <div className="btn-joinclass-home-std text-home">
                  <Button
                    className="mt-4"
                    color="dark"
                    onClick={() => ModalOpens()}
                  >
                    Create Classroom
                  </Button>
                </div>
              </Row>
            ) : null}
            {ClassRoom.length != 0 ? (
              <Row className="mt-4 classroom-active">
                {Object.keys(ClassRoom).map((id) => {
                  return (
                    <Col lg="6" xl="3">
                      <Card
                        className="card-stats mb-xl-0 border-card-home"
                        onClick={() => routeChange(ClassRoom[id].key)}
                        style={{
                          borderColor: ClassRoom[id].daycolor,
                        }}
                      >
                        <CardBody className="subject-card">
                          <Row>
                            <Col>
                              <CardTitle
                                tag="h5"
                                className="text-uppercase text-muted mb-0 home-subjectName"
                              >
                                {ClassRoom[id].SubjectName}
                              </CardTitle>
                              <span className="h2 font-weight-bold mb-0">
                                {ClassRoom[id].SubjectCode}
                              </span>
                            </Col>
                            {ClassRoom[id].RequestBool ? (
                              <Col className="col-auto">
                                <div
                                  className="icon icon-shape text-white rounded-circle shadow circle-day"
                                  style={{
                                    backgroundColor: ClassRoom[id].daycolor,
                                  }}
                                >
                                  <i class="fa-solid fa-user-plus human-plus-icon sand-clock-icon" />
                                </div>
                              </Col>
                            ) : null}
                          </Row>
                          <p className="mt-2 mb-0 text-muted text-sm">
                            <span className="mr-2">
                              {" "}
                              {ClassRoom[id].ClassDate} :{" "}
                              {ClassRoom[id].StartTime} -{" "}
                              {ClassRoom[id].EndTime} &nbsp; Semester :{" "}
                              {ClassRoom[id].Semester}/
                              {ClassRoom[id].AcademicYear}
                            </span>
                            <span className="mr-2 section">
                              Sec : {ClassRoom[id].Section}
                            </span>{" "}
                          </p>
                        </CardBody>
                      </Card>
                    </Col>
                  );
                })}
              </Row>
            ) : null}

            {FinishedClassRoom.length != 0 ? (
              <h1 className="text-white mt-5">Finished Classroom</h1>
            ) : null}
            {FinishedClassRoom.length != 0 ? (
              <Row className="mt-4 classroom-active">
                {Object.keys(FinishedClassRoom).map((id) => {
                  return (
                    <Col lg="6" xl="3">
                      <Card
                        className="card-stats mb-xl-0 border-card-home  old-classroom"
                        onClick={() => routeChange(FinishedClassRoom[id].key)}
                      >
                        <CardBody className="subject-card">
                          <Row>
                            <Col>
                              <CardTitle
                                tag="h5"
                                className="text-uppercase text-muted mb-0 home-subjectName"
                              >
                                {FinishedClassRoom[id].SubjectName}
                              </CardTitle>
                              <span className="h2 font-weight-bold mb-0">
                                {FinishedClassRoom[id].SubjectCode}
                              </span>
                            </Col>
                            {FinishedClassRoom[id].RequestBool ? (
                              <Col className="col-auto">
                                <div className="icon icon-shape text-white rounded-circle shadow circle-day">
                                  <i class="fa-solid fa-user-plus human-plus-icon sand-clock-icon" />
                                </div>
                              </Col>
                            ) : null}
                          </Row>
                          <p className="mt-2 mb-0 text-muted text-sm">
                            <span className="mr-2">
                              {" "}
                              {FinishedClassRoom[id].ClassDate} :{" "}
                              {FinishedClassRoom[id].StartTime} -{" "}
                              {FinishedClassRoom[id].EndTime} &nbsp; Semester :{" "}
                              {FinishedClassRoom[id].Semester}/
                              {FinishedClassRoom[id].AcademicYear}
                            </span>
                            <span className="mr-2 section">
                              Sec : {FinishedClassRoom[id].Section}
                            </span>{" "}
                          </p>
                        </CardBody>
                      </Card>
                    </Col>
                  );
                })}
              </Row>
            ) : null}
          </div>
        </Container>
      </div>
    </>
  );
};

export default Header2;
